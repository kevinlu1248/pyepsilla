class Client {
    private _protocol: string;
    private _host: string;
    private _port: string;
    private _baseurl: string;
    private _db: string | null;
    private _timeout: number;
    private _header: { 'Content-type': string };

    constructor(protocol = 'http', host = 'localhost', port = '8888') {
        this._protocol = protocol;
        this._host = host;
        this._port = port;
        this._baseurl = `${this._protocol}://${this._host}:${this._port}`;
        this._db = null;
        this._timeout = 10;
        this._header = { 'Content-type': 'application/json' };
        this.check_networking();
    }

    private async check_networking() {
        try {
            const response = await fetch(`${this._baseurl}`);
            if (!response.ok) {
                throw new Error(`Failed to connect to ${this._host}:${this._port}`);
            }
            console.log(`Connected to ${this._host}:${this._port} successfully.`);
        } catch (error) {
            console.error(error);
        }
    }

    // Rest of the methods go here
}