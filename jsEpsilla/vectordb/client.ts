import axios from 'axios';

class Client {
    private protocol: string;
    private host: string;
    private port: string;
    private baseurl: string;
    private db: string | null;
    private timeout: number;
    private header: object;

    constructor(protocol = 'http', host='localhost', port='8888') {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
        this.db = null;
        this.timeout = 10;
        this.header = {'Content-type': 'application/json'};
        this.check_networking();
    }

    private async check_networking() {
        try {
            await axios.get(`${this.protocol}://${this.host}:${this.port}`);
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
        } catch (error) {
            throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
        }
    }

    public async welcome() {
        const res = await axios.get(`${this.baseurl}/`, {headers: this.header, timeout: this.timeout});
        return res.status, res.data;
    }

    // Implement the rest of the methods in a similar way
}