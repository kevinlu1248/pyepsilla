import axios from 'axios';

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

  async check_networking() {
    try {
      await axios.get(this._baseurl);
      console.log(`[INFO] Connected to ${this._host}:${this._port} successfully.`);
    } catch (error) {
      throw new Error(`[ERROR] Failed to connect to ${this._host}:${this._port}`);
    }
  }

  welcome() {
    const req_url = `${this._baseurl}/`;
    return axios.get(req_url, {headers: this._header, timeout: this._timeout});
  }

  state() {
    const req_url = `${this._baseurl}/state`;
    return axios.get(req_url, {headers: this._header});
  }

  use_db(db_name) {
    this._db = db_name;
  }

  load_db(db_name, db_path, vector_scale=null, wal_enabled=null) {
    const req_url = `${this._baseurl}/api/load`;
    const req_data = {"name": db_name, "path": db_path};
    if (vector_scale !== null) {
      req_data["vectorScale"] = vector_scale;
    }
    if (wal_enabled !== null) {
      req_data["walEnabled"] = wal_enabled;
    }
    return axios.post(req_url, req_data, {headers: this._header});
  }

  unload_db(db_name) {
    const req_url = `${this._baseurl}/api/${db_name}/unload`;
    return axios.post(req_url, null, {headers: this._header});
  }
  
  create_table(table_name="MyTable", table_fields=[]) {
    if (this._db === null) {
      throw new Error("[ERROR] Please use_db() first!");
    }
    const req_url = `${this._baseurl}/api/${this._db}/schema/tables`;
    const req_data = {"name": table_name, "fields": table_fields};
    return axios.post(req_url, req_data, {headers: this._header});
  }
  
  // Continue implementing the rest of the methods in the same way
}