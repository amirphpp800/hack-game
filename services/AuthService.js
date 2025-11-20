
import { KVService } from './KVService.js';
import { CryptoUtils } from '../utils/CryptoUtils.js';

export class AuthService {
    constructor() {
        this.kvService = new KVService();
        this.currentSession = null;
        this.sessionKey = 'cyber_breach_session';
    }

    async register(username, password, confirmPassword) {
        if (!username || !password) {
            throw new Error('لطفا نام کاربری و رمز عبور را وارد کنید');
        }

        if (password !== confirmPassword) {
            throw new Error('رمز عبور و تکرار آن یکسان نیستند');
        }

        if (password.length < 4) {
            throw new Error('رمز عبور باید حداقل 4 کاراکتر باشد');
        }

        const existingUser = await this.kvService.get(`user_${username}`);
        if (existingUser) {
            throw new Error('این نام کاربری قبلا استفاده شده است');
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await CryptoUtils.hashPassword(password);
        
        const newUser = {
            username,
            password: hashedPassword,
            balance: 0.001,
            lockedBalance: 0,
            ip: CryptoUtils.generateFakeIP(),
            rank: 'مبتدی',
            securityLevel: 0,
            stats: { wins: 0, losses: 0, totalEarned: 0, totalStolen: 0 },
            inventory: [],
            purchasedItems: [],
            achievements: this.getDefaultAchievements(),
            security: { firewall: 0, encryption: 0, stealth: 0 },
            verified: false,
            verificationCode: verificationCode,
            createdAt: Date.now()
        };

        await this.kvService.put(`user_${username}`, newUser);
        await this.addToPlayerList(username);
        await this.sendTelegramVerification(username, verificationCode);

        return { user: newUser, needsVerification: true };
    }

    async sendTelegramVerification(username, code) {
        try {
            const config = await this.getTelegramConfig();
            if (!config.configured || !config.botToken) {
                console.warn('BOT_TOKEN not configured - skipping Telegram verification');
                return;
            }
            const botToken = config.botToken;

            const message = `🔐 کد تایید حساب کاربری\n\n` +
                          `کاربر: ${username}\n` +
                          `کد تایید: ${code}\n\n` +
                          `برای تایید حساب، کد بالا را وارد کنید.`;

            const telegramData = {
                username,
                code,
                message,
                timestamp: Date.now()
            };

            await this.kvService.put(`verification_${username}`, telegramData);

            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: config.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (!response.ok) {
                console.error('Failed to send Telegram message');
            }
        } catch (error) {
            console.error('Telegram verification error:', error);
        }
    }

    async getTelegramConfig() {
        try {
            const response = await fetch('/api/telegram-config');
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error getting telegram config:', error);
        }
        return { botToken: '', chatId: '0', configured: false };
    }

    async verifyAccount(username, code) {
        const user = await this.kvService.get(`user_${username}`);
        if (!user) {
            throw new Error('کاربر یافت نشد');
        }

        if (user.verified) {
            throw new Error('حساب شما قبلا تایید شده است');
        }

        if (user.verificationCode !== code) {
            throw new Error('کد تایید اشتباه است');
        }

        user.verified = true;
        delete user.verificationCode;
        await this.kvService.put(`user_${username}`, user);
        await this.kvService.delete(`verification_${username}`);

        return user;
    }

    async login(username, password) {
        if (!username || !password) {
            throw new Error('لطفا نام کاربری و رمز عبور را وارد کنید');
        }

        const user = await this.kvService.get(`user_${username}`);
        if (!user) {
            throw new Error('نام کاربری یا رمز عبور اشتباه است');
        }

        const hashedPassword = await CryptoUtils.hashPassword(password);
        if (user.password !== hashedPassword) {
            throw new Error('نام کاربری یا رمز عبور اشتباه است');
        }

        if (!user.verified) {
            throw new Error('لطفا ابتدا حساب خود را تایید کنید');
        }

        this.currentSession = username;
        this.saveSession(username);
        return user;
    }

    saveSession(username) {
        const sessionData = {
            username,
            timestamp: Date.now(),
            token: CryptoUtils.generateSessionToken()
        };
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    }

    getSession() {
        const sessionData = localStorage.getItem(this.sessionKey);
        if (!sessionData) return null;
        
        try {
            const session = JSON.parse(sessionData);
            const dayInMs = 24 * 60 * 60 * 1000;
            if (Date.now() - session.timestamp > 7 * dayInMs) {
                this.clearSession();
                return null;
            }
            return session;
        } catch (error) {
            this.clearSession();
            return null;
        }
    }

    async restoreSession() {
        const session = this.getSession();
        if (!session) return null;

        const user = await this.kvService.get(`user_${session.username}`);
        if (!user || !user.verified) {
            this.clearSession();
            return null;
        }

        this.currentSession = session.username;
        return user;
    }

    clearSession() {
        localStorage.removeItem(this.sessionKey);
        this.currentSession = null;
    }

    async logout() {
        this.clearSession();
    }

    async addToPlayerList(username) {
        const playersList = await this.kvService.get('players_list') || [];
        if (!playersList.includes(username)) {
            playersList.push(username);
            await this.kvService.put('players_list', playersList);
        }
    }

    getDefaultAchievements() {
        return [
            { id: 'first_hack', name: 'اولین هک', icon: '🔓', unlocked: false },
            { id: 'rich_hacker', name: 'هکر ثروتمند', icon: '💰', unlocked: false },
            { id: 'master', name: 'استاد هک', icon: '👑', unlocked: false },
            { id: 'collector', name: 'جمع‌آوری‌کننده', icon: '📦', unlocked: false }
        ];
    }
}
