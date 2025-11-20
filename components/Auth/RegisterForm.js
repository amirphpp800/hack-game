export class RegisterForm {
    constructor(onRegister, onSwitchToLogin) {
        this.onRegister = onRegister;
        this.onSwitchToLogin = onSwitchToLogin;
    }

    render() {
        return `
            <div class="auth-form">
                <h2>ثبت نام</h2>
                <input type="text" id="register-username" class="auth-input" placeholder="نام کاربری" autocomplete="username">
                <input type="password" id="register-password" class="auth-input" placeholder="رمز عبور" autocomplete="new-password">
                <input type="password" id="register-confirm" class="auth-input" placeholder="تکرار رمز عبور" autocomplete="new-password">
                <button id="register-btn" class="auth-btn">ثبت نام</button>
                <div class="auth-switch">
                    حساب کاربری دارید؟ <a href="#" id="switch-to-login">ورود</a>
                </div>
            </div>
        `;
    }

    attachEvents() {
        const registerBtn = document.getElementById('register-btn');
        const usernameInput = document.getElementById('register-username');
        const passwordInput = document.getElementById('register-password');
        const confirmInput = document.getElementById('register-confirm');
        const switchLink = document.getElementById('switch-to-login');

        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                const username = usernameInput.value.trim();
                const password = passwordInput.value;
                const confirm = confirmInput.value;
                this.onRegister(username, password, confirm);
            });
        }

        if (switchLink) {
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.onSwitchToLogin();
            });
        }

        if (confirmInput) {
            confirmInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const username = usernameInput.value.trim();
                    const password = passwordInput.value;
                    const confirm = confirmInput.value;
                    this.onRegister(username, password, confirm);
                }
            });
        }
    }
}