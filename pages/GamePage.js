import { HUD } from '../components/HUD/HUD.js';
import { Terminal } from '../components/Terminal/Terminal.js';
import { NotificationUtils } from '../utils/NotificationUtils.js';
import { STORE_ITEMS, NPC_ACCOUNTS } from '../data/StoreItems.js';
import { StoreItem } from '../components/Store/StoreItem.js';

export class GamePage {
    constructor(user, kvService, onLogout) {
        this.gameState = user;
        if (!this.gameState.lockedBalance) {
            this.gameState.lockedBalance = 0;
        }
        this.kvService = kvService;
        this.onLogout = onLogout;
        this.hud = null;
        this.terminal = null;
        this.discoveredPlayers = [];
        this.allPlayers = [];
        this.attackState = { // Initialize attack state
            scanned: false,
            vulnerabilityChecked: false,
            targetIP: null,
            mistakes: 0
        };
    }

    render() {
        const container = document.getElementById('game-container');

        this.hud = new HUD(this.gameState, this.onLogout, () => this.unlockBalance());
        container.innerHTML = this.hud.render();
        this.hud.attachEvents();

        container.innerHTML += `
            <div class="main-nav">
                <button class="nav-btn active" data-tab="terminal">Terminal</button>
                <button class="nav-btn" data-tab="explorer">Explorer</button>
                <button class="nav-btn" data-tab="profile">Profile</button>
                <button class="nav-btn" data-tab="store">Store</button>
                <button class="nav-btn" data-tab="inventory">Inventory</button>
                <button class="nav-btn" data-tab="guide">راهنما</button>
            </div>

            <div id="terminal-tab" class="game-tab active"></div>
            <div id="explorer-tab" class="game-tab"></div>
            <div id="profile-tab" class="game-tab"></div>
            <div id="store-tab" class="game-tab"></div>
            <div id="inventory-tab" class="game-tab"></div>
            <div id="guide-tab" class="game-tab"></div>
        `;

        this.renderTerminal();
        this.attachNavEvents();
    }

    renderTerminal() {
        this.terminal = new Terminal((cmd) => this.processCommand(cmd));
        document.getElementById('terminal-tab').innerHTML = this.terminal.render();
        this.terminal.attachEvents();
        this.terminal.printWelcome(this.gameState.username, this.gameState.ip);
    }

