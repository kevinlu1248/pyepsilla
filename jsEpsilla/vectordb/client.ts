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
    
    // Implement the state method
    public async state() {
        // Implementation goes here
    }
    
    // Implement the use_db method
    public use_db(db_name: string) {
        // Implementation goes here
    }
    
    // Implement the load_db method
    public async load_db(db_name: string, db_path: string, vector_scale?: number, wal_enabled?: boolean) {
        // Implementation goes here
    }
    
    // Implement the unload_db method
    public async unload_db(db_name: string) {
        // Implementation goes here
    }
    
    // Implement the create_table method
    public async create_table(table_name: string = "MyTable", table_fields: any[] = []) {
        // Implementation goes here
    }
    
    // Implement the insert method
    public async insert(table_name: string = "MyTable", records: any[] = []) {
        // Implementation goes here
    }
    
    // Implement the query method
    public async query(table_name: string = "MyTable", query_field: string = "", query_vector: any[] = [], response_fields: any[] = [], limit: number = 1, with_distance: boolean = false) {
        // Implementation goes here
    }
    
    // Implement the get method
    public async get(table_name: string = "MyTable", response_fields: any[] = []) {
        // Implementation goes here
    }
    
    // Implement the drop_table method
    public async drop_table(table_name: string = "MyTable") {
        // Implementation goes here
    }
    
    // Implement the drop_db method
    public async drop_db(db_name: string) {
        // Implementation goes here
    }
    }