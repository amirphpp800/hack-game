
export class HUD {
    constructor(gameState, onLogout, onUnlock) {
        this.gameState = gameState;
        this.onLogout = onLogout;
        this.onUnlock = onUnlock;
    }

    render() {
        const lockedHTML = this.gameState.lockedBalance > 0 
            ? `<div class="hud-section hud-locked">
                <span class="hud-label">Locked:</span>
                <span id="hud-locked">₿${this.gameState.lockedBalance.toFixed(8)}</span>
               </div>`
            : '';

        return `
            <div id="hud">
                <div class="hud-section">
                    <span class="hud-label">User:</span>
                    <span id="hud-username">${this.gameState.username}</span>
                </div>
                <div class="hud-section">
                    <span class="hud-label">IP:</span>
                    <span id="hud-ip">${this.gameState.ip}</span>
                </div>
                <div class="hud-section">
                    <span class="hud-label">Security:</span>
                    <span id="hud-security">${this.gameState.securityLevel}</span>
                </div>
                <div class="hud-section">
                    <span class="hud-label">Balance:</span>
                    <span id="hud-balance">₿${this.gameState.balance.toFixed(8)}</span>
                </div>
                ${lockedHTML}
                <button class="logout-btn" data-action="logout">Logout</button>
            </div>
        `;
    }

    update(gameState) {
        this.gameState = gameState;
        document.getElementById('hud-username').textContent = gameState.username;
        document.getElementById('hud-ip').textContent = gameState.ip;
        document.getElementById('hud-security').textContent = gameState.securityLevel;
        document.getElementById('hud-balance').textContent = `₿${gameState.balance.toFixed(8)}`;
        
        const existingLocked = document.getElementById('hud-locked');
        if (gameState.lockedBalance > 0) {
            if (existingLocked) {
                existingLocked.textContent = `₿${gameState.lockedBalance.toFixed(8)}`;
            } else {
                const balanceSection = document.querySelector('[id="hud-balance"]').parentElement;
                const lockedSection = document.createElement('div');
                lockedSection.className = 'hud-section hud-locked';
                lockedSection.innerHTML = `
                    <span class="hud-label">Locked:</span>
                    <span id="hud-locked">₿${gameState.lockedBalance.toFixed(2)}</span>
                `;
                balanceSection.after(lockedSection);
            }
        } else if (existingLocked) {
            existingLocked.parentElement.remove();
        }
    }

    attachEvents() {
        document.querySelector('[data-action="logout"]').addEventListener('click', this.onLogout);
    }
}
