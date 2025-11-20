
export class StoreItem {
    constructor(item, owned, canAfford, onBuy) {
        this.item = item;
        this.owned = owned;
        this.canAfford = canAfford;
        this.onBuy = onBuy;
    }

    getRarityIcon(rarity) {
        const icons = {
            common: '[C]',
            uncommon: '[U]',
            rare: '[R]',
            epic: '[E]',
            legendary: '[L]'
        };
        return icons[rarity] || '[C]';
    }

    getRarityPersian(rarity) {
        const map = {
            common: 'معمولی',
            uncommon: 'غیرمعمول',
            rare: 'نادر',
            epic: 'حماسی',
            legendary: 'افسانه‌ای'
        };
        return map[rarity] || rarity;
    }

    getCategoryPersian(category) {
        const map = {
            hardware: 'سخت‌افزار',
            software: 'نرم‌افزار',
            scripts: 'اسکریپت',
            stealth: 'مخفی‌کاری',
            security: 'امنیت',
            cosmetics: 'تزئینی',
            vpn: 'VPN',
            backdoor: 'بک‌دور',
            antibackdoor: 'ضد بک‌دور',
            autoattack: 'حمله خودکار'
        };
        return map[category] || category;
    }

    getEffectsHTML() {
        const labels = {
            defense: 'دفاع',
            attackPower: 'قدرت حمله',
            hackSuccess: 'موفقیت هک',
            stealth: 'مخفی‌کاری',
            encryption: 'رمزگذاری',
            income: 'درآمد'
        };

        return Object.entries(this.item.effect)
            .map(([key, val]) => `${labels[key] || key}: +${val}`)
            .join('<br>');
    }

    render() {
        const effectsText = this.getEffectsHTML();
        const clickable = this.canAfford && !this.owned;
        const levelBadge = this.item.level ? `<span class="item-level">سطح ${this.item.level}</span>` : '';
        
        return `
            <div class="store-item ${this.item.rarity} ${clickable ? '' : 'cant-afford'}" 
                 data-item-id="${this.item.id}"
                 ${clickable ? 'style="cursor: pointer;"' : ''}>
                <span class="item-rarity ${this.item.rarity}">
                    ${this.getRarityIcon(this.item.rarity)} ${this.getRarityPersian(this.item.rarity)}
                </span>
                ${levelBadge}
                <div class="item-icon">${this.item.icon}</div>
                <div class="item-name">${this.item.name}</div>
                <div class="item-category">${this.getCategoryPersian(this.item.category)}</div>
                <div class="item-description">${this.item.description}</div>
                ${effectsText ? `<div class="item-stats">${effectsText}</div>` : ''}
                <div class="item-price">
                    ${this.owned ? 'خریداری شده' : `₿ ${this.item.price.toLocaleString()}`}
                </div>
            </div>
        `;
    }

    attachEvents(element) {
        if (this.canAfford && !this.owned) {
            element.addEventListener('click', () => this.onBuy(this.item.id));
        }
    }
}
