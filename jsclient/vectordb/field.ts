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

class Field {
    private _name: string;
    private _data_type: FieldType;
    private _primary_key: boolean;
    private _dimensions: number;

    constructor(name: string, data_type: FieldType, primary_key: boolean, dimensions: number) {
        this._name = name;
        this._data_type = data_type;
        this._primary_key = primary_key;
        this._dimensions = dimensions;
    }

    // Rest of the methods go here
}

export { Field, FieldType };