    attachNavEvents() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.getAttribute('data-tab');
                this.showTab(tab);
            });
        });
    }

    showTab(tabName) {
        document.querySelectorAll('.game-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        document.getElementById(`${tabName}-tab`).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        if (tabName === 'store') {
            this.renderStore('all');
        } else if (tabName === 'inventory') {
            this.renderInventory();
        } else if (tabName === 'profile') {
            this.renderProfile();
        } else if (tabName === 'explorer') {
            this.renderExplorer();
        } else if (tabName === 'guide') {
            this.renderGuide();
        }
    }

    processCommand(cmd) {
        const parts = cmd.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Initialize attack state if not exists
        if (!this.attackState) {
            this.attackState = {
                scanned: false,
                vulnerabilityChecked: false,
                targetIP: null,
                mistakes: 0
            };
        }

        const commands = {
            'help': () => this.showHelp(),
            'man': () => this.showHelp(),
            'clear': () => this.terminal.clear(),
            'cls': () => this.terminal.clear(),
            'ls': () => this.cmdLs(args),
            'cat': () => this.cmdCat(args),
            'ifconfig': () => this.cmdIfconfig(),
            'whoami': () => this.terminal.print(`<span style="color: #00FF76;">${this.gameState.username}</span>`),
            'pwd': () => this.terminal.print(`<span style="color: #2CF6F6;">/home/${this.gameState.username}</span>`),
            'date': () => this.terminal.print(new Date().toString()),
            'uname': () => this.terminal.print('Linux cyberspace 6.1.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.0 x86_64 GNU/Linux'),
            'ps': () => this.cmdPs(),
            'top': () => this.cmdTop(),
            'free': () => this.cmdFree(),
            'df': () => this.cmdDf(),
            'nmap': () => this.cmdNmap(args),
            'scan': () => this.cmdScanTarget(args),
            'ping': () => this.cmdPing(args),
            'traceroute': () => this.cmdTraceroute(args),
            'ssh': () => this.cmdSsh(args),
            'exploit': () => this.cmdExploit(args),
            'attack': () => this.cmdAttackTarget(args),
            'metasploit': () => this.cmdMetasploit(args),
            'msfconsole': () => this.cmdMetasploit(args),
            'hydra': () => this.cmdHydra(args),
            'john': () => this.cmdJohn(args),
            'hashcat': () => this.cmdHashcat(args),
            'aircrack-ng': () => this.cmdAircrack(args),
            'wireshark': () => this.cmdWireshark(),
            'tcpdump': () => this.cmdTcpdump(args),
            'sqlmap': () => this.cmdSqlmap(args),
            'nikto': () => this.cmdNikto(args),
            'burpsuite': () => this.cmdBurp(),
            'history': () => this.cmdHistory(),
            'echo': () => this.cmdEcho(args),
            'profile': () => this.showTab('profile'),
            'store': () => this.showTab('store'),
            'shop': () => this.showTab('store'),
            'inventory': () => this.showTab('inventory'),
            'inv': () => this.showTab('inventory'),
            'explorer': () => this.showTab('explorer'),
            'scan-network': () => this.showTab('explorer'),
            'balance': () => this.cmdBalance(),
            'wallet': () => this.cmdBalance(),
            'status': () => this.cmdStatus(),
            'info': () => this.cmdStatus(),
            'exit': () => this.terminal.print('<span class="error">[X] Cannot exit shell in simulation mode</span>'),
            'sudo': () => this.terminal.print('<span class="warning">[!] You are already root</span>'),
            'reboot': () => this.terminal.print('<span class="warning">[!] System reboot disabled in simulation</span>'),
            'shutdown': () => this.terminal.print('<span class="warning">[!] System shutdown disabled in simulation</span>'),
            'use': () => this.cmdUseItem(args),
            'autoattack': () => this.cmdAutoAttack(args),
        };

        if (commands[command]) {
            commands[command]();
        } else {
            this.terminal.print(`<span class="error">[X] bash: ${command}: command not found</span>`);
            this.terminal.print(`<span style="color: #9EA5B3;">Type 'help' to see available commands</span>`);
            this.applyPenalty();
        }
    }

    applyPenalty() {
        const penalty = 0.0005;
        this.gameState.balance = Math.max(0, this.gameState.balance - penalty);
        this.attackState.mistakes++;
        this.terminal.print(`<span class="error">❌ اشتباه! جریمه: ₿${penalty.toFixed(4)}</span>`);
        this.hud.updateBalance(this.gameState.balance);
        this.saveState();
    }

    showHelp() {
        const helpText = `
<span class="info">════════════════════════════════════════════════════════════════</span>
<span class="success">CYBER BREACH SHELL - Available Commands:</span>
<span class="info">════════════════════════════════════════════════════════════════</span>

<span style="color: #2CF6F6;">SYSTEM INFORMATION:</span>
  whoami              - Display current user
  hostname            - Show system hostname
  uname -a            - System information
  date                - Current date and time
  uptime              - System uptime
  pwd                 - Present working directory

<span style="color: #2CF6F6;">FILE OPERATIONS:</span>
  ls                  - List directory contents
  cat [file]          - Display file contents

<span style="color: #2CF6F6;">NETWORK TOOLS:</span>
  ifconfig            - Network interface configuration
  ip addr             - Show IP addresses
  netstat             - Network statistics
  ping [ip]           - Test connection to IP
  traceroute [ip]     - Trace route to destination
  nmap [ip]           - Network scan tool
  scan [ip]           - Deep scan target (shows full info)
  attack [ip]         - Launch attack on target

<span style="color: #2CF6F6;">PROCESS MANAGEMENT:</span>
  ps                  - Show running processes
  top                 - Task manager
  free                - Memory usage
  df                  - Disk usage

<span style="color: #2CF6F6;">HACKING TOOLS:</span>
  ssh [target]        - Connect to remote system
  exploit [target]    - Launch exploit attack
  metasploit          - Metasploit framework
  hydra [target]      - Brute force attack
  john [target]       - Password cracker
  hashcat [target]    - GPU password recovery
  aircrack-ng         - WiFi security auditing
  wireshark           - Network protocol analyzer
  tcpdump [options]   - Packet capture
  sqlmap [target]     - SQL injection tool
  nikto [target]      - Web server scanner
  burpsuite           - Web security testing

<span style="color: #2CF6F6;">GAME COMMANDS:</span>
  profile             - View your profile
  store / shop        - Open dark web market
  inventory / inv     - View your items
  explorer            - Network explorer
  balance / wallet    - Check Bitcoin balance
  status / info       - System status
  history             - Command history
  clear / cls         - Clear screen
  use [item_name]     - Use an inventory item
  autoattack [target] - Launch automated attack

<span class="info">════════════════════════════════════════════════════════════════</span>
        `.trim();
        this.terminal.print(helpText);
    }

    cmdLs(args) {
        const files = [
            'Desktop', 'Documents', 'Downloads', 'exploits', 'scripts',
            'tools', 'configs', '.ssh', '.gnupg', 'targets.txt',
            'passwords.db', 'network.log', 'README.md', 'guide.html'
        ];
        this.terminal.print(files.join('  '));
    }

    cmdCat(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">cat: missing file operand</span>');
            return;
        }

        const fileContents = {
            'README.md': '<span class="info">CYBER BREACH NETWORK SIMULATOR\nVersion: 3.2.1\nThis is a fictional hacking environment for educational purposes.</span>',
            'targets.txt': `<span style="color: #9EA5B3;">${this.allPlayers.map(p => `${p.ip} - ${p.username}`).join('\n') || 'No targets scanned yet. Use "explorer" or "nmap" to discover targets.'}</span>`,
            'network.log': '<span class="success">[+] Network initialized\n[*] Scanning subnet 192.168.1.0/24\n[+] 5 hosts discovered\n[!] Firewall detected on 192.168.1.1</span>',
            'guide.html': `<span class="info">
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>راهنمای بازی سایبر بریک</title>
    <style>
        body { font-family: 'Tahoma', sans-serif; background-color: #1a1a1d; color: #c5c6c7; line-height: 1.6; padding: 20px; }
        .container { max-width: 900px; margin: auto; background-color: #282a36; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
        h1, h2, h3 { color: #6272a4; }
        h1 { text-align: center; margin-bottom: 30px; font-size: 2.5em; }
        h2 { margin-top: 25px; border-bottom: 1px solid #44475a; padding-bottom: 5px; }
        .section { margin-bottom: 20px; }
        .command { background-color: #343746; padding: 5px 10px; border-radius: 4px; font-family: 'Courier New', Courier, monospace; color: #f1fa8c; }
        .item { color: #8be9fd; }
        .ip { color: #50fa7b; }
        .penalty { color: #ff5555; }
        .success { color: #50fa7b; }
        .warning { color: #f1fa8c; }
        .error { color: #ff5555; }
        .highlight { color: #ff79c6; font-weight: bold; }
        ul { list-style-type: disc; margin-left: 20px; }
        li { margin-bottom: 10px; }
        .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #6272a4; }
    </style>
</head>
<body>
    <div class="container">
        <h1>راهنمای جامع بازی سایبر بریک</h1>

        <div class="section">
            <h2>مقدمه</h2>
            <p>به شبیه‌ساز هک پیشرفته سایبر بریک خوش آمدید! این محیط برای یادگیری و تمرین مهارت‌های هک و امنیت در یک فضای شبیه‌سازی شده طراحی شده است. در این راهنما، با بخش‌های مختلف بازی، دستورات، آیتم‌ها و نحوه حمله آشنا خواهید شد.</p>
        </div>

        <div class="section">
            <h2>بخش‌های اصلی</h2>
            <ul>
                <li><span class="command">Terminal</span>: مرکز فرماندهی شما برای اجرای دستورات و تعامل با سیستم.</li>
                <li><span class="command">Explorer</span>: برای کشف و شناسایی اهداف در شبکه.</li>
                <li><span class="command">Profile</span>: نمایش اطلاعات و آمار حساب کاربری شما.</li>
                <li><span class="command">Store</span>: بازار سیاه برای خرید ابزارها، اسکریپت‌ها و ارتقاء سیستم امنیتی شما.</li>
                <li><span class="command">Inventory</span>: نمایش آیتم‌هایی که خریداری کرده‌اید و قابل استفاده هستند.</li>
                <li><span class="command">راهنما (Guide)</span>: همین صفحه که در حال مطالعه آن هستید!</li>
            </ul>
        </div>

        <div class="section">
            <h2>دستورات پایه ترمینال</h2>
            <ul>
                <li><span class="command">help</span> یا <span class="command">man</span>: نمایش لیست کامل دستورات موجود.</li>
                <li><span class="command">clear</span> یا <span class="command">cls</span>: پاک کردن صفحه ترمینال.</li>
                <li><span class="command">ls</span>: لیست کردن فایل‌ها و دایرکتوری‌های موجود.</li>
                <li><span class="command">cat [filename]</span>: نمایش محتوای یک فایل.</li>
                <li><span class="command">whoami</span>: نمایش نام کاربری فعلی شما.</li>
                <li><span class="command">ip addr</span> یا <span class="command">ifconfig</span>: نمایش اطلاعات شبکه و IP شما.</li>
                <li><span class="command">balance</span> یا <span class="command">wallet</span>: نمایش موجودی بیت‌کوین شما.</li>
                <li><span class="command">status</span> یا <span class="command">info</span>: نمایش وضعیت کلی سیستم و آمار شما.</li>
                <li><span class="command">history</span>: نمایش تاریخچه دستورات وارد شده.</li>
            </ul>
        </div>

        <div class="section">
            <h2>ابزارهای شبکه و اسکن</h2>
            <ul>
                <li><span class="command">nmap [IP]</span>: اسکن اولیه پورت‌های باز یک هدف. <span class="warning">مرحله ۱ حمله</span></li>
                <li><span class="command">nikto [IP]</span>: شناسایی آسیب‌پذیری‌های وب سرور هدف. <span class="warning">مرحله ۲ حمله</span></li>
                <li><span class="command">ping [IP]</span>: تست اتصال به یک IP خاص.</li>
                <li><span class="command">traceroute [IP]</span>: نمایش مسیر رسیدن به مقصد.</li>
                <li><span class="command">scan [IP]</span>: اسکن عمیق‌تر هدف برای اطلاعات بیشتر.</li>
            </ul>
        </div>

        <div class="section">
            <h2>ابزارهای حمله و نفوذ</h2>
            <p>برای حمله موفق، باید مراحل را به ترتیب و با استفاده از دستورات صحیح انجام دهید. استفاده اشتباه از دستورات منجر به جریمه و افزایش سطح هشدار هدف می‌شود.</p>
            <ul>
                <li><span class="command">exploit [IP]</span>: اجرای حمله اصلی پس از شناسایی آسیب‌پذیری. <span class="warning">مرحله ۳ حمله</span></li>
                <li><span class="command">sqlmap [IP]</span>: ابزار تخصصی برای بهره‌برداری از SQL Injection.</li>
                <li><span class="command">hydra [IP]</span>: حمله Brute Force برای حدس زدن رمز عبور (مثلاً SSH یا FTP).</li>
                <li><span class="command">ssh [IP]</span>: تلاش برای اتصال امن به سیستم هدف.</li>
                <li><span class="command">metasploit</span>: فریمورک قدرتمند متااسپلویت برای حملات پیچیده.</li>
            </ul>
            <p><span class="penalty">جریمه:</span> در صورت استفاده نادرست از دستورات یا شکست در حمله، مقداری از بیت‌کوین شما کسر خواهد شد و احتمال شناسایی افزایش می‌یابد.</p>
        </div>

        <div class="section">
            <h2>فروشگاه (Store)</h2>
            <p>در فروشگاه می‌توانید آیتم‌های مختلفی را خریداری کنید:</p>
            <ul>
                <li><span class="item">VPN, Proxy</span>: افزایش امنیت و ناشناس بودن شما.</li>
                <li><span class="item">Hardware Upgrades</span>: بهبود عملکرد سیستم شما.</li>
                <li><span class="item">Software Tools</span>: ابزارهای جدید هک و اسکن.</li>
                <li><span class="item">Scripts</span>: اسکریپت‌های خودکار برای تسریع فرآیندها.</li>
                <li><span class="item">Stealth Items</span>: برای کاهش شانس شناسایی شدن.</li>
                <li><span class="item">Security Items</span>: برای افزایش سطح دفاعی شما و باز کردن بالانس قفل شده.</li>
                <li><span class="item highlight">⚡ Auto Attack</span>: آیتم‌های حمله خودکار در سطوح مختلف. با خرید این آیتم‌ها و استفاده از دستور <span class="command">autoattack [IP]</span> می‌توانید حملات خودکار را اجرا کنید.</li>
            </ul>
            <p>برای استفاده از آیتم‌های امنیتی، ممکن است نیاز باشد که <span class="command">balance</span> خود را آزاد کنید.</p>
        </div>

        <div class="section">
            <h2>نحوه بازی و اتک</h2>
            <ol>
                <li>ابتدا با استفاده از <span class="command">explorer</span> یا <span class="command">nmap [IP]</span> هدف خود را پیدا کنید.</li>
                <li>با <span class="command">nikto [IP]</span> آسیب‌پذیری‌های هدف را شناسایی کنید.</li>
                <li>با استفاده از دستور مناسب مانند <span class="command">exploit [IP]</span>، <span class="command">sqlmap [IP]</span> یا <span class="command">hydra [IP]</span> به هدف حمله کنید.</li>
                <li>دقت کنید که دستورات را به درستی وارد کنید. هر اشتباه منجر به جریمه می‌شود.</li>
                <li>برای حملات خودکار، ابتدا آیتم <span class="item">Auto Attack</span> را از فروشگاه خریداری کنید و سپس از دستور <span class="command">autoattack [IP]</span> استفاده نمایید.</li>
                <li>هنگام استفاده از آیتم‌ها یا دستورات، به پیش‌نمایش کارت یا آیکون آیتم توجه کنید تا از انتخاب درست خود مطمئن شوید.</li>
            </ol>
        </div>

        <div class="footer">
            <p>&copy; 2023 شبیه‌ساز سایبر بریک. تمام حقوق محفوظ است.</p>
            <p>موفق باشید هکر!</p>
        </div>
    </div>
</body>
</html>
            `).trim();
        }

        if (fileContents[args[0]]) {
            this.terminal.print(fileContents[args[0]]);
        } else {
            this.terminal.print(`<span class="error">cat: ${args[0]}: No such file or directory</span>`);
        }
    }

    cmdPwd() {
        this.terminal.print(`/root${this.terminal.currentPath !== '~' ? '/' + this.terminal.currentPath : ''}`);
    }

    cmdWhoami() {
        this.terminal.print(`<span style="color: #00FF76;">${this.gameState.username}</span>`);
    }

    cmdIfconfig() {
        this.terminal.print(`
<span style="color: #2CF6F6;">eth0:</span> flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet <span style="color: #00FF76;">${this.gameState.ip}</span>  netmask 255.255.255.0  broadcast 192.168.1.255
        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)
        RX packets 1337  bytes 420000 (410.1 KiB)
        TX packets 2048  bytes 690000 (673.8 KiB)

<span style="color: #2CF6F6;">lo:</span> flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        `);
    }

    cmdIp(args) {
        if (args[0] === 'addr' || args[0] === 'address' || args.length === 0) {
            this.terminal.print(`
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500
    inet <span style="color: #00FF76;">${this.gameState.ip}/24</span> brd 192.168.1.255 scope global eth0
            `);
        } else {
            this.terminal.print(`<span class="error">ip: command not recognized. Try: ip addr</span>`);
        }
    }

    cmdNetstat() {
        const ports = [
            { proto: 'tcp', local: `${this.gameState.ip}:22`, foreign: '0.0.0.0:*', state: 'LISTEN' },
            { proto: 'tcp', local: `${this.gameState.ip}:80`, foreign: '0.0.0.0:*', state: 'LISTEN' },
            { proto: 'tcp', local: `${this.gameState.ip}:443`, foreign: '0.0.0.0:*', state: 'LISTEN' },
            { proto: 'tcp', local: `${this.gameState.ip}:3306`, foreign: '0.0.0.0:*', state: 'LISTEN' },
            { proto: 'tcp', local: `${this.gameState.ip}:8080`, foreign: '0.0.0.0:*', state: 'LISTEN' }
        ];

        this.terminal.print(`
<span style="color: #2CF6F6;">Active Internet connections</span>
Proto  Local Address          Foreign Address        State
${ports.map(p => `${p.proto}    ${p.local.padEnd(22)} ${p.foreign.padEnd(22)} <span style="color: #00FF76;">${p.state}</span>`).join('\n')}
        `);
    }

    cmdPs() {
        const processes = [
            { pid: 1, cmd: 'systemd' },
            { pid: 142, cmd: 'sshd' },
            { pid: 256, cmd: 'apache2' },
            { pid: 389, cmd: 'mysql' },
            { pid: 512, cmd: 'cyber-breach' },
            { pid: 601, cmd: 'bash' }
        ];

        this.terminal.print(`
  PID TTY          TIME CMD
${processes.map(p => `${String(p.pid).padEnd(5)} pts/0    00:00:00 ${p.cmd}`).join('\n')}
        `);
    }

    cmdTop() {
        this.terminal.print(`
<span style="color: #2CF6F6;">top - ${new Date().toTimeString().split(' ')[0]} up 2 days, 15:42, 1 user, load average: 0.15, 0.23, 0.18</span>
Tasks: 127 total,   1 running, 126 sleeping
%Cpu(s):  5.2 us,  2.1 sy,  0.0 ni, 92.1 id,  0.6 wa
MiB Mem :  16384.0 total,   8192.5 free,   4096.2 used,   4095.3 buff/cache
MiB Swap:   4096.0 total,   4096.0 free,      0.0 used.  11520.8 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  512 root      20   0  256872  45120  12456 S   3.2   0.3   0:15.23 cyber-breach
  256 www-data  20   0  389456  78934  23456 S   1.8   0.5   1:23.45 apache2
        `);
    }

    cmdUname(args) {
        if (args[0] === '-a') {
            this.terminal.print('Linux cyberspace 6.1.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.1.20-1kali1 (2023-03-22) x86_64 GNU/Linux');
        } else {
            this.terminal.print('Linux');
        }
    }

    cmdHostname() {
        this.terminal.print('cyberspace.local');
    }

    cmdDate() {
        this.terminal.print(new Date().toString());
    }

    cmdUptime() {
        const days = Math.floor(Math.random() * 30);
        const hours = Math.floor(Math.random() * 24);
        this.terminal.print(`${new Date().toTimeString().split(' ')[0]} up ${days} days, ${hours}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}, 1 user, load average: 0.${Math.floor(Math.random() * 99)}, 0.${Math.floor(Math.random() * 99)}, 0.${Math.floor(Math.random() * 99)}`);
    }

    cmdFree() {
        this.terminal.print(`
              total        used        free      shared  buff/cache   available
Mem:       16384000     4096000     8192000      128000     4096000    11520000
Swap:       4096000           0     4096000
        `);
    }

    cmdDf() {
        this.terminal.print(`
Filesystem     1K-blocks      Used Available Use% Mounted on
/dev/sda1      524288000 104857600 393216000  22% /
tmpfs            8192000      1024   8190976   1% /dev/shm
/dev/sda2      104857600  52428800  47185920  53% /home
        `);
    }

    cmdNmap(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">nmap: No target specified</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Usage: nmap [IP_Address]</span>');
            this.applyPenalty();
            return;
        }

        // Check if IP is valid format
        const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipPattern.test(args[0])) {
            this.terminal.print('<span class="error">❌ Invalid IP address format!</span>');
            this.applyPenalty();
            return;
        }

        this.attackState.targetIP = args[0];
        this.attackState.scanned = false;
        this.attackState.vulnerabilityChecked = false;

        this.terminal.print(`<span class="info">[*] Starting Nmap 7.93 scan...</span>`);
        this.terminal.print(`<span class="info">[*] Target: ${args[0]}</span>`);

        setTimeout(() => {
            this.attackState.scanned = true;
            this.terminal.print(`<span class="success">[+] Scan complete for ${args[0]}</span>`);
            this.terminal.print(`<span style="color: #9EA5B3;">
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
8080/tcp open  http-proxy
            </span>`);
            this.terminal.print(`<span class="info">════════════════════════════════════════</span>`);
            this.terminal.print(`<span style="color: #2CF6F6;">✓ مرحله 1 تکمیل شد!</span>`);
            this.terminal.print(`<span style="color: #FFCE3D;">➜ دستور پیشنهادی بعدی:</span> <span class="success">nikto ${args[0]}</span>`);
            this.terminal.print(`<span class="info">════════════════════════════════════════</span>`);
        }, 2000);
    }

    cmdPing(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">ping: usage error: Destination address required</span>');
            return;
        }

        this.terminal.print(`<span class="info">PING ${args[0]} (${args[0]}) 56(84) bytes of data.</span>`);
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const time = (Math.random() * 50 + 10).toFixed(1);
                this.terminal.print(`64 bytes from ${args[0]}: icmp_seq=${i + 1} ttl=64 time=${time} ms`);
            }, i * 1000);
        }
    }

    cmdTraceroute(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">traceroute: Missing host</span>');
            return;
        }

        this.terminal.print(`<span class="info">traceroute to ${args[0]} (${args[0]}), 30 hops max, 60 byte packets</span>`);
        const hops = ['192.168.1.1', '10.0.0.1', '172.16.0.1', args[0]];
        hops.forEach((hop, i) => {
            setTimeout(() => {
                const time = (Math.random() * 20 + 5).toFixed(3);
                this.terminal.print(` ${i + 1}  ${hop} (${hop})  ${time} ms`);
            }, i * 800);
        });
    }

    cmdSsh(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">ssh: missing destination</span>');
            return;
        }

        this.terminal.print(`<span class="info">Connecting to ${args[0]}...</span>`);
        setTimeout(() => {
            this.terminal.print('<span class="error">[X] Connection refused - Target firewall is active</span>');
            this.terminal.print('<span class="warning">[!] Try using "exploit" command to bypass security</span>');
        }, 1500);
    }

    cmdExploit(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">exploit: No target specified</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Usage: exploit [IP_Address]</span>');
            this.applyPenalty();
            return;
        }

        if (!this.attackState.scanned || this.attackState.targetIP !== args[0]) {
            this.terminal.print('<span class="error">❌ خطا! ابتدا باید با nmap اسکن کنید!</span>');
            this.terminal.print(`<span style="color: #FFCE3D;">مراحل صحیح:</span>`);
            this.terminal.print(`<span class="success">1. nmap ${args[0]}</span>`);
            this.terminal.print(`<span class="success">2. nikto ${args[0]}</span>`);
            this.terminal.print(`<span class="success">3. exploit ${args[0]}</span>`);
            this.applyPenalty();
            return;
        }

        if (!this.attackState.vulnerabilityChecked) {
            this.terminal.print('<span class="error">❌ خطا! ابتدا باید با nikto آسیب‌پذیری‌ها را شناسایی کنید!</span>');
            this.terminal.print(`<span style="color: #FFCE3D;">دستور بعدی: nikto ${args[0]}</span>`);
            this.applyPenalty();
            return;
        }

        this.terminal.print(`<span class="info">[*] Launching exploit against ${args[0]}...</span>`);
        this.terminal.print(`<span class="info">[*] Using CVE-2021-21703 (PHP Vulnerability)</span>`);
        this.terminal.print(`<span class="info">[*] Payload injected...</span>`);

        setTimeout(async () => {
            const target = this.allPlayers.find(p => p.ip === args[0]);
            if (!target) {
                this.terminal.print('<span class="error">[-] Target not found in network</span>');
                this.resetAttackState();
                return;
            }

            const attackPower = this.calculateAttackPower();
            const defensePower = target.securityLevel || 50;
            const successChance = Math.max(0.2, Math.min(0.9, attackPower / (attackPower + defensePower)));
            const success = Math.random() < successChance;

            if (success) {
                const stolen = target.balance * 0.3;
                this.gameState.balance += stolen;
                this.gameState.stats.wins++;
                this.gameState.stats.totalStolen += stolen;

                this.terminal.print('<span class="success">╔════════════════════════════════════════╗</span>');
                this.terminal.print('<span class="success">║   [+] EXPLOIT SUCCESSFUL!              ║</span>');
                this.terminal.print('<span class="success">╚════════════════════════════════════════╝</span>');
                this.terminal.print(`<span class="success">[+] Root shell obtained on ${args[0]}</span>`);
                this.terminal.print(`<span class="success">[+] Stolen: ₿${stolen.toFixed(4)}</span>`);
                this.terminal.print(`<span style="color: #2CF6F6;">[+] New balance: ₿${this.gameState.balance.toFixed(4)}</span>`);

                NotificationUtils.show(`حمله موفق! ₿${stolen.toFixed(4)} دزدیده شد`, 'success');
                this.hud.updateBalance(this.gameState.balance);
            } else {
                this.gameState.stats.losses++;
                this.terminal.print('<span class="error">╔════════════════════════════════════════╗</span>');
                this.terminal.print('<span class="error">║   [-] EXPLOIT FAILED!                  ║</span>');
                this.terminal.print('<span class="error">╚════════════════════════════════════════╝</span>');
                this.terminal.print('<span class="error">[-] Target firewall blocked the attack</span>');
                this.terminal.print('<span class="error">[-] IDS detected malicious activity</span>');
                this.terminal.print('<span class="warning">[!] Consider upgrading your tools in Store</span>');

                NotificationUtils.show('حمله شکست خورد!', 'error');
            }

            await this.saveState();
            this.resetAttackState();
        }, 3000);
    }

    cmdMetasploit(args) {
        this.terminal.print(`
<span style="color: #B537F2;">
     ,           ,
    /             \\
   ((__---,,,---__))
      (_) O O (_)_________
         \\ _ /            |\\
          o_o \\   M S F   | \\
               \\   _____  |  *
                |||   WW|||
                |||     |||
</span>
<span style="color: #2CF6F6;">Metasploit Framework Console v6.3.14</span>

[*] Starting the Metasploit Framework console...
msf6 > <span class="warning">Use 'explorer' tab for visual exploit interface</span>
        `);
    }

    cmdHydra(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">hydra: No target specified</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Usage: hydra [IP_Address]</span>');
            this.applyPenalty();
            return;
        }

        if (!this.attackState.scanned || this.attackState.targetIP !== args[0]) {
            this.terminal.print('<span class="error">❌ خطا! ابتدا باید با nmap اسکن کنید!</span>');
            this.terminal.print(`<span style="color: #FFCE3D;">مراحل صحیح:</span>`);
            this.terminal.print(`<span class="success">1. nmap ${args[0]}</span>`);
            this.terminal.print(`<span class="success">2. nikto ${args[0]}</span> (اختیاری، برای شناسایی آسیب‌پذیری)`);
            this.terminal.print(`<span class="success">3. hydra ${args[0]}</span>`);
            this.applyPenalty();
            return;
        }


        this.terminal.print(`<span class="info">[*] Hydra v9.4 starting...</span>`);
        this.terminal.print(`<span class="info">[*] Target: ${args[0]}</span>`);
        this.terminal.print(`<span class="info">[*] Protocol: ssh</span>`);
        this.terminal.print(`<span class="info">[*] Brute force attack in progress...</span>`);

        setTimeout(() => {
            this.terminal.print('<span class="warning">[!] Attack failed - Strong password protection detected</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Consider purchasing stronger tools or dictionaries in the Store</span>');
        }, 3000);
    }

    cmdJohn(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">john: No hash file specified</span>');
            return;
        }

        this.terminal.print(`<span class="info">Loaded 1 password hash (MD5)</span>`);
        this.terminal.print(`<span class="info">Will run 4 OpenMP threads</span>`);
        this.terminal.print(`<span class="info">Proceeding with wordlist attack...</span>`);

        setTimeout(() => {
            this.terminal.print('<span class="success">[+] password123 (hash)</span>');
            this.terminal.print('<span class="success">1 password cracked, 0 left</span>');
        }, 2500);
    }

    cmdHashcat(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">hashcat: No hash specified</span>');
            return;
        }

        this.terminal.print(`
<span style="color: #2CF6F6;">hashcat (v6.2.6) starting...</span>

[*] Hash-Mode: 0 (MD5)
[*] Optimizers: enabled
[*] Wordlist: rockyou.txt

[*] GPU #1: NVIDIA RTX 4090, 24576 MB available
[*] Speed: 45.2 GH/s
        `);

        setTimeout(() => {
            this.terminal.print('<span class="success">[+] Hash cracked successfully</span>');
        }, 3000);
    }

    cmdAircrack(args) {
        this.terminal.print(`
<span style="color: #2CF6F6;">Aircrack-ng 1.7</span>

[*] Analyzing captured packets...
[*] Networks detected: 5
[*] WPA handshakes captured: 3
[*] Starting WPA-PSK cracking...

<span class="warning">[!] This process may take several hours</span>
<span style="color: #9EA5B3;">Consider purchasing GPU acceleration from the Store</span>
        `);
    }

    cmdWireshark() {
        this.terminal.print(`
<span style="color: #2CF6F6;">Wireshark 4.0.6 (Git commit 1a84c5a95)</span>

[*] Capturing on 'eth0'
[*] Packets captured: 1,337
[*] Protocols detected: TCP, UDP, HTTP, HTTPS, DNS

<span class="info">Packet Analysis:</span>
  HTTP Requests: 45
  HTTPS Sessions: 128
  DNS Queries: 89
  SSH Connections: 12

<span class="success">[+] Capture file saved to network.pcap</span>
        `);
    }

    cmdTcpdump(args) {
        this.terminal.print('<span class="info">tcpdump: listening on eth0, link-type EN10MB (Ethernet)</span>');

        const packets = [
            '12:34:56.123456 IP 192.168.1.100.443 > 192.168.1.50.52134: Flags [P.], seq 1:89, ack 1, win 502',
            '12:34:56.234567 IP 192.168.1.50.52134 > 192.168.1.100.443: Flags [.], ack 89, win 502',
            '12:34:57.345678 IP 10.0.0.15.80 > 192.168.1.50.48273: Flags [S.], seq 0, ack 1, win 65535'
        ];

        packets.forEach((pkt, i) => {
            setTimeout(() => this.terminal.print(pkt), i * 1000);
        });
    }

    cmdSqlmap(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">sqlmap: No target URL specified</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Usage: sqlmap [URL]</span>');
            this.applyPenalty();
            return;
        }

        if (!this.attackState.scanned || this.attackState.targetIP !== args[0]) {
            this.terminal.print('<span class="error">❌ خطا! ابتدا باید با nmap اسکن کنید!</span>');
            this.terminal.print(`<span style="color: #FFCE3D;">دستور صحیح: nmap ${args[0]}</span>`);
            this.applyPenalty();
            return;
        }

        this.terminal.print(`
<span style="color: #2CF6F6;">sqlmap/1.7.2 - automatic SQL injection tool</span>

[*] Starting scan on ${args[0]}
[*] Testing connection to target URL
[*] Checking for SQL injection vulnerabilities

[12:34:56] [INFO] testing 'MySQL >= 5.0 AND error-based'
[12:34:57] [INFO] testing 'PostgreSQL AND error-based'
        `);

        setTimeout(() => {
            const found = Math.random() > 0.5;
            if (found) {
                this.terminal.print('<span class="success">[+] SQL injection vulnerability found!</span>');
                this.terminal.print('<span class="success">[+] Database: mysql ver 5.7.33</span>');
                this.terminal.print('<span class="success">[+] Data dumped: user credentials, account balances</span>');
            } else {
                this.terminal.print('<span class="warning">[!] Target appears to be protected or no vulnerabilities found</span>');
            }
        }, 3000);
    }

    cmdNikto(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">nikto: No target specified</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Usage: nikto [IP_Address]</span>');
            this.applyPenalty();
            return;
        }

        if (!this.attackState.scanned || this.attackState.targetIP !== args[0]) {
            this.terminal.print('<span class="error">❌ خطا! ابتدا باید با nmap اسکن کنید!</span>');
            this.terminal.print(`<span style="color: #FFCE3D;">دستور صحیح: nmap ${args[0]}</span>`);
            this.applyPenalty();
            return;
        }

        this.terminal.print(`<span class="info">[*] Nikto v2.1.6 starting...</span>`);
        this.terminal.print(`<span class="info">[*] Target IP: ${args[0]}</span>`);
        this.terminal.print(`<span class="info">[*] Scanning for vulnerabilities...</span>`);

        setTimeout(() => {
            this.attackState.vulnerabilityChecked = true;
            this.terminal.print('<span class="success">[+] Server: Apache/2.4.41 (Ubuntu)</span>');
            this.terminal.print('<span class="warning">[!] Vulnerability: Outdated PHP version detected (CVE-2021-21703)</span>');
            this.terminal.print('<span class="warning">[!] Vulnerability: Directory listing enabled on /uploads/</span>');
            this.terminal.print('<span class="warning">[!] Vulnerability: SQL injection point found in /login.php</span>');
            this.terminal.print('<span class="warning">[!] Vulnerability: XSS vulnerability in /search.php</span>');
            this.terminal.print(`<span class="info">════════════════════════════════════════</span>`);
            this.terminal.print(`<span style="color: #2CF6F6;">✓ مرحله 2 تکمیل شد!</span>`);
            this.terminal.print(`<span style="color: #FFCE3D;">➜ دستورات پیشنهادی برای حمله نهایی:</span>`);
            this.terminal.print(`<span class="success">  • exploit ${args[0]}</span> - حمله اکسپلویت`);
            this.terminal.print(`<span class="success">  • sqlmap ${args[0]}</span> - حمله SQL Injection`);
            this.terminal.print(`<span class="success">  • hydra ${args[0]}</span> - حمله Brute Force`);
            this.terminal.print(`<span class="info">════════════════════════════════════════</span>`);
        }, 2500);
    }

    cmdBurp() {
        this.terminal.print(`
<span style="color: #2CF6F6;">Burp Suite Professional v2023.5.2</span>

[*] Proxy listening on 127.0.0.1:8080
[*] Intercept is ON
[*] Scanner modules loaded: 47
[*] Extensions loaded: 12

<span class="info">Ready to intercept web traffic</span>
<span class="warning">Configure your browser to use proxy: 127.0.0.1:8080</span>
        `);
    }

    cmdHistory() {
        this.terminal.commandHistory.forEach((cmd, i) => {
            this.terminal.print(`  ${i + 1}  ${cmd}`);
        });
    }

    cmdEcho(args) {
        this.terminal.print(args.join(' '));
    }

    async cmdScanTarget(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">[X] Usage: scan [target_ip]</span>');
            return;
        }

        const targetIp = args[0];
        this.terminal.print(`<span class="info">[*] Initiating deep scan on ${targetIp}...</span>`);
        this.terminal.print(`<span class="info">[*] Please wait...</span>`);

        await this.loadAllPlayers();
        const target = this.allPlayers.find(p => p.ip === targetIp);

        setTimeout(() => {
            if (!target) {
                this.terminal.print(`<span class="error">[X] Target ${targetIp} not found or offline</span>`);
                return;
            }

            const totalDefense = (target.security?.firewall || 0) +
                                (target.security?.encryption || 0) +
                                (target.security?.stealth || 0);

            this.terminal.print(`
<span class="success">╔════════════════════════════════════════════════════════════════╗</span>
<span class="success">║                    SCAN RESULTS                                ║</span>
<span class="success">╚════════════════════════════════════════════════════════════════╝</span>

<span class="info">Target IP:</span>        ${target.ip}
<span class="info">Hostname:</span>         ${target.username}
<span class="info">Rank:</span>             ${target.rank}
<span class="info">Security Level:</span>   ${target.securityLevel}

<span style="color: #2CF6F6;">BALANCE INFORMATION:</span>
  Bitcoin Wallet:  ₿${target.balance.toFixed(8)}

<span style="color: #2CF6F6;">SECURITY BREAKDOWN:</span>
  Firewall:        ${target.security?.firewall || 0}
  Encryption:      ${target.security?.encryption || 0}
  Stealth:         ${target.security?.stealth || 0}
  Total Defense:   ${totalDefense}

<span style="color: #2CF6F6;">OPEN PORTS:</span>
  22/tcp   open  ssh
  80/tcp   open  http
  443/tcp  open  https
  ${target.securityLevel > 30 ? '8443/tcp open  https-alt' : '3306/tcp open  mysql'}

<span style="color: #2CF6F6;">VULNERABILITIES:</span>
  ${target.securityLevel < 20 ? '<span class="success">[+] Weak firewall detected</span>' : '<span class="warning">[!] Strong firewall active</span>'}
  ${target.security?.encryption < 15 ? '<span class="success">[+] Poor encryption</span>' : '<span class="warning">[!] Advanced encryption</span>'}
  ${target.security?.stealth < 10 ? '<span class="success">[+] No stealth protection</span>' : '<span class="warning">[!] Stealth measures active</span>'}

<span class="info">════════════════════════════════════════════════════════════════</span>
<span style="color: #9EA5B3;">Use 'attack ${targetIp}' to initiate breach attempt</span>
            `);
        }, 2000);
    }

    async cmdAttackTarget(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">[X] Usage: attack [target_ip]</span>');
            return;
        }

        const targetIp = args[0];
        await this.loadAllPlayers();
        const target = this.allPlayers.find(p => p.ip === targetIp);

        if (!target) {
            this.terminal.print(`<span class="error">[X] Target ${targetIp} not found</span>`);
            return;
        }

        this.terminal.print(`<span class="info">[*] Initiating attack sequence on ${targetIp}...</span>`);
        this.terminal.print(`<span class="info">[*] Target: ${target.username}</span>`);

        await this.initiateAttack(target.username, target.ip);
    }

    cmdBalance() {
        this.terminal.print(`
<span class="info">════════════════════════════════════════</span>
<span style="color: #2CF6F6;">BITCOIN WALLET STATUS</span>
<span class="info">════════════════════════════════════════</span>

Available Balance:  <span style="color: #00FF76;">₿${this.gameState.balance.toFixed(8)}</span>
Locked Balance:     <span style="color: #FF9F1C;">₿${this.gameState.lockedBalance.toFixed(8)}</span>

Total Value:        <span style="color: #FFCE3D;">₿${(this.gameState.balance + this.gameState.lockedBalance).toFixed(8)}</span>

<span class="info">════════════════════════════════════════</span>
        `);
    }

    cmdStatus() {
        const totalSec = this.gameState.security.firewall + this.gameState.security.encryption + this.gameState.security.stealth;

        this.terminal.print(`
<span class="info">════════════════════════════════════════</span>
<span style="color: #2CF6F6;">SYSTEM STATUS</span>
<span class="info">════════════════════════════════════════</span>

User:               <span style="color: #00FF76;">${this.gameState.username}</span>
IP Address:         ${this.gameState.ip}
Rank:               ${this.gameState.rank}
Security Level:     ${this.gameState.securityLevel}

<span style="color: #2CF6F6;">Security Breakdown:</span>
  Firewall:         ${this.gameState.security.firewall}
  Encryption:       ${this.gameState.security.encryption}
  Stealth:          ${this.gameState.security.stealth}
  Total:            ${totalSec}

<span style="color: #2CF6F6;">Statistics:</span>
  Successful Attacks: ${this.gameState.stats.wins}
  Failed Attempts:  ${this.gameState.stats.losses}
  Total Stolen:     ₿${this.gameState.stats.totalStolen.toFixed(8)}

<span style="color: #2CF6F6;">Inventory:</span>
  Items Owned:      ${this.gameState.inventory.length}

<span class="info">════════════════════════════════════════</span>
        `);
    }

    renderStore(category) {
        const items = category === 'all'
            ? STORE_ITEMS
            : STORE_ITEMS.filter(item => item.category === category);

        const storeHTML = `
            <div class="tab-content">
                <h2 class="tab-title">Dark Web Market</h2>

                <div class="store-filters">
                    <button class="filter-btn ${category === 'all' ? 'active' : ''}" data-category="all">All</button>
                    <button class="filter-btn ${category === 'vpn' ? 'active' : ''}" data-category="vpn">VPN</button>
                    <button class="filter-btn ${category === 'hardware' ? 'active' : ''}" data-category="hardware">Hardware</button>
                    <button class="filter-btn ${category === 'software' ? 'active' : ''}" data-category="software">Software</button>
                    <button class="filter-btn ${category === 'scripts' ? 'active' : ''}" data-category="scripts">Scripts</button>
                    <button class="filter-btn ${category === 'stealth' ? 'active' : ''}" data-category="stealth">Stealth</button>
                    <button class="filter-btn ${category === 'security' ? 'active' : ''}" data-category="security">Security</button>
                    <button class="filter-btn ${category === 'cosmetics' ? 'active' : ''}" data-category="cosmetics">Cosmetics</button>
                    <button class="filter-btn ${category === 'backdoor' ? 'active' : ''}" data-category="backdoor" style="background: #FF5555; color: #E4E6EB;">🔓 بک‌دور</button>
                    <button class="filter-btn ${category === 'antibackdoor' ? 'active' : ''}" data-category="antibackdoor" style="background: #50FA7B; color: #0B0B0D;">🛡️ ضد بک‌دور</button>
                    <button class="filter-btn ${category === 'autoattack' ? 'active' : ''}" data-category="autoattack" style="background: #FFCE3D; color: #0B0B0D;">⚡ Auto Attack</button>
                </div>

                <div id="store-items-grid"></div>
            </div>
        `;

        document.getElementById('store-tab').innerHTML = storeHTML;

        const grid = document.getElementById('store-items-grid');
        grid.innerHTML = '';

        items.forEach(item => {
            const owned = this.gameState.purchasedItems.includes(item.id);
            const canAfford = this.gameState.balance >= item.price && !owned;

            const storeItem = new StoreItem(item, owned, canAfford, (id) => this.buyItem(id));
            const itemEl = document.createElement('div');
            itemEl.innerHTML = storeItem.render();
            const itemNode = itemEl.firstElementChild;
            grid.appendChild(itemNode);
            storeItem.attachEvents(itemNode);
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.renderStore(e.target.getAttribute('data-category'));
            });
        });
    }

    async buyItem(itemId) {
        const item = STORE_ITEMS.find(i => i.id === itemId);

        if (!item || this.gameState.balance < item.price || this.gameState.purchasedItems.includes(itemId)) {
            return;
        }

        this.gameState.balance -= item.price;
        this.gameState.purchasedItems.push(itemId);
        this.gameState.inventory.push(item);

        if (item.effect.defense) this.gameState.security.firewall += item.effect.defense;
        if (item.effect.encryption) this.gameState.security.encryption += item.effect.encryption;
        if (item.effect.stealth) this.gameState.security.stealth += item.effect.stealth;

        const isSecurityItem = item.category === 'security' || item.category === 'stealth' || item.category === 'vpn';
        if (isSecurityItem && this.gameState.lockedBalance > 0) {
            this.unlockBalance();
        }

        this.updateRank();
        await this.saveState();
        this.hud.update(this.gameState);

        NotificationUtils.show(`[+] ${item.name} purchased! -₿${item.price.toFixed(8)}`, 'success');

        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        this.renderStore(activeCategory);
    }

    unlockBalance() {
        if (this.gameState.lockedBalance > 0) {
            const totalSecurity = this.gameState.security.firewall + this.gameState.security.encryption + this.gameState.security.stealth;

            if (totalSecurity >= 20) {
                this.gameState.balance += this.gameState.lockedBalance;
                NotificationUtils.show(`[+] ₿${this.gameState.lockedBalance.toFixed(8)} unlocked!`, 'success');
                this.terminal.print(`<span class="success">[+] Security active! ₿${this.gameState.lockedBalance.toFixed(8)} transferred to available balance.</span>`);
                this.gameState.lockedBalance = 0;
                this.saveState();
                this.hud.update(this.gameState);
            }
        }
    }

    renderInventory() {
        const inventoryHTML = `
            <div class="tab-content">
                <h2 class="tab-title">Inventory (${this.gameState.inventory.length} items)</h2>
                <div id="inventory-grid"></div>
            </div>
        `;

        document.getElementById('inventory-tab').innerHTML = inventoryHTML;
        const grid = document.getElementById('inventory-grid');

        if (this.gameState.inventory.length === 0) {
            grid.innerHTML = '<div class="inventory-empty">Your inventory is empty. Visit the store to purchase items.</div>';
        } else {
            grid.innerHTML = this.gameState.inventory.map(item => {
                const storeItem = new StoreItem(item, true, false, null);
                return storeItem.render().replace('data-item-id', 'class="inventory-item" data-item-id');
            }).join('');
        }
    }

    renderProfile() {
        const winRate = this.gameState.stats.wins + this.gameState.stats.losses > 0
            ? ((this.gameState.stats.wins / (this.gameState.stats.wins + this.gameState.stats.losses)) * 100).toFixed(1)
            : 0;

        const profileHTML = `
            <div class="tab-content">
                <h2 class="tab-title">User Profile</h2>
                <div class="profile-section">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <div class="avatar-icon">[USER]</div>
                        </div>
                        <div class="profile-info">
                            <div class="info-row">
                                <span class="info-label">Username:</span>
                                <span>${this.gameState.username}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">IP Address:</span>
                                <span>${this.gameState.ip}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Rank:</span>
                                <span>${this.gameState.rank}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Security Level:</span>
                                <span>${this.gameState.securityLevel}</span>
                            </div>
                        </div>
                    </div>

                    <div class="profile-stats">
                        <h3>Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Successful Attacks:</span>
                                <span>${this.gameState.stats.wins}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Failed Attacks:</span>
                                <span>${this.gameState.stats.losses}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Success Rate:</span>
                                <span>${winRate}%</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total Earned:</span>
                                <span>₿${this.gameState.stats.totalEarned.toFixed(8)}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Total Stolen:</span>
                                <span>₿${this.gameState.stats.totalStolen.toFixed(8)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="profile-achievements">
                        <h3>Achievements</h3>
                        <div id="achievements-grid">
                            ${this.gameState.achievements.map(ach => `
                                <div class="achievement ${ach.unlocked ? 'unlocked' : ''}">
                                    <div class="achievement-icon">${ach.icon}</div>
                                    <div class="achievement-name">${ach.name}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('profile-tab').innerHTML = profileHTML;
    }

    renderExplorer() {
        const explorerHTML = `
            <div class="tab-content">
                <h2 class="tab-title">Network Explorer</h2>
                <div class="explorer-controls">
                    <button class="action-btn" data-action="scan">Scan Network</button>
                    <button class="action-btn" data-action="refresh">Refresh</button>
                </div>
                <div id="explorer-list" class="explorer-list">
                    <div class="inventory-empty">No players discovered. Click "Scan Network" to begin.</div>
                </div>
            </div>
        `;

        document.getElementById('explorer-tab').innerHTML = explorerHTML;

        document.querySelector('[data-action="scan"]').addEventListener('click', () => this.scanNetwork());
        document.querySelector('[data-action="refresh"]').addEventListener('click', () => this.refreshPlayerList());
    }

    async scanNetwork() {
        this.terminal.print('<span class="info">[*] Scanning network...</span>');

        await this.loadAllPlayers();

        const discovered = Math.min(5, this.allPlayers.length);
        this.discoveredPlayers = this.allPlayers.sort(() => 0.5 - Math.random()).slice(0, discovered);

        setTimeout(() => {
            this.terminal.print(`<span class="success">[+] ${this.discoveredPlayers.length} players discovered!</span>`);
            this.refreshPlayerList();
        }, 1500);
    }

    async loadAllPlayers() {
        this.allPlayers = [...NPC_ACCOUNTS];

        const playersList = await this.kvService.get('players_list') || [];

        for (const username of playersList) {
            if (username !== this.gameState.username) {
                const userData = await this.kvService.get(`user_${username}`);
                if (userData) {
                    this.allPlayers.push({
                        username: userData.username,
                        ip: userData.ip,
                        securityLevel: userData.securityLevel || 0,
                        balance: userData.balance,
                        security: userData.security
                    });
                }
            }
        }
    }

    refreshPlayerList() {
        const container = document.getElementById('explorer-list');

        if (this.discoveredPlayers.length === 0) {
            container.innerHTML = '<div class="inventory-empty">No players discovered. Click "Scan Network".</div>';
            return;
        }

        container.innerHTML = this.discoveredPlayers.map(player => `
            <div class="player-card">
                <div class="player-ip">IP: ${player.ip}</div>
                <div class="player-info">
                    Username: ${player.username}<br>
                    Security Level: ${player.securityLevel}<br>
                    Balance: ₿${player.balance.toFixed(8)}
                </div>
                <div class="player-actions">
                    <button class="copy-ip-btn" data-ip="${player.ip}">Copy IP</button>
                    <button class="attack-btn" data-target="${player.username}">Attack</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.copy-ip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ip = e.target.getAttribute('data-ip');
                navigator.clipboard.writeText(ip).then(() => {
                    NotificationUtils.show(`[+] IP ${ip} copied!`, 'success');
                }).catch(() => {
                    NotificationUtils.show('[X] Failed to copy IP', 'error');
                });
            });
        });

        document.querySelectorAll('.attack-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                const player = this.discoveredPlayers.find(p => p.username === target);
                if (player) {
                    this.initiateAttack(player.username, player.ip);
                }
            });
        });
    }

    async initiateAttack(targetUsername, targetIP) {
        const npcTarget = NPC_ACCOUNTS.find(npc => npc.username === targetUsername);
        let target = null;
        let isNPC = false;

        if (npcTarget) {
            target = npcTarget;
            isNPC = true;
        } else {
            target = await this.kvService.get(`user_${targetUsername}`);
            if (!target) {
                NotificationUtils.show('[X] Target not found', 'error');
                return;
            }
        }

        const myPower = this.calculateAttackPower();
        const targetDefense = target.securityLevel + (target.security?.firewall || 0);

        const successChance = Math.max(10, Math.min(90, 50 + (myPower - targetDefense) * 2));
        const success = Math.random() * 100 < successChance;

        if (success) {
            const stolen = target.balance * (0.05 + Math.random() * 0.15);

            this.gameState.lockedBalance += stolen;
            this.gameState.stats.wins++;
            this.gameState.stats.totalStolen += stolen;

            if (!isNPC) {
                target.balance = Math.max(0, target.balance - stolen);
                await this.kvService.put(`user_${targetUsername}`, target);
            }

            this.terminal.print(`<span class="success">╔═══════════════════════════════════════╗</span>`);
            this.terminal.print(`<span class="success">║    [+] Attack Successful!             ║</span>`);
            this.terminal.print(`<span class="success">╚═══════════════════════════════════════╝</span>`);
            this.terminal.print(`<span class="success">Stolen: ₿${stolen.toFixed(8)} BTC (LOCKED)</span>`);
            this.terminal.print(`<span class="warning">[!] Balance locked! Buy security items to unlock.</span>`);

            NotificationUtils.show(`[+] Stole ₿${stolen.toFixed(8)}! (Locked)`, 'success');
        } else {
            const penalty = this.gameState.balance * 0.1;
            this.gameState.balance -= penalty;
            this.gameState.stats.losses++;
            this.gameState.securityLevel = Math.max(0, this.gameState.securityLevel - 5);

            this.triggerGlitch();

            this.terminal.print(`<span class="error">╔═══════════════════════════════════════╗</span>`);
            this.terminal.print(`<span class="error">║    [X] Attack Failed!                 ║</span>`);
            this.terminal.print(`<span class="error">║    You were detected!                 ║</span>`);
            this.terminal.print(`<span class="error">╚═══════════════════════════════════════╝</span>`);
            this.terminal.print(`<span class="error">Penalty: -₿${penalty.toFixed(8)}</span>`);

            NotificationUtils.show('[X] Attack failed!', 'error');
        }

        this.updateRank();
        await this.saveState();
        this.hud.update(this.gameState);
    }

    calculateAttackPower() {
        let power = 50; // Base power

        this.gameState.inventory.forEach(item => {
            if (item.effect) {
                power += item.effect.attackPower || 0;
                power += item.effect.hackSuccess || 0;
            }
        });

        return power;
    }

    triggerGlitch() {
        const overlay = document.getElementById('glitch-overlay');
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 300);
    }

    updateRank() {
        const wins = this.gameState.stats.wins;

        if (wins >= 50) this.gameState.rank = 'اسطوره';
        else if (wins >= 30) this.gameState.rank = 'نخبه';
        else if (wins >= 15) this.gameState.rank = 'متخصص';
        else if (wins >= 5) this.gameState.rank = 'متوسط';
        else this.gameState.rank = 'مبتدی';

        const totalDefense = this.gameState.security.firewall + this.gameState.security.encryption + this.gameState.security.stealth;
        this.gameState.securityLevel = totalDefense;
    }

    async saveState() {
        await this.kvService.put(`user_${this.gameState.username}`, this.gameState);
    }

    renderGuide() {
        const guideHTML = `
            <div class="tab-content">
                <h2 class="tab-title">راهنمای بازی</h2>
                <iframe src="/guide.html" style="width: 100%; height: 600px; border: none;"></iframe>
            </div>
        `;
        document.getElementById('guide-tab').innerHTML = guideHTML;
    }

    cmdUseItem(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">[X] Usage: use [item_name]</span>');
            return;
        }

        const itemName = args.join(' ');
        const item = this.gameState.inventory.find(i => i.name.toLowerCase() === itemName);

        if (!item) {
            this.terminal.print(`<span class="error">[X] Item "${itemName}" not found in inventory.</span>`);
            return;
        }

        // Remove item from inventory after use (assuming single-use items for simplicity)
        this.gameState.inventory = this.gameState.inventory.filter(i => i.id !== item.id);

        // Apply item effect
        if (item.effect.attackPower) {
            // This might be a passive buff or a one-time boost
            this.terminal.print(`<span class="success">[+] Item "${item.name}" used. Attack power increased temporarily.</span>`);
            // Implement temporary boost logic if needed
        } else if (item.effect.hackSuccess) {
            this.terminal.print(`<span class="success">[+] Item "${item.name}" used. Increased chance of hack success.</span>`);
            // Implement temporary boost logic if needed
        } else if (item.effect.defense) {
            this.terminal.print(`<span class="success">[+] Item "${item.name}" used. Increased defense.</span>`);
            this.gameState.security.firewall += item.effect.defense;
            this.gameState.security.encryption += item.effect.encryption || 0;
            this.gameState.security.stealth += item.effect.stealth || 0;
            this.updateRank();
            this.hud.update(this.gameState);
        } else {
            this.terminal.print(`<span class="warning">[!] Item "${item.name}" has no immediate effect or its effect is not implemented.</span>`);
        }

        NotificationUtils.show(`Used "${item.name}"`, 'info');
        this.saveState();
    }

    cmdAutoAttack(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">[X] Usage: autoattack [target_ip]</span>');
            return;
        }

        const targetIp = args[0];
        const autoAttackItems = this.gameState.inventory.filter(item => item.category === 'autoattack');

        if (autoAttackItems.length === 0) {
            this.terminal.print('<span class="error">[X] You have no Auto Attack items. Purchase one from the Store.</span>');
            return;
        }

        // Simple logic: use the best available auto-attack item
        const bestItem = autoAttackItems.sort((a, b) => (b.level || 0) - (a.level || 0))[0];

        this.terminal.print(`<span class="info">[*] Initiating Auto Attack using "${bestItem.name}" on ${targetIp}...</span>`);

        // Simulate attack sequence (simplified)
        setTimeout(async () => {
            await this.loadAllPlayers();
            const target = this.allPlayers.find(p => p.ip === targetIp);

            if (!target) {
                this.terminal.print(`<span class="error">[X] Target ${targetIp} not found or offline</span>`);
                return;
            }

            const attackPower = (bestItem.effect.attackPower || 0) + (bestItem.effect.hackSuccess || 0) * 10; // Simplified power calculation
            const defensePower = target.securityLevel || 50;
            const successChance = Math.max(0.2, Math.min(0.9, attackPower / (attackPower + defensePower)));
            const success = Math.random() < successChance;

            if (success) {
                const stolen = target.balance * (0.1 + Math.random() * 0.2); // Higher steal rate for auto-attack
                this.gameState.lockedBalance += stolen;
                this.gameState.stats.wins++;
                this.gameState.stats.totalStolen += stolen;

                this.terminal.print('<span class="success">╔═══════════════════════════════════════╗</span>');
                this.terminal.print('<span class="success">║    [+] Auto Attack Successful!        ║</span>');
                this.terminal.print('<span class="success">╚═══════════════════════════════════════╝</span>');
                this.terminal.print(`<span class="success">Stolen: ₿${stolen.toFixed(8)} BTC (LOCKED)</span>`);
                this.terminal.print(`<span class="warning">[!] Balance locked! Buy security items to unlock.</span>`);

                NotificationUtils.show(`[+] Auto Attack Stole ₿${stolen.toFixed(8)}! (Locked)`, 'success');
            } else {
                const penalty = this.gameState.balance * 0.15; // Higher penalty for failed auto-attack
                this.gameState.balance -= penalty;
                this.gameState.stats.losses++;
                this.gameState.securityLevel = Math.max(0, this.gameState.securityLevel - 10);

                this.triggerGlitch();

                this.terminal.print('<span class="error">╔═══════════════════════════════════════╗</span>');
                this.terminal.print('<span class="error">║    [X] Auto Attack Failed!            ║</span>');
                this.terminal.print('<span class="error">║    Target detected and repelled attack! ║</span>');
                this.terminal.print('<span class="error">╚═══════════════════════════════════════╝</span>');
                this.terminal.print(`<span class="error">Penalty: -₿${penalty.toFixed(8)}</span>`);

                NotificationUtils.show('[X] Auto Attack failed!', 'error');
            }

            // Consume the item after use
            this.gameState.inventory = this.gameState.inventory.filter(i => i.id !== bestItem.id);

            this.updateRank();
            await this.saveState();
            this.hud.update(this.gameState);
        }, 5000); // Longer delay for auto-attack simulation
    }

    resetAttackState() {
        this.attackState = {
            scanned: false,
            vulnerabilityChecked: false,
            targetIP: null,
            mistakes: 0
        };
    }
}