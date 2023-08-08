const axios = require('axios');

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
    axios.get(this._baseurl)
      .then(response => {
        console.log(`[INFO] Connected to ${this._host}:${this._port} successfully.`);
      })
      .catch(error => {
        console.error(`[ERROR] Failed to connect to ${this._host}:${this._port}`);
      });
  }

  welcome() {
    // Implement welcome request
  }

  state() {
    // Implement state request
  }

  use_db(db_name) {
    this._db = db_name;
  }

  load_db(db_name, db_path, vector_scale=null, wal_enabled=null) {
    // Implement load_db request
  }

  unload_db(db_name) {
    // Implement unload_db request
  }

  create_table(table_name="MyTable", table_fields=[]) {
    // Implement create_table request
  }

  insert(table_name="MyTable", records=[]) {
    // Implement insert request
  }

  query(table_name="MyTable", query_field="", query_vector=[], response_fields=[], limit=1, with_distance=false) {
    // Implement query request
  }

  get(table_name="MyTable", response_fields=[]) {
    // Implement get request
  }

  drop_table(table_name="MyTable") {
    // Implement drop_table request
  }

  drop_db(db_name) {
    // Implement drop_db request
  }
}

module.exports = Client;