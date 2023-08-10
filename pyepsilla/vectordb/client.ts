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
        this.checkNetworking();
    }

    private async checkNetworking() {
        try {
            await axios.get(this.baseurl);
            console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
        } catch (error) {
            throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
        }
    }

    public async welcome() {
        const response = await axios.get(`${this.baseurl}/`);
        return response.status, response.data;
    }

    public async state() {
        const response = await axios.get(`${this.baseurl}/state`);
        return response.status, response.data;
    }

    public useDb(dbName: string) {
        this.db = dbName;
    }

    public async loadDb(dbName: string, dbPath: string, vectorScale?: number, walEnabled?: boolean) {
        const data = {name: dbName, path: dbPath};
        if (vectorScale) data['vectorScale'] = vectorScale;
        if (walEnabled) data['walEnabled'] = walEnabled;
        const response = await axios.post(`${this.baseurl}/api/load`, data);
        return response.status, response.data;
    }

    public async unloadDb(dbName: string) {
        const response = await axios.post(`${this.baseurl}/api/${dbName}/unload`);
        return response.status, response.data;
    }

    public async createTable(tableName: string = "MyTable", tableFields: Array<object> = []) {
        const data = {name: tableName, fields: tableFields};
        const response = await axios.post(`${this.baseurl}/api/${this.db}/schema/tables`, data);
        return response.status, response.data;
    }

    public async insert(tableName: string = "MyTable", records: Array<object> = []) {
        const data = {table: tableName, data: records};
        const response = await axios.post(`${this.baseurl}/api/${this.db}/data/insert`, data);
        return response.status, response.data;
    }

    public async query(tableName: string = "MyTable", queryField: string = "", queryVector: Array<number> = [], responseFields: Array<string> = [], limit: number = 1, withDistance: boolean = false) {
        const data = {table: tableName, queryField: queryField, queryVector: queryVector, response: responseFields, limit: limit, withDistance: withDistance};
        const response = await axios.post(`${this.baseurl}/api/${this.db}/data/query`, data);
        return response.status, response.data;
    }

    public async get(tableName: string = "MyTable", responseFields: Array<string> = []) {
        const data = {table: tableName, response: responseFields};
        const response = await axios.post(`${this.baseurl}/api/${this.db}/data/get`, data);
        return response.status, response.data;
    }

    public async dropTable(tableName: string = "MyTable") {
        const response = await axios.delete(`${this.baseurl}/api/${this.db}/schema/tables/${tableName}`);
        return response.status, response.data;
    }

    public async dropDb(dbName: string) {
        const response = await axios.delete(`${this.baseurl}/api/${dbName}/drop`);
        return response.status, response.data;
    }
}