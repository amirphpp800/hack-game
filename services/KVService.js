export class KVService {
    constructor() {
        this.useLocalStorage = true;
        this.baseUrl = '';
    }

    async init() {
        try {
            const response = await fetch('/api/kv/config');
            if (response.ok) {
                const config = await response.json();
                this.kvNamespace = config.kvNamespace;
                this.useKV = true;
                console.log('[✓] Connected to Cloudflare KV');
            } else {
                console.warn('⚠️ Using localStorage (local development mode)');
                this.useKV = false;
            }
        } catch (error) {
            console.warn('⚠️ Using localStorage (local development mode)');
            this.useKV = false;
        }
    }

    async get(key) {
        if (this.useLocalStorage) {
            const data = localStorage.getItem(`kv_${key}`);
            return data ? JSON.parse(data) : null;
        }

        let retries = 3;
        while (retries > 0) {
            try {
                const response = await fetch(`${this.baseUrl}?op=get&key=${encodeURIComponent(key)}`, {
                    signal: AbortSignal.timeout(5000)
                });

                if (response.ok) {
                    const result = await response.json();
                    return result;
                }
                if (response.status === 429) {
                    await this.delay(1000 * (4 - retries));
                    retries--;
                    continue;
                }
                return null;
            } catch (e) {
                if (retries === 1) {
                    console.error('Error reading from KV:', e);
                    return null;
                }
                await this.delay(500);
                retries--;
            }
        }
        return null;
    }

    async put(key, value) {
        if (this.useLocalStorage) {
            localStorage.setItem(`kv_${key}`, JSON.stringify(value));
            return true;
        }

        let retries = 3;
        while (retries > 0) {
            try {
                const response = await fetch(`${this.baseUrl}?op=put&key=${encodeURIComponent(key)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value),
                    signal: AbortSignal.timeout(5000)
                });

                if (response.ok) return true;

                if (response.status === 429) {
                    await this.delay(1000 * (4 - retries));
                    retries--;
                    continue;
                }
                return false;
            } catch (e) {
                if (retries === 1) {
                    console.error('Error writing to KV:', e);
                    return false;
                }
                await this.delay(500);
                retries--;
            }
        }
        return false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async delete(key) {
        if (this.useLocalStorage) {
            localStorage.removeItem(`kv_${key}`);
            return true;
        }

        try {
            const response = await fetch(`${this.baseUrl}?op=delete&key=${encodeURIComponent(key)}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (e) {
            console.error('Error deleting from KV:', e);
            return false;
        }
    }

    async list(prefix = '') {
        if (this.useLocalStorage) {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('kv_' + prefix)) {
                    keys.push(key.replace('kv_', ''));
                }
            }
            return keys;
        }

        try {
            const response = await fetch(`${this.baseUrl}?op=list&prefix=${encodeURIComponent(prefix)}`);

            if (response.ok) {
                const keys = await response.json();
                return keys;
            }
            return [];
        } catch (e) {
            console.error('Error listing KV:', e);
            return [];
        }
    }
}