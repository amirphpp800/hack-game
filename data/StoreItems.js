
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
    // VPN Locations
    { id: 1, name: 'VPN آمریکا', category: 'vpn', rarity: 'uncommon', price: 0.0025, icon: '[US]', description: 'سرور VPN نیویورک - پینگ 45ms', effect: { stealth: 15 } },
    { id: 2, name: 'VPN آلمان', category: 'vpn', rarity: 'uncommon', price: 0.0022, icon: '[DE]', description: 'سرور VPN برلین - پینگ 35ms', effect: { stealth: 14 } },
    { id: 3, name: 'VPN ژاپن', category: 'vpn', rarity: 'rare', price: 0.0035, icon: '[JP]', description: 'سرور VPN توکیو - پینگ 120ms', effect: { stealth: 20 } },
    { id: 4, name: 'VPN سوئیس', category: 'vpn', rarity: 'rare', price: 0.0040, icon: '[CH]', description: 'سرور VPN زوریخ - حریم خصوصی بالا', effect: { stealth: 22, defense: 5 } },
    { id: 5, name: 'VPN هلند', category: 'vpn', rarity: 'uncommon', price: 0.0028, icon: '[NL]', description: 'سرور VPN آمستردام - سرعت بالا', effect: { stealth: 16 } },
    { id: 6, name: 'VPN سنگاپور', category: 'vpn', rarity: 'rare', price: 0.0038, icon: '[SG]', description: 'سرور VPN سنگاپور - دسترسی آسیا', effect: { stealth: 21 } },
    { id: 7, name: 'VPN کانادا', category: 'vpn', rarity: 'uncommon', price: 0.0024, icon: '[CA]', description: 'سرور VPN تورنتو - امن و سریع', effect: { stealth: 15 } },
    { id: 8, name: 'VPN بریتانیا', category: 'vpn', rarity: 'uncommon', price: 0.0026, icon: '[GB]', description: 'سرور VPN لندن - پینگ 30ms', effect: { stealth: 16 } },
    { id: 9, name: 'VPN استرالیا', category: 'vpn', rarity: 'rare', price: 0.0032, icon: '[AU]', description: 'سرور VPN سیدنی - دسترسی اقیانوسیه', effect: { stealth: 18 } },
    { id: 10, name: 'VPN فرانسه', category: 'vpn', rarity: 'uncommon', price: 0.0023, icon: '[FR]', description: 'سرور VPN پاریس - اروپای غربی', effect: { stealth: 14 } },
    { id: 11, name: 'VPN سوئد', category: 'vpn', rarity: 'rare', price: 0.0037, icon: '[SE]', description: 'سرور VPN استکهلم - قوانین سخت حریم خصوصی', effect: { stealth: 20, defense: 3 } },
    { id: 12, name: 'VPN نروژ', category: 'vpn', rarity: 'rare', price: 0.0039, icon: '[NO]', description: 'سرور VPN اسلو - امنیت بالا', effect: { stealth: 21, defense: 4 } },
    { id: 13, name: 'VPN Multi-Hop', category: 'vpn', rarity: 'epic', price: 0.0120, icon: '[MH]', description: 'اتصال چند لایه از 5 کشور مختلف', effect: { stealth: 40, defense: 10 } },
    { id: 14, name: 'VPN Onion Router', category: 'vpn', rarity: 'legendary', price: 0.0250, icon: '[TOR]', description: 'مسیریابی پیاز - ناشناسی کامل', effect: { stealth: 60, defense: 15 } },
    
    // Hardware
    { id: 15, name: 'پردازنده i5', category: 'hardware', rarity: 'common', price: 0.0045, icon: '[i5]', description: 'Intel Core i5 - عملکرد پایه', effect: { hackSuccess: 5 } },
    { id: 16, name: 'پردازنده i7', category: 'hardware', rarity: 'uncommon', price: 0.0085, icon: '[i7]', description: 'Intel Core i7 - عملکرد بالا', effect: { hackSuccess: 12, attackPower: 5 } },
    { id: 17, name: 'پردازنده i9', category: 'hardware', rarity: 'rare', price: 0.0160, icon: '[i9]', description: 'Intel Core i9 - قدرت فوق‌العاده', effect: { hackSuccess: 20, attackPower: 10 } },
    { id: 18, name: 'AMD Ryzen 9', category: 'hardware', rarity: 'rare', price: 0.0155, icon: '[R9]', description: 'AMD Ryzen 9 - کارایی بالا', effect: { hackSuccess: 22, attackPower: 12 } },
    { id: 19, name: 'GPU RTX 3060', category: 'hardware', rarity: 'uncommon', price: 0.0095, icon: '[3060]', description: 'رمزگشایی با GPU', effect: { hackSuccess: 15, attackPower: 8 } },
    { id: 20, name: 'GPU RTX 3080', category: 'hardware', rarity: 'rare', price: 0.0180, icon: '[3080]', description: 'قدرت پردازش بالا', effect: { hackSuccess: 25, attackPower: 15 } },
    { id: 21, name: 'GPU RTX 4090', category: 'hardware', rarity: 'epic', price: 0.0420, icon: '[4090]', description: 'قدرتمندترین GPU - هش شکنی سریع', effect: { hackSuccess: 40, attackPower: 25 } },
    { id: 22, name: 'رم 16GB DDR4', category: 'hardware', rarity: 'common', price: 0.0030, icon: '[16GB]', description: 'حافظه رم استاندارد', effect: { hackSuccess: 3 } },
    { id: 23, name: 'رم 32GB DDR5', category: 'hardware', rarity: 'uncommon', price: 0.0065, icon: '[32GB]', description: 'حافظه سریع DDR5', effect: { hackSuccess: 8 } },
    { id: 24, name: 'رم 64GB DDR5', category: 'hardware', rarity: 'rare', price: 0.0130, icon: '[64GB]', description: 'حافظه فوق سریع', effect: { hackSuccess: 15 } },
    { id: 25, name: 'SSD NVMe 1TB', category: 'hardware', rarity: 'uncommon', price: 0.0035, icon: '[SSD]', description: 'ذخیره‌سازی سریع', effect: { hackSuccess: 5 } },
    { id: 26, name: 'مادربرد Z790', category: 'hardware', rarity: 'rare', price: 0.0090, icon: '[MB]', description: 'مادربرد گیمینگ پیشرفته', effect: { hackSuccess: 10, defense: 5 } },
    { id: 27, name: 'پاور 1200W', category: 'hardware', rarity: 'uncommon', price: 0.0055, icon: '[PSU]', description: 'منبع تغذیه قدرتمند', effect: { income: 15 } },
    { id: 28, name: 'کیس RGB', category: 'hardware', rarity: 'common', price: 0.0025, icon: '[CASE]', description: 'کیس با نور RGB', effect: { income: 5 } },
    { id: 29, name: 'خنک‌کننده مایع', category: 'hardware', rarity: 'rare', price: 0.0075, icon: '[AIO]', description: 'سیستم خنک‌کننده مایع', effect: { hackSuccess: 8 } },
    { id: 30, name: 'پردازنده کوانتومی', category: 'hardware', rarity: 'legendary', price: 0.1800, icon: '[QUANTUM]', description: 'پردازش کوانتومی - آینده هک', effect: { hackSuccess: 80, attackPower: 50 } },
    
    // Software & Tools
    { id: 31, name: 'Kali Linux', category: 'software', rarity: 'uncommon', price: 0.0015, icon: '[KALI]', description: 'سیستم‌عامل تست نفوذ', effect: { hackSuccess: 10, attackPower: 5 } },
    { id: 32, name: 'Parrot OS', category: 'software', rarity: 'uncommon', price: 0.0018, icon: '[PARROT]', description: 'توزیع امنیتی پیشرفته', effect: { hackSuccess: 12, stealth: 5 } },
    { id: 33, name: 'Metasploit Pro', category: 'software', rarity: 'rare', price: 0.0095, icon: '[MSF]', description: 'فریمورک حرفه‌ای اکسپلویت', effect: { attackPower: 20, hackSuccess: 15 } },
    { id: 34, name: 'Burp Suite Pro', category: 'software', rarity: 'rare', price: 0.0088, icon: '[BURP]', description: 'ابزار تست وب اپلیکیشن', effect: { attackPower: 18, hackSuccess: 12 } },
    { id: 35, name: 'Wireshark', category: 'software', rarity: 'common', price: 0.0012, icon: '[WSHK]', description: 'آنالیز پکت شبکه', effect: { hackSuccess: 8 } },
    { id: 36, name: 'Nmap Pro', category: 'software', rarity: 'uncommon', price: 0.0035, icon: '[NMAP]', description: 'اسکن شبکه پیشرفته', effect: { hackSuccess: 10, attackPower: 5 } },
    { id: 37, name: 'John the Ripper', category: 'software', rarity: 'rare', price: 0.0065, icon: '[JTR]', description: 'شکستن رمز عبور قدرتمند', effect: { attackPower: 15, hackSuccess: 10 } },
    { id: 38, name: 'Hashcat GPU', category: 'software', rarity: 'rare', price: 0.0078, icon: '[HASH]', description: 'کرک رمز با GPU', effect: { attackPower: 18, hackSuccess: 12 } },
    { id: 39, name: 'Aircrack-ng', category: 'software', rarity: 'uncommon', price: 0.0042, icon: '[AIR]', description: 'هک شبکه وای‌فای', effect: { attackPower: 12, hackSuccess: 8 } },
    { id: 40, name: 'SQLmap', category: 'software', rarity: 'uncommon', price: 0.0038, icon: '[SQL]', description: 'تزریق SQL خودکار', effect: { attackPower: 10, hackSuccess: 8 } },
    { id: 41, name: 'Custom AI Hacker', category: 'software', rarity: 'epic', price: 0.0280, icon: '[AI]', description: 'هوش مصنوعی هک خودکار', effect: { attackPower: 35, hackSuccess: 30 } },
    { id: 42, name: 'Zero-Day Toolkit', category: 'software', rarity: 'legendary', price: 0.1500, icon: '[0DAY]', description: 'مجموعه اکسپلویت‌های روز صفر', effect: { attackPower: 70, hackSuccess: 60 } },
    
    // Scripts & Exploits
    { id: 43, name: 'DDoS Script', category: 'scripts', rarity: 'common', price: 0.0020, icon: '[DDOS]', description: 'حمله DDoS ساده', effect: { attackPower: 8 } },
    { id: 44, name: 'Botnet Controller', category: 'scripts', rarity: 'rare', price: 0.0110, icon: '[BOT]', description: 'کنترل شبکه بات', effect: { attackPower: 22, hackSuccess: 10 } },
    { id: 45, name: 'Keylogger', category: 'scripts', rarity: 'uncommon', price: 0.0032, icon: '[KEY]', description: 'ثبت کلیدهای فشرده شده', effect: { hackSuccess: 12, stealth: 8 } },
    { id: 46, name: 'RAT Trojan', category: 'scripts', rarity: 'rare', price: 0.0085, icon: '[RAT]', description: 'دسترسی از راه دور', effect: { attackPower: 18, hackSuccess: 15 } },
    { id: 47, name: 'Ransomware Kit', category: 'scripts', rarity: 'epic', price: 0.0350, icon: '[RAN]', description: 'باج‌افزار حرفه‌ای', effect: { attackPower: 40, hackSuccess: 20 } },
    { id: 48, name: 'Rootkit Advanced', category: 'scripts', rarity: 'epic', price: 0.0320, icon: '[ROOT]', description: 'روتکیت کرنل لول', effect: { attackPower: 38, stealth: 25 } },
    { id: 49, name: 'Phishing Framework', category: 'scripts', rarity: 'uncommon', price: 0.0045, icon: '[FISH]', description: 'سیستم فیشینگ خودکار', effect: { hackSuccess: 15, attackPower: 10 } },
    { id: 50, name: 'XSS Injector', category: 'scripts', rarity: 'uncommon', price: 0.0040, icon: '[XSS]', description: 'تزریق کد JavaScript', effect: { attackPower: 12, hackSuccess: 10 } },
    
    // Security & Defense
    { id: 51, name: 'فایروال پایه', category: 'security', rarity: 'common', price: 0.0018, icon: '[FW1]', description: 'محافظت پایه', effect: { defense: 8 } },
    { id: 52, name: 'فایروال پیشرفته', category: 'security', rarity: 'uncommon', price: 0.0055, icon: '[FW2]', description: 'دفاع قوی‌تر', effect: { defense: 18 } },
    { id: 53, name: 'فایروال Enterprise', category: 'security', rarity: 'rare', price: 0.0120, icon: '[FW3]', description: 'فایروال سطح سازمانی', effect: { defense: 35, encryption: 10 } },
    { id: 54, name: 'IDS/IPS System', category: 'security', rarity: 'rare', price: 0.0095, icon: '[IDS]', description: 'تشخیص و جلوگیری از نفوذ', effect: { defense: 28, encryption: 8 } },
    { id: 55, name: 'رمزگذار AES-256', category: 'security', rarity: 'uncommon', price: 0.0048, icon: '[AES]', description: 'رمزگذاری استاندارد نظامی', effect: { encryption: 20 } },
    { id: 56, name: 'رمزگذار RSA-4096', category: 'security', rarity: 'rare', price: 0.0092, icon: '[RSA]', description: 'رمزگذاری کلید عمومی', effect: { encryption: 30, defense: 5 } },
    { id: 57, name: 'رمزگذار کوانتومی', category: 'security', rarity: 'legendary', price: 0.1200, icon: '[QE]', description: 'رمزگذاری ضد کوانتوم', effect: { encryption: 80, defense: 40 } },
    { id: 58, name: 'Honeypot System', category: 'security', rarity: 'rare', price: 0.0075, icon: '[HONEY]', description: 'سیستم طعمه برای هکرها', effect: { defense: 25, stealth: 10 } },
    
    // Stealth & Anonymity
    { id: 59, name: 'زنجیره پراکسی', category: 'stealth', rarity: 'uncommon', price: 0.0038, icon: '[PROXY]', description: 'پراکسی چند لایه', effect: { stealth: 18 } },
    { id: 60, name: 'Tor Bridge', category: 'stealth', rarity: 'rare', price: 0.0085, icon: '[TOR]', description: 'پل Tor خصوصی', effect: { stealth: 28, defense: 8 } },
    { id: 61, name: 'MAC Spoofer', category: 'stealth', rarity: 'uncommon', price: 0.0032, icon: '[MAC]', description: 'جعل آدرس MAC', effect: { stealth: 15 } },
    { id: 62, name: 'DNS Tunneling', category: 'stealth', rarity: 'rare', price: 0.0068, icon: '[DNS]', description: 'تونل DNS برای دور زدن فایروال', effect: { stealth: 22, hackSuccess: 10 } },
    { id: 63, name: 'Traffic Obfuscator', category: 'stealth', rarity: 'rare', price: 0.0078, icon: '[OBF]', description: 'مبهم‌سازی ترافیک شبکه', effect: { stealth: 25, defense: 5 } },
    { id: 64, name: 'Anti-Forensics Kit', category: 'stealth', rarity: 'epic', price: 0.0180, icon: '[ANTI]', description: 'پاک‌سازی ردپای دیجیتال', effect: { stealth: 45, defense: 15 } },
    
    // Cosmetics
    { id: 65, name: 'کیبورد مکانیکی RGB', category: 'cosmetics', rarity: 'uncommon', price: 0.0028, icon: '[KB]', description: 'کیبورد گیمینگ نوردار', effect: { hackSuccess: 5, income: 8 } },
    { id: 66, name: 'موس گیمینگ', category: 'cosmetics', rarity: 'common', price: 0.0015, icon: '[MOUSE]', description: 'موس دقیق و سریع', effect: { hackSuccess: 3 } },
    { id: 67, name: 'هدست حرفه‌ای', category: 'cosmetics', rarity: 'uncommon', price: 0.0035, icon: '[HEAD]', description: 'هدست با صدای واضح', effect: { income: 10 } },
    { id: 68, name: 'وب‌کم 4K', category: 'cosmetics', rarity: 'uncommon', price: 0.0042, icon: '[CAM]', description: 'دوربین با کیفیت بالا', effect: { income: 12 } },
    { id: 69, name: 'مانیتور 27 اینچ', category: 'cosmetics', rarity: 'uncommon', price: 0.0065, icon: '[MON]', description: 'مانیتور QHD', effect: { hackSuccess: 8, income: 15 } },
    { id: 70, name: 'سه مانیتور Setup', category: 'cosmetics', rarity: 'rare', price: 0.0195, icon: '[3MON]', description: 'سه مانیتور 27 اینچ', effect: { hackSuccess: 18, income: 35 } },
    { id: 71, name: 'صندلی گیمینگ', category: 'cosmetics', rarity: 'uncommon', price: 0.0088, icon: '[CHAIR]', description: 'صندلی راحت و ارگونومیک', effect: { income: 20 } },
    { id: 72, name: 'میز گیمینگ RGB', category: 'cosmetics', rarity: 'rare', price: 0.0125, icon: '[DESK]', description: 'میز بزرگ با نور RGB', effect: { income: 25, hackSuccess: 5 } },
    { id: 73, name: 'هودی هکری', category: 'cosmetics', rarity: 'uncommon', price: 0.0022, icon: '[HOOD]', description: 'هودی مشکی کلاسیک', effect: { stealth: 10 } },
    { id: 74, name: 'ماسک گای فاکس', category: 'cosmetics', rarity: 'rare', price: 0.0058, icon: '[MASK]', description: 'نماد Anonymous', effect: { stealth: 15, income: 10 } },
    { id: 75, name: 'اتاق Cyber Setup', category: 'cosmetics', rarity: 'legendary', price: 0.0850, icon: '[ROOM]', description: 'اتاق کامل با تجهیزات حرفه‌ای', effect: { hackSuccess: 30, income: 80, stealth: 20 } }
];
