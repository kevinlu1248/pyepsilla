import axios from 'axios';

class Client {
    private protocol: string;
    private host: string;
    private port: string;
    private baseurl: string;
    private db: string | null;
    private timeout: number;
    private header: object;

    constructor(protocol = 'http', host = 'localhost', port = '8888') {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
        this.db = null;
        this.timeout = 10;
        this.header = {'Content-type': 'application/json'};
        this.check_networking();
    }

    private check_networking() {
        // Networking check logic goes here
    }

    public welcome() {
        // HTTP GET request logic goes here
    }

    public state() {
        // HTTP GET request logic goes here
    }

    public use_db(db_name: string) {
        this.db = db_name;
    }

    public load_db(db_name: string, db_path: string, vector_scale?: number, wal_enabled?: boolean) {
        // HTTP POST request logic goes here
    }

    public unload_db(db_name: string) {
        // HTTP POST request logic goes here
    }

    public create_table(table_name = "MyTable", table_fields = []) {
        // HTTP POST request logic goes here
    }

    public insert(table_name = "MyTable", records = []) {
        // HTTP POST request logic goes here
    }

    public query(table_name = "MyTable", query_field = "", query_vector = [], response_fields = [], limit = 1, with_distance = false) {
        // HTTP POST request logic goes here
    }

    public get(table_name = "MyTable", response_fields = []) {
        // HTTP POST request logic goes here
    }

    public drop_table(table_name = "MyTable") {
        // HTTP DELETE request logic goes here
    }

    public drop_db(db_name: string) {
        // HTTP DELETE request logic goes here
    }
}

export default Client;