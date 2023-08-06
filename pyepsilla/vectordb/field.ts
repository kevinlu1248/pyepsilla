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
    VECTOR_DOUBLE = 41
}

class Field {
    private name: string;
    private dataType: FieldType;
    private primaryKey: boolean;
    private dimensions: number | null;

    constructor(name: string, dataType: FieldType, primaryKey: boolean, dimensions: number | null = null) {
        this.name = name;
        this.dataType = dataType;
        this.primaryKey = primaryKey;
        this.dimensions = dimensions;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDataType(): FieldType {
        return this.dataType;
    }

    public setDataType(dataType: FieldType): void {
        this.dataType = dataType;
    }

    public isPrimaryKey(): boolean {
        return this.primaryKey;
    }

    public setPrimaryKey(primaryKey: boolean): void {
        this.primaryKey = primaryKey;
    }

    public getDimensions(): number | null {
        return this.dimensions;
    }

    public setDimensions(dimensions: number | null): void {
        this.dimensions = dimensions;
    }
}
