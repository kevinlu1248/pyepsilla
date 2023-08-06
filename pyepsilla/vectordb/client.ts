import axios from 'axios';

class Client {
    private protocol: string;
    private host: string;
    private port: string;
    private baseurl: string;
    private db: string | null;
    private timeout: number;
    private headers: object;

    constructor(protocol = 'http', host = 'localhost', port = '8888') {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
        this.db = null;
        this.timeout = 10;
        this.headers = {'Content-type': 'application/json'};
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
        const res = await axios.get(`${this.baseurl}/`, {headers: this.headers, timeout: this.timeout});
        return [res.status, res.data];
    }

    public async state() {
        const res = await axios.get(`${this.baseurl}/state`, {headers: this.headers});
        return [res.status, res.data];
    }

    public use_db(db_name: string) {
        this.db = db_name;
    }

    public async load_db(db_name: string, db_path: string, vector_scale?: number, wal_enabled?: boolean) {
        const data = {name: db_name, path: db_path};
        if (vector_scale) data['vectorScale'] = vector_scale;
        if (wal_enabled) data['walEnabled'] = wal_enabled;
        const res = await axios.post(`${this.baseurl}/api/load`, data, {headers: this.headers});
        return [res.status, res.data];
    }

    // Rest of the methods...
}