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

  async state() {
    const res = await axios.get(`${this._baseurl}/state`, {headers: this._header});
    return [res.status, res.data];
  }

  use_db(db_name) {
    this._db = db_name;
  }

  async load_db(db_name, db_path) {
    const res = await axios.post(`${this._baseurl}/api/load`, {name: db_name, path: db_path}, {headers: this._header});
    return [res.status, res.data];
  }

  async unload_db(db_name) {
    const res = await axios.post(`${this._baseurl}/api/${db_name}/unload`, null, {headers: this._header});
    return [res.status, res.data];
  }

  async create_table(table_name, table_fields) {
    const res = await axios.post(`${this._baseurl}/api/${this._db}/schema/tables`, {name: table_name, fields: table_fields}, {headers: this._header});
    return [res.status, res.data];
  }

  async insert(table_name, records) {
    const res = await axios.post(`${this._baseurl}/api/${this._db}/data/insert`, {table: table_name, data: records}, {headers: this._header});
    return [res.status, res.data];
  }

  async query(table_name, query_field, query_vector, response_fields, limit, with_distance) {
    const res = await axios.post(`${this._baseurl}/api/${this._db}/data/query`, {table: table_name, queryField: query_field, queryVector: query_vector, response: response_fields, limit: limit, withDistance: with_distance}, {headers: this._header});
    return [res.status, res.data];
  }

  async get(table_name, response_fields) {
    const res = await axios.post(`${this._baseurl}/api/${this._db}/data/get`, {table: table_name, response: response_fields}, {headers: this._header});
    return [res.status, res.data];
  }

  async drop_table(table_name) {
    const res = await axios.delete(`${this._baseurl}/api/${this._db}/schema/tables/${table_name}`, null, {headers: this._header});
    return [res.status, res.data];
  }

  async drop_db(db_name) {
    const res = await axios.delete(`${this._baseurl}/api/${db_name}/drop`, null, {headers: this._header});
    return [res.status, res.data];
  }
}

module.exports = Client;