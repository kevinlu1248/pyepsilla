const axios = require('axios');
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

  async welcome() {
    const res = await axios.get(`${this._baseurl}/`, {headers: this._header, timeout: this._timeout});
    return [res.status, res.data];
  }

  // Implement the rest of the methods (state, use_db, load_db, unload_db, create_table, insert, query, get, drop_table, drop_db) here
}

module.exports = Client;