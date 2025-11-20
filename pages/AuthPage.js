
import { LoginForm } from '../components/Auth/LoginForm.js';
import { RegisterForm } from '../components/Auth/RegisterForm.js';

export class AuthPage {
    constructor(authService, onAuthSuccess) {
        this.authService = authService;
        this.onAuthSuccess = onAuthSuccess;
        this.currentForm = 'login';
    }

    render() {
        const container = document.getElementById('auth-container');
        container.innerHTML = `
            <div class="auth-box">
                <h1 class="game-logo">CYBER BREACH</h1>
                <div id="auth-form-container"></div>
            </div>
        `;

        this.showLogin();
    }

    showLogin() {
        this.currentForm = 'login';
        const loginForm = new LoginForm(
            (username, password) => this.handleLogin(username, password),
            () => this.showRegister()
        );

        document.getElementById('auth-form-container').innerHTML = loginForm.render();
        loginForm.attachEvents();
    }

    showRegister() {
        this.currentForm = 'register';
        const registerForm = new RegisterForm(
            (username, password, confirm) => this.handleRegister(username, password, confirm),
            () => this.showLogin()
        );

        document.getElementById('auth-form-container').innerHTML = registerForm.render();
        registerForm.attachEvents();
    }

    async handleLogin(username, password) {
        try {
            const user = await this.authService.login(username, password);
            this.onAuthSuccess(user);
        } catch (error) {
            const { NotificationUtils } = await import('../utils/NotificationUtils.js');
            NotificationUtils.show(error.message, 'error');
        }
    }

    async handleRegister(username, password, confirm) {
        try {
            const result = await this.authService.register(username, password, confirm);
            const { NotificationUtils } = await import('../utils/NotificationUtils.js');
            
            if (result.needsVerification) {
                if (result.telegramSent) {
                    NotificationUtils.show('ثبت نام موفق! کد تایید به تلگرام ارسال شد', 'success');
                } else {
                    NotificationUtils.show('ثبت نام موفق! (کد تایید ارسال نشد)', 'warning');
                }
                this.showVerification(username, result.telegramSent);
            } else {
                NotificationUtils.show('[+] Registration successful!', 'success');
                setTimeout(() => {
                    this.showLogin();
                    document.getElementById('login-username').value = username;
                }, 1000);
            }
        } catch (error) {
            const { NotificationUtils } = await import('../utils/NotificationUtils.js');
            NotificationUtils.show(error.message, 'error');
        }
    }

    showVerification(username, telegramSent = true) {
        const verifyHTML = `
            <div class="auth-form">
                <h2>تایید حساب کاربری</h2>
                <p style="color: #9EA5B3; margin-bottom: 20px;">
                    ${telegramSent 
                        ? 'کد تایید 6 رقمی به تلگرام شما ارسال شد' 
                        : '⚠️ ارسال کد تایید با مشکل مواجه شد'}
                </p>
                <input type="text" id="verify-code" placeholder="کد تایید" maxlength="6" autocomplete="off">
                <button id="verify-btn" class="auth-btn">تایید حساب</button>
                <button id="verify-later-btn" class="auth-btn-secondary" style="margin-top: 10px;">تایید بعداً و ورود</button>
                <a href="#" id="back-to-login" style="display: block; margin-top: 15px; color: #2CF6F6; text-decoration: none;">بازگشت به ورود</a>
            </div>
        `;

        document.getElementById('auth-form-container').innerHTML = verifyHTML;

        document.getElementById('verify-later-btn').addEventListener('click', async () => {
            const { NotificationUtils } = await import('../utils/NotificationUtils.js');
            NotificationUtils.show('می‌توانید وارد شوید. برای تایید از پروفایل اقدام کنید', 'success');
            setTimeout(() => {
                this.showLogin();
                document.getElementById('login-username').value = username;
            }, 1500);
        });

        document.getElementById('verify-btn').addEventListener('click', async () => {
            const code = document.getElementById('verify-code').value.trim();
            if (!code) {
                const { NotificationUtils } = await import('../utils/NotificationUtils.js');
                NotificationUtils.show('لطفا کد تایید را وارد کنید', 'error');
                return;
            }

            try {
                await this.authService.verifyAccount(username, code);
                const { NotificationUtils } = await import('../utils/NotificationUtils.js');
                NotificationUtils.show('حساب شما با موفقیت تایید شد!', 'success');
                
                setTimeout(() => {
                    this.showLogin();
                    document.getElementById('login-username').value = username;
                }, 1000);
            } catch (error) {
                const { NotificationUtils } = await import('../utils/NotificationUtils.js');
                NotificationUtils.show(error.message, 'error');
            }
        });

        document.getElementById('back-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLogin();
        });
    }
}
