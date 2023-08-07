class DB {
    constructor() {
        // Implement constructor
    }
}

class Table {
    constructor() {
        // Implement constructor
    }
}

class Field {
    constructor(name, data_type, primary_key, dimensions) {
        // Implement constructor
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