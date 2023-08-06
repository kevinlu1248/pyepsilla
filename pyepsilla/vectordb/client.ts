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
    // Implement all the necessary methods here
    // For example:
    // public async load_db(db_name: string, db_path: string) {
    //     // Implementation goes here
    // }
    // Repeat for all the necessary methods
    }
    // Newline at the end of the file