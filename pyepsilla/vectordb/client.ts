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

    public state() {
        // Implement state method
    }

    public useDb(dbName: string) {
        this.db = dbName;
    }

    public loadDb(dbName: string, dbPath: string, vectorScale?: number, walEnabled?: boolean) {
        // Implement loadDb method
    }

    public unloadDb(dbName: string) {
        // Implement unloadDb method
    }

    public createTable(tableName: string = "MyTable", tableFields: Array<object> = []) {
        // Implement createTable method
    }

    public insert(tableName: string = "MyTable", records: Array<object> = []) {
        // Implement insert method
    }

    public query(tableName: string = "MyTable", queryField: string = "", queryVector: Array<number> = [], responseFields: Array<string> = [], limit: number = 1, withDistance: boolean = false) {
        // Implement query method
    }

    public get(tableName: string = "MyTable", responseFields: Array<string> = []) {
        // Implement get method
    }

    public dropTable(tableName: string = "MyTable") {
        // Implement dropTable method
    }

    public dropDb(dbName: string) {
        // Implement dropDb method
    }
}