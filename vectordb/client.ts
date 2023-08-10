import fetch from 'node-fetch';
import net from 'net';

class Client {
    private protocol: string;
    private host: string;
    private port: string;
    private baseurl: string;
    private db: string | null;
    private timeout: number;
    private header: { 'Content-type': string };

    constructor(protocol = 'http', host = 'localhost', port = '8888') {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
        this.db = null;
        this.timeout = 10;
        this.header = { 'Content-type': 'application/json' };
        this.check_networking();
    }

    private check_networking() {
        const client = new net.Socket();
        client.connect(this.port, this.host, () => {
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
            client.destroy();
        });
        client.on('error', (err) => {
            throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
        });
    }

    async welcome() {
        const req_url = `${this.baseurl}/`;
        const res = await fetch(req_url, { method: 'GET', headers: this.header });
        const status_code = res.status;
        const body = await res.text();
        return [status_code, body];
    }

    async state() {
        const req_url = `${this.baseurl}/state`;
        const res = await fetch(req_url, { method: 'GET', headers: this.header });
        const status_code = res.status;
        const body = await res.json();
        return [status_code, body];
    }

    // Translate the rest of the methods from Python to TypeScript
}
