import axios from 'axios';

class Client {
    private _protocol: string;
    private _host: string;
    private _port: string;
    private _baseurl: string;
    private _db: string | null;
    private _timeout: number;
    private _header: object;

    constructor(protocol = 'http', host='localhost', port='8888') {
        this._protocol = protocol;
        this._host = host;
        this._port = port;
        this._baseurl = `${this._protocol}://${this._host}:${this._port}`;
        this._db = null;
        this._timeout = 10;
        this._header = {'Content-type': 'application/json'};
        this.check_networking();
    }

    async check_networking() {
        try {
            await axios.get(`${this._baseurl}/`, {timeout: this._timeout});
            console.log(`[INFO] Connected to ${this._host}:${this._port} successfully.`);
        } catch (error) {
            throw new Error(`[ERROR] Failed to connect to ${this._host}:${this._port}`);
        }
    }

    // Rest of the methods go here
}
export default Client;