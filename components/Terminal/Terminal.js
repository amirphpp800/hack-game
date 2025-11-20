
export class Terminal {
    constructor(onCommand) {
        this.onCommand = onCommand;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~';
    }

    render() {
        return `
            <div id="terminal-container">
                <div id="terminal-header">
                    <span class="terminal-title">CYBER BREACH SHELL v3.2.1 - bash</span>
                    <div class="terminal-controls">
                        <span class="control-btn minimize"></span>
                        <span class="control-btn maximize"></span>
                        <span class="control-btn close"></span>
                    </div>
                </div>
                
                <div id="terminal-output"></div>
                
                <div id="terminal-input-line">
                    <span id="terminal-prompt">root@cyberspace:~#</span>
                    <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" autofocus>
                    <span id="terminal-cursor">_</span>
                </div>
            </div>
        `;
    }

    print(text) {
        const output = document.getElementById('terminal-output');
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    clear() {
        document.getElementById('terminal-output').innerHTML = '';
    }

    printWelcome(username, ip) {
        const welcome = `
<span class="success">╔════════════════════════════════════════════════════════════════╗</span>
<span class="success">║                                                                ║</span>
<span class="success">║        CYBER BREACH SHELL v3.2.1 - Network Simulator           ║</span>
<span class="success">║        Debian GNU/Linux 12 (bookworm) - Kernel 6.1.0           ║</span>
<span class="success">║                                                                ║</span>
<span class="success">╚════════════════════════════════════════════════════════════════╝</span>

<span class="info">Last login: ${new Date().toUTCString()}</span>
<span class="info">User: ${username} | IP: ${ip}</span>
<span class="warning">[!] WARNING: This is a fictional network simulator</span>
<span class="warning">[!] No real hacking activities occur in this environment</span>

<span style="color: #2CF6F6;">Type 'help' or 'man' to view available commands</span>
<span style="color: #9EA5B3;">Type 'ls' to list files, 'ifconfig' to view network info</span>

<span class="info">════════════════════════════════════════════════════════════════</span>
        `.trim();
        
        this.print(welcome);
    }

    attachEvents() {
        const input = document.getElementById('terminal-input');
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = e.target.value.trim();
                e.target.value = '';
                
                if (cmd) {
                    this.commandHistory.push(cmd);
                    this.historyIndex = this.commandHistory.length;
                    this.print(`<span style="color: #2CF6F6;">root@cyberspace:${this.currentPath}#</span> ${cmd}`);
                    this.onCommand(cmd);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    e.target.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    e.target.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    e.target.value = '';
                }
            }
        });
    }
}
