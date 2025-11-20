export class LoginForm {
    constructor(onLogin, onSwitchToRegister) {
        this.onLogin = onLogin;
        this.onSwitchToRegister = onSwitchToRegister;
    }

    render() {
        return `
            <div class="auth-form">
                <h2>ورود به سیستم</h2>
                <input type="text" id="login-username" class="auth-input" placeholder="نام کاربری" autocomplete="username">
                <input type="password" id="login-password" class="auth-input" placeholder="رمز عبور" autocomplete="current-password">
                <button id="login-btn" class="auth-btn">ورود</button>
                <div class="auth-switch">
                    حساب کاربری ندارید؟ <a href="#" id="switch-to-register">ثبت نام</a>
                </div>
            </div>
        `;
    }

    attachEvents() {
        const loginBtn = document.getElementById('login-btn');
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        const switchLink = document.getElementById('switch-to-register');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const username = usernameInput.value.trim();
                const password = passwordInput.value;
                this.onLogin(username, password);
            });
        }

        if (switchLink) {
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.onSwitchToRegister();
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const username = usernameInput.value.trim();
                    const password = passwordInput.value;
                    this.onLogin(username, password);
                }
            });
        }
    }
}