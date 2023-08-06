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
        this.timeout = 10000;  // Timeout in milliseconds
        this.header = {'Content-type': 'application/json'};
    }

    public async check_networking() {
        try {
            const response = await axios.get(this.baseurl);
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
        } catch (error) {
            throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
        }
    }

    public async welcome() {
        try {
            const response = await axios.get(`${this.baseurl}/`, {headers: this.header, timeout: this.timeout});
            return response.status, response.data;
        } catch (error) {
            console.error(`[ERROR] Failed to send GET request to ${this.baseurl}/: ${error}`);
        }
    }

    // Implement the rest of the methods here, following the same pattern as the welcome method.
}
