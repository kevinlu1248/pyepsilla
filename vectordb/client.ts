import axios from 'axios';

class Client {
    private protocol: string;
    private host: string;
    private port: string;
    private baseurl: string;
    // Removed unused property
    // timeout is in milliseconds
    private timeout: number = 1000;
    private header: object;

    constructor(protocol = 'http', host='localhost', port='8888') {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
        this.timeout = 1000;
        this.header = {'Content-type': 'application/json'};
    }

    private async check_networking() {
        try {
            const response = await axios.get(this.baseurl);
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
        } catch (error) {
            throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
        }
    }

    public async welcome() {
        const response = await axios.get(`${this.baseurl}/`, {headers: this.header, timeout: this.timeout});
        return {status: response.status, data: response.data};
    }

    // Implement the rest of the methods here, following the same pattern as the welcome method.
    // For example:
    // public async someMethod() {
    //     const response = await axios.get(`${this.baseurl}/someEndpoint`, {headers: this.header, timeout: this.timeout});
    //     return {status: response.status, data: response.data};
    // }
}