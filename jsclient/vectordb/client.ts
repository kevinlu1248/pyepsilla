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
            const response = await fetch(`${this.baseurl}/`, { method: 'GET', headers: this.header });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
        } catch (error) {
            console.error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
            throw error;
        }
    }

    async welcome() {
        const response = await fetch(`${this.baseurl}/`, { method: 'GET', headers: this.header });
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        const body = await response.text();
        return response.status, body;
    }

    // Rest of the methods go here, following the same pattern
}
export default Client;