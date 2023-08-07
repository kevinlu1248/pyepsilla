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
            .then(response => console.log(`Connected to ${this._host}:${this._port} successfully.`))
            .catch(error => console.error(`Failed to connect to ${this._host}:${this._port}.`));
    }

    welcome() {
        return axios.get(`${this._baseurl}/`)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    state() {
        return axios.get(`${this._baseurl}/state`)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    use_db(db_name) {
        this._db = db_name;
    }

    load_db(db_name, db_path, vector_scale=null, wal_enabled=null) {
        const data = {name: db_name, path: db_path};
        if (vector_scale !== null) data.vectorScale = vector_scale;
        if (wal_enabled !== null) data.walEnabled = wal_enabled;
        return axios.post(`${this._baseurl}/api/load`, data, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    unload_db(db_name) {
        return axios.post(`${this._baseurl}/api/${db_name}/unload`, null, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    create_table(table_name="MyTable", table_fields=[]) {
        const data = {name: table_name, fields: table_fields};
        return axios.post(`${this._baseurl}/api/${this._db}/schema/tables`, data, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    insert(table_name="MyTable", records=[]) {
        const data = {table: table_name, data: records};
        return axios.post(`${this._baseurl}/api/${this._db}/data/insert`, data, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    query(table_name="MyTable", query_field="", query_vector=[], response_fields=[], limit=1, with_distance=false) {
        const data = {table: table_name, queryField: query_field, queryVector: query_vector, response: response_fields, limit: limit, withDistance: with_distance};
        return axios.post(`${this._baseurl}/api/${this._db}/data/query`, data, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    get(table_name="MyTable", response_fields=[]) {
        const data = {table: table_name, response: response_fields};
        return axios.post(`${this._baseurl}/api/${this._db}/data/get`, data, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    drop_table(table_name="MyTable") {
        return axios.delete(`${this._baseurl}/api/${this._db}/schema/tables/${table_name}`, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    drop_db(db_name) {
        return axios.delete(`${this._baseurl}/api/${db_name}/drop`, {headers: this._header})
            .then(response => response.data)
            .catch(error => console.error(error));
    }
}

module.exports = Client;