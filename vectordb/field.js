class DB {
    constructor(name) {
        this.name = name;
    }
}

class Table {
    constructor(name) {
        this.name = name;
    }
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
    INT1: 1,  // TINYINT
    INT2: 2,  // SMALLINT
    INT4: 3,  // INT
    INT8: 4,  // BIGINT
    FLOAT: 10,
    DOUBLE: 11,
    STRING: 20,
    BOOL: 30,
    VECTOR_FLOAT: 40,
    VECTOR_DOUBLE: 41,
    UNKNOWN: 999
});

module.exports = {
    DB,
    Table,
    Field,
    FieldType
};