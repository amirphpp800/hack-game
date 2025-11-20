
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
            </div>

            <div id="terminal-tab" class="game-tab active"></div>
            <div id="explorer-tab" class="game-tab"></div>
            <div id="profile-tab" class="game-tab"></div>
            <div id="store-tab" class="game-tab"></div>
            <div id="inventory-tab" class="game-tab"></div>
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
        }
    }

    processCommand(cmd) {
        const parts = cmd.trim().split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        const commands = {
            'help': () => this.showHelp(),
            'man': () => this.showHelp(),
            'ls': () => this.cmdLs(args),
            'cat': () => this.cmdCat(args),
            'pwd': () => this.cmdPwd(),
            'whoami': () => this.cmdWhoami(),
            'ifconfig': () => this.cmdIfconfig(),
            'ip': () => this.cmdIp(args),
            'netstat': () => this.cmdNetstat(),
            'ps': () => this.cmdPs(),
            'top': () => this.cmdTop(),
            'uname': () => this.cmdUname(args),
            'hostname': () => this.cmdHostname(),
            'date': () => this.cmdDate(),
            'uptime': () => this.cmdUptime(),
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
            'clear': () => this.terminal.clear(),
            'cls': () => this.terminal.clear(),
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
            'shutdown': () => this.terminal.print('<span class="warning">[!] System shutdown disabled in simulation</span>')
        };
        
        if (commands[command]) {
            commands[command]();
        } else {
            this.terminal.print(`<span class="error">[X] bash: ${command}: command not found</span>`);
            this.terminal.print(`<span style="color: #9EA5B3;">Type 'help' to see available commands</span>`);
        }
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

<span class="info">════════════════════════════════════════════════════════════════</span>
        `.trim();
        this.terminal.print(helpText);
    }

    cmdLs(args) {
        const files = [
            'Desktop', 'Documents', 'Downloads', 'exploits', 'scripts',
            'tools', 'configs', '.ssh', '.gnupg', 'targets.txt',
            'passwords.db', 'network.log', 'README.md'
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
            'network.log': '<span class="success">[+] Network initialized\n[*] Scanning subnet 192.168.1.0/24\n[+] 5 hosts discovered\n[!] Firewall detected on 192.168.1.1</span>'
        };
        
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
            this.terminal.print('<span style="color: #9EA5B3;">Usage: nmap [target_ip]</span>');
            return;
        }
        
        this.terminal.print(`<span class="info">[*] Starting Nmap scan on ${args[0]}...</span>`);
        
        setTimeout(() => {
            this.terminal.print(`
<span style="color: #2CF6F6;">Nmap scan report for ${args[0]}</span>
Host is up (0.042s latency).
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
8080/tcp open  http-proxy

<span class="success">[+] Scan complete. 5 open ports detected.</span>
            `);
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
            this.terminal.print('<span style="color: #9EA5B3;">Usage: exploit [target_ip]</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Or use "explorer" tab to select targets visually</span>');
            return;
        }
        
        this.terminal.print(`<span class="info">[*] Initializing exploit framework...</span>`);
        this.terminal.print(`<span class="info">[*] Target: ${args[0]}</span>`);
        this.terminal.print(`<span class="info">[*] Loading exploits...</span>`);
        
        setTimeout(() => {
            this.terminal.print('<span class="warning">[!] Use the Explorer tab for full attack capabilities</span>');
        }, 2000);
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
            return;
        }
        
        this.terminal.print(`<span class="info">[*] Hydra v9.4 starting...</span>`);
        this.terminal.print(`<span class="info">[*] Target: ${args[0]}</span>`);
        this.terminal.print(`<span class="info">[*] Protocol: ssh</span>`);
        this.terminal.print(`<span class="info">[*] Brute force attack in progress...</span>`);
        
        setTimeout(() => {
            this.terminal.print('<span class="warning">[!] Attack failed - Strong password protection detected</span>');
            this.terminal.print('<span style="color: #9EA5B3;">Consider upgrading your tools in the Store</span>');
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
            } else {
                this.terminal.print('<span class="warning">[!] Target appears to be protected</span>');
            }
        }, 3000);
    }

    cmdNikto(args) {
        if (!args[0]) {
            this.terminal.print('<span class="error">nikto: No host specified</span>');
            return;
        }
        
        this.terminal.print(`
<span style="color: #2CF6F6;">- Nikto v2.5.0</span>
---------------------------------------------------------------------------
+ Target IP:          ${args[0]}
+ Target Hostname:    ${args[0]}
+ Target Port:        80
+ Start Time:         ${new Date().toTimeString()}
---------------------------------------------------------------------------
+ Server: Apache/2.4.41 (Ubuntu)
+ Retrieved x-powered-by header: PHP/7.4.3
+ The anti-clickjacking X-Frame-Options header is not present
+ Cookie PHPSESSID created without the httponly flag
        `);
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
  Successful Hacks: ${this.gameState.stats.wins}
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
        let power = 0;
        this.gameState.inventory.forEach(item => {
            if (item.effect.attackPower) power += item.effect.attackPower;
            if (item.effect.hackSuccess) power += item.effect.hackSuccess / 2;
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
}
