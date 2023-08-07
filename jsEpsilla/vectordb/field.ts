class Field {
    private name: string;
    private dataType: string;
    private primaryKey: boolean;
    private dimensions: number;

    constructor(name: string, dataType: string, primaryKey: boolean, dimensions: number) {
        this.name = name;
        this.dataType = dataType;
        this.primaryKey = primaryKey;
        this.dimensions = dimensions;
    }
}

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

export { Field, FieldType };