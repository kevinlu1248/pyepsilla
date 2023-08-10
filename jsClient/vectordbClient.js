// vectordbClient.js

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
        const net = require('net');
        const client = new net.Socket();
        client.connect(this._port, this._host, function() {
            console.log('Connected');
            client.destroy(); // kill client after server's response
        });
    
        client.on('error', function(err) {
            console.error('Connection error', err);
        });
    }

    // Implement other methods from vectordb/client.py
}

class Field {
    constructor(name, data_type, primary_key, dimensions) {
        this.name = name;
        this.data_type = data_type;
        this.primary_key = primary_key;
        this.dimensions = dimensions;
    }
}

const FieldType = Object.freeze({
    INT1: 1,
    INT2: 2,
    INT4: 3,
    INT8: 4,
    FLOAT: 10,
    DOUBLE: 11,
    STRING: 20,
    BOOL: 30,
    VECTOR_FLOAT: 40,
    VECTOR_DOUBLE: 41,
    UNKNOWN: 999
});

module.exports = {
    Client,
    Field,
    FieldType
}