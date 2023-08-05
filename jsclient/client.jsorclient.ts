const axios = require('axios');

class Client {
    constructor(protocol = 'http', host='localhost', port='8888') {
        this._protocol = protocol;
        this._host = host;
        this._port = port;
        this._baseurl = `${this._protocol}://${this._host}:${this._port}`;
        this._db = null;
        this._timeout = 10000;
        this._header = {'Content-type': 'application/json'};
        this.check_networking();
    }

    check_networking() {
        // JavaScript does not have a direct equivalent to Python's socket library
        // We will use axios to send a GET request to the base URL and check if it is successful
        axios.get(this._baseurl)
            .then(() => console.log(`[INFO] Connected to ${this._host}:${this._port} successfully.`))
            .catch(() => console.error(`[ERROR] Failed to connect to ${this._host}:${this._port}`));
    }

    // Rest of the methods translated from Python to JavaScript
}
module.exports = Client;