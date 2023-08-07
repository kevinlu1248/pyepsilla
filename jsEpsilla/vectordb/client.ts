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
            await axios.get(this.baseurl);
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
        } catch (error) {
            throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
        }
    }

    async load_db(db_name: string, db_path: string) {
        const res = await axios.post(`${this.baseurl}/api/load`, { name: db_name, path: db_path }, { headers: this.headers });
        return res.data;
    }

    use_db(db_name: string) {
        this.db = db_name;
    }

    async create_table(table_name: string, table_fields: any[]) {
        const res = await axios.post(`${this.baseurl}/api/${this.db}/schema/tables`, { name: table_name, fields: table_fields }, { headers: this.headers });
        return res.data;
    }

    async insert(table_name: string, records: any[]) {
        const res = await axios.post(`${this.baseurl}/api/${this.db}/data/insert`, { table: table_name, data: records }, { headers: this.headers });
        return res.data;
    }

    async query(table_name: string, query_field: string, query_vector: number[], limit: number, with_distance: boolean) {
        const res = await axios.post(`${this.baseurl}/api/${this.db}/data/query`, { table: table_name, queryField: query_field, queryVector: query_vector, limit: limit, withDistance: with_distance }, { headers: this.headers });
        return res.data;
    }

    async drop_table(table_name: string) {
        const res = await axios.delete(`${this.baseurl}/api/${this.db}/schema/tables/${table_name}`, { headers: this.headers });
        return res.data;
    }

    async unload_db() {
        const res = await axios.post(`${this.baseurl}/api/${this.db}/unload`, null, { headers: this.headers });
        return res.data;
    }
}
export default Client;