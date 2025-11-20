
export class NotificationUtils {
    static show(message, type = 'success') {
        const notif = document.getElementById('notification');
        
        const icons = {
            success: '[+]',
            error: '[X]',
            warning: '[!]',
            info: '[i]'
        };
        
        notif.innerHTML = `<span class="notif-icon">${icons[type] || icons.info}</span> ${message}`;
        notif.className = `notification ${type} show`;
        
        setTimeout(() => {
            notif.classList.remove('show');
        }, 3000);
    }
}
