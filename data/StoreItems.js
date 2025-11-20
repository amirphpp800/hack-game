
export const NPC_ACCOUNTS = [
    {
        username: 'BlackHat_Elite',
        ip: '192.168.100.50',
        balance: 1.25,
        securityLevel: 80,
        security: { firewall: 40, encryption: 25, stealth: 15 },
        rank: 'اسطوره',
        inventory: []
    },
    {
        username: 'CyberPhantom',
        ip: '10.0.45.120',
        balance: 0.85,
        securityLevel: 65,
        security: { firewall: 30, encryption: 20, stealth: 15 },
        rank: 'نخبه',
        inventory: []
    },
    {
        username: 'Ghost_Protocol',
        ip: '172.16.88.200',
        balance: 0.65,
        securityLevel: 55,
        security: { firewall: 25, encryption: 18, stealth: 12 },
        rank: 'نخبه',
        inventory: []
    },
    {
        username: 'Anonymous_X',
        ip: '192.168.77.15',
        balance: 0.45,
        securityLevel: 45,
        security: { firewall: 20, encryption: 15, stealth: 10 },
        rank: 'متخصص',
        inventory: []
    },
    {
        username: 'DarkWeb_Trader',
        ip: '10.10.33.88',
        balance: 0.30,
        securityLevel: 35,
        security: { firewall: 15, encryption: 12, stealth: 8 },
        rank: 'متخصص',
        inventory: []
    }
];

