
export const NPC_ACCOUNTS = [
    {
        username: 'BlackHat_Elite',
        ip: '192.168.100.50',
        balance: 15.5,
        securityLevel: 180,
        security: { firewall: 85, encryption: 60, stealth: 35 },
        rank: 'اسطوره',
        inventory: [],
        isAI: true,
        aiLevel: 5
    },
    {
        username: 'CyberPhantom',
        ip: '10.0.45.120',
        balance: 10.8,
        securityLevel: 150,
        security: { firewall: 70, encryption: 50, stealth: 30 },
        rank: 'اسطوره',
        inventory: [],
        isAI: true,
        aiLevel: 4
    },
    {
        username: 'Ghost_Protocol',
        ip: '172.16.88.200',
        balance: 7.5,
        securityLevel: 120,
        security: { firewall: 55, encryption: 40, stealth: 25 },
        rank: 'نخبه',
        inventory: [],
        isAI: true,
        aiLevel: 4
    },
    {
        username: 'Anonymous_X',
        ip: '192.168.77.15',
        balance: 5.2,
        securityLevel: 95,
        security: { firewall: 45, encryption: 30, stealth: 20 },
        rank: 'نخبه',
        inventory: [],
        isAI: true,
        aiLevel: 3
    },
    {
        username: 'DarkWeb_Trader',
        ip: '10.10.33.88',
        balance: 3.8,
        securityLevel: 75,
        security: { firewall: 35, encryption: 25, stealth: 15 },
        rank: 'متخصص',
        inventory: [],
        isAI: true,
        aiLevel: 3
    },
    {
        username: 'QuantumHacker',
        ip: '185.22.101.77',
        balance: 12.3,
        securityLevel: 165,
        security: { firewall: 80, encryption: 55, stealth: 30 },
        rank: 'اسطوره',
        inventory: [],
        isAI: true,
        aiLevel: 5
    },
    {
        username: 'ShadowNet_AI',
        ip: '94.156.34.88',
        balance: 9.1,
        securityLevel: 135,
        security: { firewall: 65, encryption: 45, stealth: 25 },
        rank: 'نخبه',
        inventory: [],
        isAI: true,
        aiLevel: 4
    }
];

