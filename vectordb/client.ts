import fetch from 'node-fetch';

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

    private async check_networking() {
        // Implement network check
    }

    public async welcome() {
        const req_url = `${this.baseurl}/`;
        const res = await fetch(req_url, { method: 'GET', headers: this.header });
        const status_code = res.status;
        const body = await res.text();
        return { status_code, body };
    }

    // Implement remaining methods...
}
export default Client;