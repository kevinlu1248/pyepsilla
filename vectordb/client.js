const axios = require('axios');
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

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
        logger.info(`[INFO] Connected to ${this._host}:${this._port} successfully.`);
      })
      .catch(error => {
        logger.error(`[ERROR] Failed to connect to ${this._host}:${this._port}`);
      });
  }

  welcome() {
    axios.get(`${this._baseurl}/`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  state() {
    axios.get(`${this._baseurl}/state`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  use_db(db_name) {
    this._db = db_name;
  }

  load_db(db_name, db_path, vector_scale=null, wal_enabled=null) {
    axios.post(`${this._baseurl}/api/load`, {name: db_name, path: db_path, vectorScale: vector_scale, walEnabled: wal_enabled})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  unload_db(db_name) {
    axios.post(`${this._baseurl}/api/${db_name}/unload`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  create_table(table_name="MyTable", table_fields=[]) {
    axios.post(`${this._baseurl}/api/${this._db}/schema/tables`, {name: table_name, fields: table_fields})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  insert(table_name="MyTable", records=[]) {
    axios.post(`${this._baseurl}/api/${this._db}/data/insert`, {table: table_name, data: records})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  query(table_name="MyTable", query_field="", query_vector=[], response_fields=[], limit=1, with_distance=false) {
    axios.post(`${this._baseurl}/api/${this._db}/data/query`, {table: table_name, queryField: query_field, queryVector: query_vector, response: response_fields, limit: limit, withDistance: with_distance})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  get(table_name="MyTable", response_fields=[]) {
    axios.post(`${this._baseurl}/api/${this._db}/data/get`, {table: table_name, response: response_fields})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  drop_table(table_name="MyTable") {
    axios.delete(`${this._baseurl}/api/${this._db}/schema/tables/${table_name}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  drop_db(db_name) {
    axios.delete(`${this._baseurl}/api/${db_name}/drop`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

module.exports = Client;