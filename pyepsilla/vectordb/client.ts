import axios from 'axios';

enum FieldType {
    INT1 = 1,  // TINYINT
    INT2 = 2,  // SMALLINT
    INT4 = 3,  // INT
    INT8 = 4,  // BIGINT
    FLOAT = 10,
    DOUBLE = 11,
    STRING = 20,
    BOOL = 30,
    VECTOR_FLOAT = 40,
    VECTOR_DOUBLE = 41,
    UNKNOWN = 999
}

class Client {
    private protocol: string;
    private host: string;
    private port: string;
    private baseurl: string;
    private db: string | null;
    private timeout: number;
    private header: object;

    constructor(protocol = 'http', host = 'localhost', port = '8888') {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
        this.db = null;
        this.timeout = 10;
        this.header = {'Content-type': 'application/json'};
        this.check_networking();
    }

    // Rest of the methods go here
}