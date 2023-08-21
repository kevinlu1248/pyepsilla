const fetch = require('node-fetch');
const net = require('net');

class Client {
    constructor(protocol = 'http', host='localhost', port='8888') {
        this._protocol = protocol;
        this._host = host;
        this._port = port;
        this._baseurl = `${this._protocol}://${this._host}:${this._port}`;
        this._db = null;
        this._timeout = 10;
        this._header = {'Content-type': 'application/json'};
        this.check_networking();
    }

    check_networking() {
        const client = new net.Socket();
        client.connect(this._port, this._host, function() {
            console.log(`[INFO] Connected to ${this._host}:${this._port} successfully.`);
        });

        client.on('error', function(ex) {
            console.log(`[ERROR] Failed to connect to ${this._host}:${this._port}`);
        });
    }

    welcome() {
        const req_url = `${this._baseurl}/`;
        return fetch(req_url, {method: 'GET', headers: this._header})
            .then(res => res.text())
            .then(body => [res.status, body]);
    }

    // Implement the rest of the methods in a similar way, using fetch for HTTP requests and JSON.parse/JSON.stringify for working with JSON data.
}

