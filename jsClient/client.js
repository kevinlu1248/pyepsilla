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
        const net = require('net');
        const client = new net.Socket();
        client.connect(this._port, this._host, function() {
            console.log("[INFO] Connected to " + this._host + ":" + this._port + " successfully.");
        });
        client.on('error', function(ex) {
            throw new Error("[ERROR] Failed to connect to " + this._host + ":" + this._port);
        });
    }

    welcome() {
        const url = `${this._baseurl}/`;
        return axios.get(url, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    state() {
        const url = `${this._baseurl}/state`;
        return axios.get(url, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    use_db(db_name) {
        this._db = db_name;
    }

    load_db(db_name, db_path, vector_scale=null, wal_enabled=null) {
        const url = `${this._baseurl}/api/load`;
        const data = {
            name: db_name,
            path: db_path,
            vectorScale: vector_scale,
            walEnabled: wal_enabled
        };
        return axios.post(url, data, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    unload_db(db_name) {
        const url = `${this._baseurl}/api/${db_name}/unload`;
        return axios.post(url, null, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    create_table(table_name="MyTable", table_fields=[]) {
        const url = `${this._baseurl}/api/${this._db}/schema/tables`;
        const data = {
            name: table_name,
            fields: table_fields
        };
        return axios.post(url, data, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    insert(table_name="MyTable", records=[]) {
        const url = `${this._baseurl}/api/${this._db}/data/insert`;
        const data = {
            table: table_name,
            data: records
        };
        return axios.post(url, data, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    query(table_name="MyTable", query_field="", query_vector=[], response_fields=[], limit=1, with_distance=false) {
        const url = `${this._baseurl}/api/${this._db}/data/query`;
        const data = {
            table: table_name,
            queryField: query_field,
            queryVector: query_vector,
            response: response_fields,
            limit: limit,
            withDistance: with_distance
        };
        return axios.post(url, data, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    get(table_name="MyTable", response_fields=[]) {
        const url = `${this._baseurl}/api/${this._db}/data/get`;
        const data = {
            table: table_name,
            response: response_fields
        };
        return axios.post(url, data, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    drop_table(table_name="MyTable") {
        const url = `${this._baseurl}/api/${this._db}/schema/tables/${table_name}`;
        return axios.delete(url, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    drop_db(db_name) {
        const url = `${this._baseurl}/api/${db_name}/drop`;
        return axios.delete(url, {headers: this._header})
            .then(response => {
                return [response.status, response.data];
            })
            .catch(error => {
                throw new Error(error);
            });
    }
}

module.exports = Client;