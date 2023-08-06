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

    // Rest of the methods go here
    public async welcome() {
        return "Welcome to EpsillaDB!";
    }

    public async state() {
        // Add the implementation for the 'state' method here
    }

    public async use_db(db_name: string) {
        // Add the implementation for the 'use_db' method here
    }

    public async load_db(db_name: string, db_path: string) {
        // Add the implementation for the 'load_db' method here
    }

    public async unload_db(db_name: string) {
        // Add the implementation for the 'unload_db' method here
    }

    public async create_table(table_name: string, table_fields: any[]) {
        // Add the implementation for the 'create_table' method here
    }

    public async insert(table_name: string, records: any[]) {
        // Add the implementation for the 'insert' method here
    }

    public async query(table_name: string, query_field: string, query_vector: any[], response_fields: any[], limit: number, with_distance: boolean) {
        // Add the implementation for the 'query' method here
    }

    public async get(table_name: string, response_fields: any[]) {
        // Add the implementation for the 'get' method here
    }

    public async drop_table(table_name: string) {
        // Add the implementation for the 'drop_table' method here
    }

    public async drop_db(db_name: string) {
        // Add the implementation for the 'drop_db' method here
    }
    }
    // Newline at the end of the file