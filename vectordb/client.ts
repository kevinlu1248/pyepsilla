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
        try {
            const response = await fetch(this.baseurl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation: ', error);
        }
    }

    public async welcome() {
        const req_url = `${this.baseurl}/`;
        const res = await fetch(req_url, { method: 'GET', headers: this.header });
        const status_code = res.status;
        const body = await res.text();
        return { status_code, body };
    }

    public async state() {
        const req_url = `${this.baseurl}/state`;
        const res = await fetch(req_url, { method: 'GET', headers: this.header });
        const status_code = res.status;
        const body = await res.json();
        return { status_code, body };
    }
    
    // Implement other methods as needed...
}
export default Client;