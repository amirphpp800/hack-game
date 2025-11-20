
export class HUD {
    constructor(user, onLogout) {
        this.user = user;
        this.onLogout = onLogout;
    }

    render() {
        const verificationBadge = !this.user.verified 
            ? `<span style="color: #FF2E63; font-size: 11px; margin-right: 10px;">⚠️ تایید نشده</span>`
            : '';

        return `
            <div id="hud">
                <div>
                    <span class="info">User:</span> 
                    <span id="hud-username">${this.user.username}</span>
                    ${verificationBadge}
                </div>
                <div><span class="info">IP:</span> <span id="hud-ip">${this.user.ip}</span></div>
                <div><span class="info">Security:</span> <span id="hud-security">${this.user.securityLevel}%</span></div>
                <div><span class="info">Balance:</span> <span id="hud-balance">₿${this.user.balance.toFixed(8)}</span></div>
                ${this.user.lockedBalance > 0 ? `
                <div class="hud-locked">
                    <span class="info">Locked:</span> 
                    <span id="hud-locked">₿${this.user.lockedBalance.toFixed(8)}</span>
                </div>
                ` : ''}
                <button class="logout-btn" id="logout-btn">خروج</button>
            </div>
        `;
    }

    attachEvents() {
        document.getElementById('logout-btn').addEventListener('click', this.onLogout);
    }

    update(user) {
        this.user = user;
        const verificationBadge = !this.user.verified 
            ? `<span style="color: #FF2E63; font-size: 11px; margin-right: 10px;">⚠️ تایید نشده</span>`
            : '';

        document.getElementById('hud-username').textContent = user.username;
        const usernameDiv = document.getElementById('hud-username').parentElement;
        const oldBadge = usernameDiv.querySelector('span[style*="FF2E63"]');
        if (oldBadge) oldBadge.remove();
        if (!this.user.verified) {
            usernameDiv.innerHTML += verificationBadge;
        }

        document.getElementById('hud-ip').textContent = user.ip;
        document.getElementById('hud-security').textContent = `${user.securityLevel}%`;
        document.getElementById('hud-balance').textContent = `₿${user.balance.toFixed(8)}`;
        
        const lockedElement = document.getElementById('hud-locked');
        if (user.lockedBalance > 0) {
            if (lockedElement) {
                lockedElement.textContent = `₿${user.lockedBalance.toFixed(8)}`;
            }
        }
    }
}