export const STORE_ITEMS = [
    // VPN Locations - Level System
    { id: 1, name: 'VPN آمریکا سطح 1', category: 'vpn', rarity: 'common', level: 1, price: 0.002, icon: '[US-L1]', description: 'سرور VPN نیویورک - پینگ 45ms', effect: { stealth: 10 } },
    { id: 2, name: 'VPN آمریکا سطح 2', category: 'vpn', rarity: 'uncommon', level: 2, price: 0.004, icon: '[US-L2]', description: 'سرور VPN نیویورک ارتقا یافته', effect: { stealth: 20 } },
    { id: 3, name: 'VPN آمریکا سطح 3', category: 'vpn', rarity: 'rare', level: 3, price: 0.008, icon: '[US-L3]', description: 'سرور VPN نیویورک حرفه‌ای', effect: { stealth: 35 } },
    { id: 4, name: 'VPN آمریکا سطح 4', category: 'vpn', rarity: 'epic', level: 4, price: 0.015, icon: '[US-L4]', description: 'سرور VPN نیویورک نخبه', effect: { stealth: 55 } },
    { id: 5, name: 'VPN آمریکا سطح 5', category: 'vpn', rarity: 'legendary', level: 5, price: 0.03, icon: '[US-L5]', description: 'سرور VPN نیویورک افسانه‌ای', effect: { stealth: 80 } },
    
    { id: 6, name: 'VPN ژاپن سطح 1', category: 'vpn', rarity: 'common', level: 1, price: 0.0025, icon: '[JP-L1]', description: 'سرور VPN توکیو - پینگ 120ms', effect: { stealth: 12 } },
    { id: 7, name: 'VPN ژاپن سطح 2', category: 'vpn', rarity: 'uncommon', level: 2, price: 0.005, icon: '[JP-L2]', description: 'سرور VPN توکیو ارتقا یافته', effect: { stealth: 25 } },
    { id: 8, name: 'VPN ژاپن سطح 3', category: 'vpn', rarity: 'rare', level: 3, price: 0.01, icon: '[JP-L3]', description: 'سرور VPN توکیو حرفه‌ای', effect: { stealth: 40 } },
    { id: 9, name: 'VPN ژاپن سطح 4', category: 'vpn', rarity: 'epic', level: 4, price: 0.018, icon: '[JP-L4]', description: 'سرور VPN توکیو نخبه', effect: { stealth: 60 } },
    { id: 10, name: 'VPN ژاپن سطح 5', category: 'vpn', rarity: 'legendary', level: 5, price: 0.035, icon: '[JP-L5]', description: 'سرور VPN توکیو افسانه‌ای', effect: { stealth: 90 } },

    // Hardware - Level System
    { id: 11, name: 'پردازنده سطح 1', category: 'hardware', rarity: 'common', level: 1, price: 0.003, icon: '[CPU-L1]', description: 'پردازنده پایه', effect: { hackSuccess: 5, attackPower: 3 } },
    { id: 12, name: 'پردازنده سطح 2', category: 'hardware', rarity: 'uncommon', level: 2, price: 0.006, icon: '[CPU-L2]', description: 'پردازنده میان‌رده', effect: { hackSuccess: 12, attackPower: 8 } },
    { id: 13, name: 'پردازنده سطح 3', category: 'hardware', rarity: 'rare', level: 3, price: 0.012, icon: '[CPU-L3]', description: 'پردازنده قدرتمند', effect: { hackSuccess: 22, attackPower: 15 } },
    { id: 14, name: 'پردازنده سطح 4', category: 'hardware', rarity: 'epic', level: 4, price: 0.025, icon: '[CPU-L4]', description: 'پردازنده فوق‌العاده', effect: { hackSuccess: 38, attackPower: 25 } },
    { id: 15, name: 'پردازنده سطح 5', category: 'hardware', rarity: 'legendary', level: 5, price: 0.05, icon: '[CPU-L5]', description: 'پردازنده کوانتومی', effect: { hackSuccess: 60, attackPower: 40 } },

    { id: 16, name: 'GPU سطح 1', category: 'hardware', rarity: 'common', level: 1, price: 0.004, icon: '[GPU-L1]', description: 'کارت گرافیک پایه', effect: { hackSuccess: 8, attackPower: 5 } },
    { id: 17, name: 'GPU سطح 2', category: 'hardware', rarity: 'uncommon', level: 2, price: 0.008, icon: '[GPU-L2]', description: 'RTX 3060', effect: { hackSuccess: 15, attackPower: 10 } },
    { id: 18, name: 'GPU سطح 3', category: 'hardware', rarity: 'rare', level: 3, price: 0.016, icon: '[GPU-L3]', description: 'RTX 3080', effect: { hackSuccess: 28, attackPower: 18 } },
    { id: 19, name: 'GPU سطح 4', category: 'hardware', rarity: 'epic', level: 4, price: 0.032, icon: '[GPU-L4]', description: 'RTX 4080', effect: { hackSuccess: 45, attackPower: 30 } },
    { id: 20, name: 'GPU سطح 5', category: 'hardware', rarity: 'legendary', level: 5, price: 0.065, icon: '[GPU-L5]', description: 'RTX 4090 Ti', effect: { hackSuccess: 70, attackPower: 50 } },

    { id: 21, name: 'رم سطح 1', category: 'hardware', rarity: 'common', level: 1, price: 0.002, icon: '[RAM-L1]', description: '8GB DDR4', effect: { hackSuccess: 3 } },
    { id: 22, name: 'رم سطح 2', category: 'hardware', rarity: 'uncommon', level: 2, price: 0.004, icon: '[RAM-L2]', description: '16GB DDR4', effect: { hackSuccess: 8 } },
    { id: 23, name: 'رم سطح 3', category: 'hardware', rarity: 'rare', level: 3, price: 0.008, icon: '[RAM-L3]', description: '32GB DDR5', effect: { hackSuccess: 15 } },
    { id: 24, name: 'رم سطح 4', category: 'hardware', rarity: 'epic', level: 4, price: 0.016, icon: '[RAM-L4]', description: '64GB DDR5', effect: { hackSuccess: 28 } },
    { id: 25, name: 'رم سطح 5', category: 'hardware', rarity: 'legendary', level: 5, price: 0.032, icon: '[RAM-L5]', description: '128GB DDR5', effect: { hackSuccess: 45 } },

    // Software & Tools - Level System
    { id: 26, name: 'ابزار هک سطح 1', category: 'software', rarity: 'common', level: 1, price: 0.0015, icon: '[TOOL-L1]', description: 'ابزار هک پایه', effect: { hackSuccess: 8, attackPower: 5 } },
    { id: 27, name: 'ابزار هک سطح 2', category: 'software', rarity: 'uncommon', level: 2, price: 0.004, icon: '[TOOL-L2]', description: 'Kali Linux', effect: { hackSuccess: 15, attackPower: 10 } },
    { id: 28, name: 'ابزار هک سطح 3', category: 'software', rarity: 'rare', level: 3, price: 0.009, icon: '[TOOL-L3]', description: 'Metasploit Pro', effect: { hackSuccess: 28, attackPower: 20 } },
    { id: 29, name: 'ابزار هک سطح 4', category: 'software', rarity: 'epic', level: 4, price: 0.02, icon: '[TOOL-L4]', description: 'Custom AI Hacker', effect: { hackSuccess: 45, attackPower: 35 } },
    { id: 30, name: 'ابزار هک سطح 5', category: 'software', rarity: 'legendary', level: 5, price: 0.05, icon: '[TOOL-L5]', description: 'Zero-Day Toolkit', effect: { hackSuccess: 75, attackPower: 60 } },

    { id: 31, name: 'شکستن رمز سطح 1', category: 'software', rarity: 'common', level: 1, price: 0.002, icon: '[CRACK-L1]', description: 'John the Ripper', effect: { attackPower: 8, hackSuccess: 5 } },
    { id: 32, name: 'شکستن رمز سطح 2', category: 'software', rarity: 'uncommon', level: 2, price: 0.005, icon: '[CRACK-L2]', description: 'Hashcat', effect: { attackPower: 15, hackSuccess: 10 } },
    { id: 33, name: 'شکستن رمز سطح 3', category: 'software', rarity: 'rare', level: 3, price: 0.011, icon: '[CRACK-L3]', description: 'Hashcat GPU', effect: { attackPower: 28, hackSuccess: 18 } },
    { id: 34, name: 'شکستن رمز سطح 4', category: 'software', rarity: 'epic', level: 4, price: 0.022, icon: '[CRACK-L4]', description: 'AI Password Cracker', effect: { attackPower: 45, hackSuccess: 30 } },
    { id: 35, name: 'شکستن رمز سطح 5', category: 'software', rarity: 'legendary', level: 5, price: 0.045, icon: '[CRACK-L5]', description: 'Quantum Cracker', effect: { attackPower: 70, hackSuccess: 50 } },

    // Scripts & Exploits - Level System
    { id: 36, name: 'اسکریپت حمله سطح 1', category: 'scripts', rarity: 'common', level: 1, price: 0.0015, icon: '[SCR-L1]', description: 'DDoS Script', effect: { attackPower: 8 } },
    { id: 37, name: 'اسکریپت حمله سطح 2', category: 'scripts', rarity: 'uncommon', level: 2, price: 0.004, icon: '[SCR-L2]', description: 'Botnet Controller', effect: { attackPower: 18, hackSuccess: 8 } },
    { id: 38, name: 'اسکریپت حمله سطح 3', category: 'scripts', rarity: 'rare', level: 3, price: 0.009, icon: '[SCR-L3]', description: 'RAT Trojan', effect: { attackPower: 32, hackSuccess: 15 } },
    { id: 39, name: 'اسکریپت حمله سطح 4', category: 'scripts', rarity: 'epic', level: 4, price: 0.02, icon: '[SCR-L4]', description: 'Ransomware Kit', effect: { attackPower: 55, hackSuccess: 25 } },
    { id: 40, name: 'اسکریپت حمله سطح 5', category: 'scripts', rarity: 'legendary', level: 5, price: 0.045, icon: '[SCR-L5]', description: 'Advanced Rootkit', effect: { attackPower: 85, hackSuccess: 40 } },

    { id: 41, name: 'فیشینگ سطح 1', category: 'scripts', rarity: 'common', level: 1, price: 0.002, icon: '[FISH-L1]', description: 'فیشینگ ساده', effect: { hackSuccess: 10, attackPower: 5 } },
    { id: 42, name: 'فیشینگ سطح 2', category: 'scripts', rarity: 'uncommon', level: 2, price: 0.005, icon: '[FISH-L2]', description: 'فیشینگ پیشرفته', effect: { hackSuccess: 18, attackPower: 10 } },
    { id: 43, name: 'فیشینگ سطح 3', category: 'scripts', rarity: 'rare', level: 3, price: 0.011, icon: '[FISH-L3]', description: 'Phishing Framework', effect: { hackSuccess: 30, attackPower: 18 } },
    { id: 44, name: 'فیشینگ سطح 4', category: 'scripts', rarity: 'epic', level: 4, price: 0.023, icon: '[FISH-L4]', description: 'AI Phishing Bot', effect: { hackSuccess: 50, attackPower: 30 } },
    { id: 45, name: 'فیشینگ سطح 5', category: 'scripts', rarity: 'legendary', level: 5, price: 0.048, icon: '[FISH-L5]', description: 'Social Engineering Master', effect: { hackSuccess: 75, attackPower: 45 } },

    // Security & Defense - Level System
    { id: 46, name: 'فایروال سطح 1', category: 'security', rarity: 'common', level: 1, price: 0.002, icon: '[FW-L1]', description: 'فایروال پایه', effect: { defense: 10 } },
    { id: 47, name: 'فایروال سطح 2', category: 'security', rarity: 'uncommon', level: 2, price: 0.005, icon: '[FW-L2]', description: 'فایروال پیشرفته', effect: { defense: 22 } },
    { id: 48, name: 'فایروال سطح 3', category: 'security', rarity: 'rare', level: 3, price: 0.011, icon: '[FW-L3]', description: 'فایروال Enterprise', effect: { defense: 40, encryption: 10 } },
    { id: 49, name: 'فایروال سطح 4', category: 'security', rarity: 'epic', level: 4, price: 0.023, icon: '[FW-L4]', description: 'فایروال AI', effect: { defense: 65, encryption: 20 } },
    { id: 50, name: 'فایروال سطح 5', category: 'security', rarity: 'legendary', level: 5, price: 0.05, icon: '[FW-L5]', description: 'فایروال کوانتومی', effect: { defense: 100, encryption: 35 } },

    { id: 51, name: 'رمزگذاری سطح 1', category: 'security', rarity: 'common', level: 1, price: 0.0025, icon: '[ENC-L1]', description: 'AES-128', effect: { encryption: 12 } },
    { id: 52, name: 'رمزگذاری سطح 2', category: 'security', rarity: 'uncommon', level: 2, price: 0.006, icon: '[ENC-L2]', description: 'AES-256', effect: { encryption: 25 } },
    { id: 53, name: 'رمزگذاری سطح 3', category: 'security', rarity: 'rare', level: 3, price: 0.013, icon: '[ENC-L3]', description: 'RSA-4096', effect: { encryption: 45, defense: 10 } },
    { id: 54, name: 'رمزگذاری سطح 4', category: 'security', rarity: 'epic', level: 4, price: 0.028, icon: '[ENC-L4]', description: 'Elliptic Curve', effect: { encryption: 70, defense: 20 } },
    { id: 55, name: 'رمزگذاری سطح 5', category: 'security', rarity: 'legendary', level: 5, price: 0.06, icon: '[ENC-L5]', description: 'رمزگذاری کوانتومی', effect: { encryption: 110, defense: 35 } },

    { id: 56, name: 'IDS/IPS سطح 1', category: 'security', rarity: 'common', level: 1, price: 0.003, icon: '[IDS-L1]', description: 'تشخیص نفوذ پایه', effect: { defense: 12, encryption: 5 } },
    { id: 57, name: 'IDS/IPS سطح 2', category: 'security', rarity: 'uncommon', level: 2, price: 0.007, icon: '[IDS-L2]', description: 'تشخیص نفوذ پیشرفته', effect: { defense: 25, encryption: 12 } },
    { id: 58, name: 'IDS/IPS سطح 3', category: 'security', rarity: 'rare', level: 3, price: 0.015, icon: '[IDS-L3]', description: 'جلوگیری از نفوذ', effect: { defense: 42, encryption: 22 } },
    { id: 59, name: 'IDS/IPS سطح 4', category: 'security', rarity: 'epic', level: 4, price: 0.032, icon: '[IDS-L4]', description: 'AI Threat Detection', effect: { defense: 68, encryption: 35 } },
    { id: 60, name: 'IDS/IPS سطح 5', category: 'security', rarity: 'legendary', level: 5, price: 0.07, icon: '[IDS-L5]', description: 'Quantum Security Suite', effect: { defense: 105, encryption: 55 } },

    // Stealth & Anonymity - Level System
    { id: 61, name: 'پروکسی سطح 1', category: 'stealth', rarity: 'common', level: 1, price: 0.002, icon: '[PRX-L1]', description: 'پروکسی ساده', effect: { stealth: 10 } },
    { id: 62, name: 'پروکسی سطح 2', category: 'stealth', rarity: 'uncommon', level: 2, price: 0.005, icon: '[PRX-L2]', description: 'زنجیره پروکسی', effect: { stealth: 22 } },
    { id: 63, name: 'پروکسی سطح 3', category: 'stealth', rarity: 'rare', level: 3, price: 0.011, icon: '[PRX-L3]', description: 'Tor Bridge', effect: { stealth: 38, defense: 10 } },
    { id: 64, name: 'پروکسی سطح 4', category: 'stealth', rarity: 'epic', level: 4, price: 0.024, icon: '[PRX-L4]', description: 'Multi-Layer Proxy', effect: { stealth: 60, defense: 20 } },
    { id: 65, name: 'پروکسی سطح 5', category: 'stealth', rarity: 'legendary', level: 5, price: 0.052, icon: '[PRX-L5]', description: 'Quantum Anonymity', effect: { stealth: 95, defense: 30 } },

    { id: 66, name: 'مخفی‌سازی سطح 1', category: 'stealth', rarity: 'common', level: 1, price: 0.0025, icon: '[OBF-L1]', description: 'MAC Spoofer', effect: { stealth: 12 } },
    { id: 67, name: 'مخفی‌سازی سطح 2', category: 'stealth', rarity: 'uncommon', level: 2, price: 0.006, icon: '[OBF-L2]', description: 'DNS Tunneling', effect: { stealth: 25, hackSuccess: 8 } },
    { id: 68, name: 'مخفی‌سازی سطح 3', category: 'stealth', rarity: 'rare', level: 3, price: 0.013, icon: '[OBF-L3]', description: 'Traffic Obfuscator', effect: { stealth: 42, hackSuccess: 15 } },
    { id: 69, name: 'مخفی‌سازی سطح 4', category: 'stealth', rarity: 'epic', level: 4, price: 0.028, icon: '[OBF-L4]', description: 'Anti-Forensics Kit', effect: { stealth: 68, hackSuccess: 25, defense: 15 } },
    { id: 70, name: 'مخفی‌سازی سطح 5', category: 'stealth', rarity: 'legendary', level: 5, price: 0.06, icon: '[OBF-L5]', description: 'Ghost Protocol', effect: { stealth: 105, hackSuccess: 40, defense: 25 } },

    // Backdoor Items - NEW!
    { id: 71, name: 'بک‌دور سطح 1', category: 'backdoor', rarity: 'uncommon', level: 1, price: 0.005, icon: '[BD-L1]', description: 'نصب بک‌دور ساده - دسترسی دائمی به هدف', effect: { backdoorInstall: true, backdoorLevel: 1, stealMultiplier: 1.2 } },
    { id: 72, name: 'بک‌دور سطح 2', category: 'backdoor', rarity: 'rare', level: 2, price: 0.012, icon: '[BD-L2]', description: 'بک‌دور پیشرفته - استخراج مداوم', effect: { backdoorInstall: true, backdoorLevel: 2, stealMultiplier: 1.4, passiveIncome: 0.0001 } },
    { id: 73, name: 'بک‌دور سطح 3', category: 'backdoor', rarity: 'rare', level: 3, price: 0.025, icon: '[BD-L3]', description: 'بک‌دور حرفه‌ای - مخفی‌کاری بالا', effect: { backdoorInstall: true, backdoorLevel: 3, stealMultiplier: 1.6, passiveIncome: 0.0002, stealth: 15 } },
    { id: 74, name: 'بک‌دور سطح 4', category: 'backdoor', rarity: 'epic', level: 4, price: 0.05, icon: '[BD-L4]', description: 'بک‌دور نخبه - کنترل کامل', effect: { backdoorInstall: true, backdoorLevel: 4, stealMultiplier: 1.9, passiveIncome: 0.0004, stealth: 25, attackPower: 15 } },
    { id: 75, name: 'بک‌دور سطح 5', category: 'backdoor', rarity: 'legendary', level: 5, price: 0.1, icon: '[BD-L5]', description: 'بک‌دور افسانه‌ای - استخراج خودکار', effect: { backdoorInstall: true, backdoorLevel: 5, stealMultiplier: 2.3, passiveIncome: 0.0008, stealth: 40, attackPower: 30 } },

    // Anti-Backdoor Items - NEW!
    { id: 76, name: 'ضد بک‌دور سطح 1', category: 'antibackdoor', rarity: 'uncommon', level: 1, price: 0.004, icon: '[ABD-L1]', description: 'شناسایی بک‌دور پایه', effect: { antiBackdoor: true, backdoorDetection: 30, defense: 8 } },
    { id: 77, name: 'ضد بک‌دور سطح 2', category: 'antibackdoor', rarity: 'rare', level: 2, price: 0.01, icon: '[ABD-L2]', description: 'شناسایی و حذف بک‌دور', effect: { antiBackdoor: true, backdoorDetection: 50, backdoorRemoval: true, defense: 18 } },
    { id: 78, name: 'ضد بک‌دور سطح 3', category: 'antibackdoor', rarity: 'rare', level: 3, price: 0.022, icon: '[ABD-L3]', description: 'محافظت فعال از بک‌دور', effect: { antiBackdoor: true, backdoorDetection: 70, backdoorRemoval: true, backdoorBlock: 60, defense: 30 } },
    { id: 79, name: 'ضد بک‌دور سطح 4', category: 'antibackdoor', rarity: 'epic', level: 4, price: 0.045, icon: '[ABD-L4]', description: 'سیستم امنیتی هوشمند', effect: { antiBackdoor: true, backdoorDetection: 85, backdoorRemoval: true, backdoorBlock: 80, defense: 50, encryption: 20 } },
    { id: 80, name: 'ضد بک‌دور سطح 5', category: 'antibackdoor', rarity: 'legendary', level: 5, price: 0.095, icon: '[ABD-L5]', description: 'محافظت کوانتومی', effect: { antiBackdoor: true, backdoorDetection: 99, backdoorRemoval: true, backdoorBlock: 95, defense: 75, encryption: 40 } },

    // Cosmetics - Level System
    { id: 81, name: 'تجهیزات گیمینگ سطح 1', category: 'cosmetics', rarity: 'common', level: 1, price: 0.0015, icon: '[COSM-L1]', description: 'کیبورد و موس ساده', effect: { income: 5 } },
    { id: 82, name: 'تجهیزات گیمینگ سطح 2', category: 'cosmetics', rarity: 'uncommon', level: 2, price: 0.004, icon: '[COSM-L2]', description: 'تجهیزات RGB', effect: { income: 12, hackSuccess: 3 } },
    { id: 83, name: 'تجهیزات گیمینگ سطح 3', category: 'cosmetics', rarity: 'rare', level: 3, price: 0.009, icon: '[COSM-L3]', description: 'Setup حرفه‌ای', effect: { income: 25, hackSuccess: 8 } },
    { id: 84, name: 'تجهیزات گیمینگ سطح 4', category: 'cosmetics', rarity: 'epic', level: 4, price: 0.02, icon: '[COSM-L4]', description: 'اتاق Cyber کامل', effect: { income: 50, hackSuccess: 15 } },
    { id: 85, name: 'تجهیزات گیمینگ سطح 5', category: 'cosmetics', rarity: 'legendary', level: 5, price: 0.045, icon: '[COSM-L5]', description: 'مرکز فرماندهی افسانه‌ای', effect: { income: 100, hackSuccess: 30, stealth: 15 } },

    // Auto Attack Tools - Level System
    { id: 86, name: 'حمله خودکار سطح 1', category: 'autoattack', rarity: 'uncommon', level: 1, price: 0.008, icon: '[AUTO-L1]', description: 'حمله خودکار پایه - 55% موفقیت', effect: { autoAttackLevel: 1, successRate: 55, attackPower: 10 } },
    { id: 87, name: 'حمله خودکار سطح 2', category: 'autoattack', rarity: 'rare', level: 2, price: 0.018, icon: '[AUTO-L2]', description: 'حمله خودکار پیشرفته - 65% موفقیت', effect: { autoAttackLevel: 2, successRate: 65, attackPower: 22 } },
    { id: 88, name: 'حمله خودکار سطح 3', category: 'autoattack', rarity: 'rare', level: 3, price: 0.038, icon: '[AUTO-L3]', description: 'حمله خودکار حرفه‌ای - 75% موفقیت', effect: { autoAttackLevel: 3, successRate: 75, attackPower: 38 } },
    { id: 89, name: 'حمله خودکار سطح 4', category: 'autoattack', rarity: 'epic', level: 4, price: 0.075, icon: '[AUTO-L4]', description: 'حمله خودکار نخبه - 85% موفقیت', effect: { autoAttackLevel: 4, successRate: 85, attackPower: 60 } },
    { id: 90, name: 'حمله خودکار سطح 5', category: 'autoattack', rarity: 'legendary', level: 5, price: 0.15, icon: '[AUTO-L5]', description: 'حمله خودکار کوانتومی - 95% موفقیت', effect: { autoAttackLevel: 5, successRate: 95, attackPower: 95 } }
];