export const STORE_ITEMS = [
    // VPN Locations - Simpler names
    { id: 1, name: 'VPN USA', category: 'vpn', rarity: 'common', level: 1, price: 0.002, icon: '🇺🇸', description: 'نیویورک | مخفی‌سازی +10', effect: { stealth: 10 } },
    { id: 2, name: 'VPN USA Pro', category: 'vpn', rarity: 'uncommon', level: 2, price: 0.004, icon: '🇺🇸⭐', description: 'نیویورک | مخفی‌سازی +20', effect: { stealth: 20 } },
    { id: 3, name: 'VPN USA Elite', category: 'vpn', rarity: 'rare', level: 3, price: 0.008, icon: '🇺🇸⭐⭐', description: 'نیویورک | مخفی‌سازی +35', effect: { stealth: 35 } },
    { id: 4, name: 'VPN USA Master', category: 'vpn', rarity: 'epic', level: 4, price: 0.015, icon: '🇺🇸⭐⭐⭐', description: 'نیویورک | مخفی‌سازی +55', effect: { stealth: 55 } },
    { id: 5, name: 'VPN USA Legend', category: 'vpn', rarity: 'legendary', level: 5, price: 0.03, icon: '🇺🇸👑', description: 'نیویورک | مخفی‌سازی +80', effect: { stealth: 80 } },
    
    { id: 6, name: 'VPN Japan', category: 'vpn', rarity: 'common', level: 1, price: 0.0025, icon: '🇯🇵', description: 'توکیو | مخفی‌سازی +12', effect: { stealth: 12 } },
    { id: 7, name: 'VPN Japan Pro', category: 'vpn', rarity: 'uncommon', level: 2, price: 0.005, icon: '🇯🇵⭐', description: 'توکیو | مخفی‌سازی +25', effect: { stealth: 25 } },
    { id: 8, name: 'VPN Japan Elite', category: 'vpn', rarity: 'rare', level: 3, price: 0.01, icon: '🇯🇵⭐⭐', description: 'توکیو | مخفی‌سازی +40', effect: { stealth: 40 } },
    { id: 9, name: 'VPN Japan Master', category: 'vpn', rarity: 'epic', level: 4, price: 0.018, icon: '🇯🇵⭐⭐⭐', description: 'توکیو | مخفی‌سازی +60', effect: { stealth: 60 } },
    { id: 10, name: 'VPN Japan Legend', category: 'vpn', rarity: 'legendary', level: 5, price: 0.035, icon: '🇯🇵👑', description: 'توکیو | مخفی‌سازی +90', effect: { stealth: 90 } },

    // Hardware - Simpler names
    { id: 11, name: 'CPU i3', category: 'hardware', rarity: 'common', level: 1, price: 0.003, icon: '💻', description: 'هک +5 | حمله +3', effect: { hackSuccess: 5, attackPower: 3 } },
    { id: 12, name: 'CPU i5', category: 'hardware', rarity: 'uncommon', level: 2, price: 0.006, icon: '💻⭐', description: 'هک +12 | حمله +8', effect: { hackSuccess: 12, attackPower: 8 } },
    { id: 13, name: 'CPU i7', category: 'hardware', rarity: 'rare', level: 3, price: 0.012, icon: '💻⭐⭐', description: 'هک +22 | حمله +15', effect: { hackSuccess: 22, attackPower: 15 } },
    { id: 14, name: 'CPU i9', category: 'hardware', rarity: 'epic', level: 4, price: 0.025, icon: '💻⭐⭐⭐', description: 'هک +38 | حمله +25', effect: { hackSuccess: 38, attackPower: 25 } },
    { id: 15, name: 'CPU Quantum', category: 'hardware', rarity: 'legendary', level: 5, price: 0.05, icon: '💻👑', description: 'هک +60 | حمله +40', effect: { hackSuccess: 60, attackPower: 40 } },

    { id: 16, name: 'GPU 3050', category: 'hardware', rarity: 'common', level: 1, price: 0.004, icon: '🎮', description: 'هک +8 | حمله +5', effect: { hackSuccess: 8, attackPower: 5 } },
    { id: 17, name: 'GPU 3060', category: 'hardware', rarity: 'uncommon', level: 2, price: 0.008, icon: '🎮⭐', description: 'هک +15 | حمله +10', effect: { hackSuccess: 15, attackPower: 10 } },
    { id: 18, name: 'GPU 3080', category: 'hardware', rarity: 'rare', level: 3, price: 0.016, icon: '🎮⭐⭐', description: 'هک +28 | حمله +18', effect: { hackSuccess: 28, attackPower: 18 } },
    { id: 19, name: 'GPU 4080', category: 'hardware', rarity: 'epic', level: 4, price: 0.032, icon: '🎮⭐⭐⭐', description: 'هک +45 | حمله +30', effect: { hackSuccess: 45, attackPower: 30 } },
    { id: 20, name: 'GPU 4090', category: 'hardware', rarity: 'legendary', level: 5, price: 0.065, icon: '🎮👑', description: 'هک +70 | حمله +50', effect: { hackSuccess: 70, attackPower: 50 } },

    { id: 21, name: 'RAM 8GB', category: 'hardware', rarity: 'common', level: 1, price: 0.002, icon: '🧠', description: 'هک +3', effect: { hackSuccess: 3 } },
    { id: 22, name: 'RAM 16GB', category: 'hardware', rarity: 'uncommon', level: 2, price: 0.004, icon: '🧠⭐', description: 'هک +8', effect: { hackSuccess: 8 } },
    { id: 23, name: 'RAM 32GB', category: 'hardware', rarity: 'rare', level: 3, price: 0.008, icon: '🧠⭐⭐', description: 'هک +15', effect: { hackSuccess: 15 } },
    { id: 24, name: 'RAM 64GB', category: 'hardware', rarity: 'epic', level: 4, price: 0.016, icon: '🧠⭐⭐⭐', description: 'هک +28', effect: { hackSuccess: 28 } },
    { id: 25, name: 'RAM 128GB', category: 'hardware', rarity: 'legendary', level: 5, price: 0.032, icon: '🧠👑', description: 'هک +45', effect: { hackSuccess: 45 } },

    // Software & Tools
    { id: 26, name: 'Kali Basic', category: 'software', rarity: 'common', level: 1, price: 0.0015, icon: '🔧', description: 'هک +8 | حمله +5', effect: { hackSuccess: 8, attackPower: 5 } },
    { id: 27, name: 'Kali Linux', category: 'software', rarity: 'uncommon', level: 2, price: 0.004, icon: '🔧⭐', description: 'هک +15 | حمله +10', effect: { hackSuccess: 15, attackPower: 10 } },
    { id: 28, name: 'Metasploit', category: 'software', rarity: 'rare', level: 3, price: 0.009, icon: '🔧⭐⭐', description: 'هک +28 | حمله +20', effect: { hackSuccess: 28, attackPower: 20 } },
    { id: 29, name: 'AI Hacker', category: 'software', rarity: 'epic', level: 4, price: 0.02, icon: '🔧⭐⭐⭐', description: 'هک +45 | حمله +35', effect: { hackSuccess: 45, attackPower: 35 } },
    { id: 30, name: 'Zero-Day Kit', category: 'software', rarity: 'legendary', level: 5, price: 0.05, icon: '🔧👑', description: 'هک +75 | حمله +60', effect: { hackSuccess: 75, attackPower: 60 } },

    { id: 31, name: 'John Ripper', category: 'software', rarity: 'common', level: 1, price: 0.002, icon: '🔓', description: 'حمله +8 | هک +5', effect: { attackPower: 8, hackSuccess: 5 } },
    { id: 32, name: 'Hashcat', category: 'software', rarity: 'uncommon', level: 2, price: 0.005, icon: '🔓⭐', description: 'حمله +15 | هک +10', effect: { attackPower: 15, hackSuccess: 10 } },
    { id: 33, name: 'Hashcat GPU', category: 'software', rarity: 'rare', level: 3, price: 0.011, icon: '🔓⭐⭐', description: 'حمله +28 | هک +18', effect: { attackPower: 28, hackSuccess: 18 } },
    { id: 34, name: 'AI Cracker', category: 'software', rarity: 'epic', level: 4, price: 0.022, icon: '🔓⭐⭐⭐', description: 'حمله +45 | هک +30', effect: { attackPower: 45, hackSuccess: 30 } },
    { id: 35, name: 'Quantum Crack', category: 'software', rarity: 'legendary', level: 5, price: 0.045, icon: '🔓👑', description: 'حمله +70 | هک +50', effect: { attackPower: 70, hackSuccess: 50 } },

    // Scripts & Exploits
    { id: 36, name: 'DDoS Script', category: 'scripts', rarity: 'common', level: 1, price: 0.0015, icon: '📜', description: 'حمله +8', effect: { attackPower: 8 } },
    { id: 37, name: 'Botnet', category: 'scripts', rarity: 'uncommon', level: 2, price: 0.004, icon: '📜⭐', description: 'حمله +18 | هک +8', effect: { attackPower: 18, hackSuccess: 8 } },
    { id: 38, name: 'RAT Trojan', category: 'scripts', rarity: 'rare', level: 3, price: 0.009, icon: '📜⭐⭐', description: 'حمله +32 | هک +15', effect: { attackPower: 32, hackSuccess: 15 } },
    { id: 39, name: 'Ransomware', category: 'scripts', rarity: 'epic', level: 4, price: 0.02, icon: '📜⭐⭐⭐', description: 'حمله +55 | هک +25', effect: { attackPower: 55, hackSuccess: 25 } },
    { id: 40, name: 'Rootkit Pro', category: 'scripts', rarity: 'legendary', level: 5, price: 0.045, icon: '📜👑', description: 'حمله +85 | هک +40', effect: { attackPower: 85, hackSuccess: 40 } },

    { id: 41, name: 'Phishing Basic', category: 'scripts', rarity: 'common', level: 1, price: 0.002, icon: '🎣', description: 'هک +10 | حمله +5', effect: { hackSuccess: 10, attackPower: 5 } },
    { id: 42, name: 'Phishing Pro', category: 'scripts', rarity: 'uncommon', level: 2, price: 0.005, icon: '🎣⭐', description: 'هک +18 | حمله +10', effect: { hackSuccess: 18, attackPower: 10 } },
    { id: 43, name: 'Phishing Elite', category: 'scripts', rarity: 'rare', level: 3, price: 0.011, icon: '🎣⭐⭐', description: 'هک +30 | حمله +18', effect: { hackSuccess: 30, attackPower: 18 } },
    { id: 44, name: 'AI Phishing', category: 'scripts', rarity: 'epic', level: 4, price: 0.023, icon: '🎣⭐⭐⭐', description: 'هک +50 | حمله +30', effect: { hackSuccess: 50, attackPower: 30 } },
    { id: 45, name: 'Social Engineer', category: 'scripts', rarity: 'legendary', level: 5, price: 0.048, icon: '🎣👑', description: 'هک +75 | حمله +45', effect: { hackSuccess: 75, attackPower: 45 } },

    // Security & Defense
    { id: 46, name: 'Firewall Basic', category: 'security', rarity: 'common', level: 1, price: 0.002, icon: '🛡️', description: 'دفاع +10', effect: { defense: 10 } },
    { id: 47, name: 'Firewall Pro', category: 'security', rarity: 'uncommon', level: 2, price: 0.005, icon: '🛡️⭐', description: 'دفاع +22', effect: { defense: 22 } },
    { id: 48, name: 'Firewall Elite', category: 'security', rarity: 'rare', level: 3, price: 0.011, icon: '🛡️⭐⭐', description: 'دفاع +40 | رمز +10', effect: { defense: 40, encryption: 10 } },
    { id: 49, name: 'AI Firewall', category: 'security', rarity: 'epic', level: 4, price: 0.023, icon: '🛡️⭐⭐⭐', description: 'دفاع +65 | رمز +20', effect: { defense: 65, encryption: 20 } },
    { id: 50, name: 'Quantum Shield', category: 'security', rarity: 'legendary', level: 5, price: 0.05, icon: '🛡️👑', description: 'دفاع +100 | رمز +35', effect: { defense: 100, encryption: 35 } },

    { id: 51, name: 'AES-128', category: 'security', rarity: 'common', level: 1, price: 0.0025, icon: '🔐', description: 'رمز +12', effect: { encryption: 12 } },
    { id: 52, name: 'AES-256', category: 'security', rarity: 'uncommon', level: 2, price: 0.006, icon: '🔐⭐', description: 'رمز +25', effect: { encryption: 25 } },
    { id: 53, name: 'RSA-4096', category: 'security', rarity: 'rare', level: 3, price: 0.013, icon: '🔐⭐⭐', description: 'رمز +45 | دفاع +10', effect: { encryption: 45, defense: 10 } },
    { id: 54, name: 'Elliptic Curve', category: 'security', rarity: 'epic', level: 4, price: 0.028, icon: '🔐⭐⭐⭐', description: 'رمز +70 | دفاع +20', effect: { encryption: 70, defense: 20 } },
    { id: 55, name: 'Quantum Encrypt', category: 'security', rarity: 'legendary', level: 5, price: 0.06, icon: '🔐👑', description: 'رمز +110 | دفاع +35', effect: { encryption: 110, defense: 35 } },

    { id: 56, name: 'IDS Basic', category: 'security', rarity: 'common', level: 1, price: 0.003, icon: '👁️', description: 'دفاع +12 | رمز +5', effect: { defense: 12, encryption: 5 } },
    { id: 57, name: 'IDS Pro', category: 'security', rarity: 'uncommon', level: 2, price: 0.007, icon: '👁️⭐', description: 'دفاع +25 | رمز +12', effect: { defense: 25, encryption: 12 } },
    { id: 58, name: 'IPS Elite', category: 'security', rarity: 'rare', level: 3, price: 0.015, icon: '👁️⭐⭐', description: 'دفاع +42 | رمز +22', effect: { defense: 42, encryption: 22 } },
    { id: 59, name: 'AI Detection', category: 'security', rarity: 'epic', level: 4, price: 0.032, icon: '👁️⭐⭐⭐', description: 'دفاع +68 | رمز +35', effect: { defense: 68, encryption: 35 } },
    { id: 60, name: 'Quantum IPS', category: 'security', rarity: 'legendary', level: 5, price: 0.07, icon: '👁️👑', description: 'دفاع +105 | رمز +55', effect: { defense: 105, encryption: 55 } },

    // Stealth & Anonymity
    { id: 61, name: 'Proxy Basic', category: 'stealth', rarity: 'common', level: 1, price: 0.002, icon: '🥷', description: 'مخفی +10', effect: { stealth: 10 } },
    { id: 62, name: 'Proxy Chain', category: 'stealth', rarity: 'uncommon', level: 2, price: 0.005, icon: '🥷⭐', description: 'مخفی +22', effect: { stealth: 22 } },
    { id: 63, name: 'Tor Bridge', category: 'stealth', rarity: 'rare', level: 3, price: 0.011, icon: '🥷⭐⭐', description: 'مخفی +38 | دفاع +10', effect: { stealth: 38, defense: 10 } },
    { id: 64, name: 'Multi-Proxy', category: 'stealth', rarity: 'epic', level: 4, price: 0.024, icon: '🥷⭐⭐⭐', description: 'مخفی +60 | دفاع +20', effect: { stealth: 60, defense: 20 } },
    { id: 65, name: 'Ghost Mode', category: 'stealth', rarity: 'legendary', level: 5, price: 0.052, icon: '🥷👑', description: 'مخفی +95 | دفاع +30', effect: { stealth: 95, defense: 30 } },

    { id: 66, name: 'MAC Spoof', category: 'stealth', rarity: 'common', level: 1, price: 0.0025, icon: '🎭', description: 'مخفی +12', effect: { stealth: 12 } },
    { id: 67, name: 'DNS Tunnel', category: 'stealth', rarity: 'uncommon', level: 2, price: 0.006, icon: '🎭⭐', description: 'مخفی +25 | هک +8', effect: { stealth: 25, hackSuccess: 8 } },
    { id: 68, name: 'Traffic Hide', category: 'stealth', rarity: 'rare', level: 3, price: 0.013, icon: '🎭⭐⭐', description: 'مخفی +42 | هک +15', effect: { stealth: 42, hackSuccess: 15 } },
    { id: 69, name: 'Anti-Forensic', category: 'stealth', rarity: 'epic', level: 4, price: 0.028, icon: '🎭⭐⭐⭐', description: 'مخفی +68 | هک +25 | دفاع +15', effect: { stealth: 68, hackSuccess: 25, defense: 15 } },
    { id: 70, name: 'Ghost Protocol', category: 'stealth', rarity: 'legendary', level: 5, price: 0.06, icon: '🎭👑', description: 'مخفی +105 | هک +40 | دفاع +25', effect: { stealth: 105, hackSuccess: 40, defense: 25 } },

    // Backdoor Items
    { id: 71, name: 'Backdoor v1', category: 'backdoor', rarity: 'uncommon', level: 1, price: 0.005, icon: '🔓', description: 'دسترسی دائم | سرقت x1.2', effect: { backdoorInstall: true, backdoorLevel: 1, stealMultiplier: 1.2 } },
    { id: 72, name: 'Backdoor v2', category: 'backdoor', rarity: 'rare', level: 2, price: 0.012, icon: '🔓⭐', description: 'دسترسی دائم | سرقت x1.4 | درآمد', effect: { backdoorInstall: true, backdoorLevel: 2, stealMultiplier: 1.4, passiveIncome: 0.0001 } },
    { id: 73, name: 'Backdoor v3', category: 'backdoor', rarity: 'rare', level: 3, price: 0.025, icon: '🔓⭐⭐', description: 'مخفی +15 | سرقت x1.6 | درآمد', effect: { backdoorInstall: true, backdoorLevel: 3, stealMultiplier: 1.6, passiveIncome: 0.0002, stealth: 15 } },
    { id: 74, name: 'Backdoor v4', category: 'backdoor', rarity: 'epic', level: 4, price: 0.05, icon: '🔓⭐⭐⭐', description: 'مخفی +25 | سرقت x1.9 | حمله +15', effect: { backdoorInstall: true, backdoorLevel: 4, stealMultiplier: 1.9, passiveIncome: 0.0004, stealth: 25, attackPower: 15 } },
    { id: 75, name: 'Backdoor Elite', category: 'backdoor', rarity: 'legendary', level: 5, price: 0.1, icon: '🔓👑', description: 'مخفی +40 | سرقت x2.3 | حمله +30', effect: { backdoorInstall: true, backdoorLevel: 5, stealMultiplier: 2.3, passiveIncome: 0.0008, stealth: 40, attackPower: 30 } },

    // Anti-Backdoor Items
    { id: 76, name: 'Anti-BD Basic', category: 'antibackdoor', rarity: 'uncommon', level: 1, price: 0.004, icon: '🚫', description: 'شناسایی 30% | دفاع +8', effect: { antiBackdoor: true, backdoorDetection: 30, defense: 8 } },
    { id: 77, name: 'Anti-BD Pro', category: 'antibackdoor', rarity: 'rare', level: 2, price: 0.01, icon: '🚫⭐', description: 'شناسایی 50% | حذف | دفاع +18', effect: { antiBackdoor: true, backdoorDetection: 50, backdoorRemoval: true, defense: 18 } },
    { id: 78, name: 'Anti-BD Elite', category: 'antibackdoor', rarity: 'rare', level: 3, price: 0.022, icon: '🚫⭐⭐', description: 'شناسایی 70% | بلاک 60% | دفاع +30', effect: { antiBackdoor: true, backdoorDetection: 70, backdoorRemoval: true, backdoorBlock: 60, defense: 30 } },
    { id: 79, name: 'AI Anti-BD', category: 'antibackdoor', rarity: 'epic', level: 4, price: 0.045, icon: '🚫⭐⭐⭐', description: 'شناسایی 85% | بلاک 80% | دفاع +50', effect: { antiBackdoor: true, backdoorDetection: 85, backdoorRemoval: true, backdoorBlock: 80, defense: 50, encryption: 20 } },
    { id: 80, name: 'Quantum Anti-BD', category: 'antibackdoor', rarity: 'legendary', level: 5, price: 0.095, icon: '🚫👑', description: 'شناسایی 99% | بلاک 95% | دفاع +75', effect: { antiBackdoor: true, backdoorDetection: 99, backdoorRemoval: true, backdoorBlock: 95, defense: 75, encryption: 40 } },

    // Cosmetics
    { id: 81, name: 'Setup Basic', category: 'cosmetics', rarity: 'common', level: 1, price: 0.0015, icon: '⌨️', description: 'درآمد +5', effect: { income: 5 } },
    { id: 82, name: 'Setup RGB', category: 'cosmetics', rarity: 'uncommon', level: 2, price: 0.004, icon: '⌨️⭐', description: 'درآمد +12 | هک +3', effect: { income: 12, hackSuccess: 3 } },
    { id: 83, name: 'Setup Pro', category: 'cosmetics', rarity: 'rare', level: 3, price: 0.009, icon: '⌨️⭐⭐', description: 'درآمد +25 | هک +8', effect: { income: 25, hackSuccess: 8 } },
    { id: 84, name: 'Cyber Room', category: 'cosmetics', rarity: 'epic', level: 4, price: 0.02, icon: '⌨️⭐⭐⭐', description: 'درآمد +50 | هک +15', effect: { income: 50, hackSuccess: 15 } },
    { id: 85, name: 'HQ Command', category: 'cosmetics', rarity: 'legendary', level: 5, price: 0.045, icon: '⌨️👑', description: 'درآمد +100 | هک +30 | مخفی +15', effect: { income: 100, hackSuccess: 30, stealth: 15 } },

    // Auto Attack Tools
    { id: 86, name: 'Auto-Attack v1', category: 'autoattack', rarity: 'uncommon', level: 1, price: 0.008, icon: '⚡', description: 'موفقیت 55% | حمله +10', effect: { autoAttackLevel: 1, successRate: 55, attackPower: 10 } },
    { id: 87, name: 'Auto-Attack v2', category: 'autoattack', rarity: 'rare', level: 2, price: 0.018, icon: '⚡⭐', description: 'موفقیت 65% | حمله +22', effect: { autoAttackLevel: 2, successRate: 65, attackPower: 22 } },
    { id: 88, name: 'Auto-Attack v3', category: 'autoattack', rarity: 'rare', level: 3, price: 0.038, icon: '⚡⭐⭐', description: 'موفقیت 75% | حمله +38', effect: { autoAttackLevel: 3, successRate: 75, attackPower: 38 } },
    { id: 89, name: 'Auto-Attack v4', category: 'autoattack', rarity: 'epic', level: 4, price: 0.075, icon: '⚡⭐⭐⭐', description: 'موفقیت 85% | حمله +60', effect: { autoAttackLevel: 4, successRate: 85, attackPower: 60 } },
    { id: 90, name: 'Auto-Attack Elite', category: 'autoattack', rarity: 'legendary', level: 5, price: 0.15, icon: '⚡👑', description: 'موفقیت 95% | حمله +95', effect: { autoAttackLevel: 5, successRate: 95, attackPower: 95 } }
];
