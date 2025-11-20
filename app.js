
import { AuthService } from './services/AuthService.js';
import { KVService } from './services/KVService.js';
import { AuthPage } from './pages/AuthPage.js';
import { GamePage } from './pages/GamePage.js';
import { NotificationUtils } from './utils/NotificationUtils.js';

class App {
    constructor() {
        this.authService = new AuthService();
        this.kvService = new KVService();
        this.currentUser = null;
        this.authPage = null;
        this.gamePage = null;
    }

    async init() {
        await this.kvService.init();
        this.authService.kvService = this.kvService;
        
        const restoredUser = await this.authService.restoreSession();
        
        if (restoredUser) {
            this.onAuthSuccess(restoredUser);
        } else {
            this.authPage = new AuthPage(this.authService, (user) => this.onAuthSuccess(user));
            this.authPage.render();
        }
    }

    onAuthSuccess(user) {
        this.currentUser = user;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        
        this.gamePage = new GamePage(user, this.kvService, () => this.handleLogout());
        this.gamePage.render();
        
        NotificationUtils.show(`Welcome ${user.username}!`, 'success');
    }

    async handleLogout() {
        if (this.gamePage) {
            await this.gamePage.saveState();
        }
        
        this.currentUser = null;
        this.gamePage = null;
        
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('auth-container').style.display = 'flex';
        
        this.authPage.showLogin();
        NotificationUtils.show('Logged out successfully', 'success');
    }
}

window.addEventListener('load', () => {
    const app = new App();
    app.init();
});
