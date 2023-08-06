export enum FieldType {
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

export class Field {
    private name: string;
    private dataType: FieldType;
    private primaryKey: boolean;
    private dimensions: number;

    // Getter and setter methods
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
        if (!Object.values(FieldType).includes(dataType)) {
            throw new Error('Invalid FieldType');
        }
        this.dataType = dataType;
    }

    public getPrimaryKey(): boolean {
        return this.primaryKey;
    }

    public setPrimaryKey(primaryKey: boolean): void {
        this.primaryKey = primaryKey;
    }

    public getDimensions(): number {
        return this.dimensions;
    }

    public setDimensions(dimensions: number): void {
        if (dimensions < 1) {
            throw new Error('Dimensions must be a positive integer');
        }
        this.dimensions = dimensions;
    }
}

    constructor(name: string, dataType: FieldType, primaryKey: boolean, dimensions: number) {
        if (!Object.values(FieldType).includes(dataType)) {
            throw new Error('Invalid FieldType');
        }
        if (dimensions < 1) {
            throw new Error('Dimensions must be a positive integer');
        }
        this.name = name;
        this.dataType = dataType;
        this.primaryKey = primaryKey;
        this.dimensions = dimensions;
    }
}