import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, CreatedAt, UpdatedAt, Is, DataType } from 'sequelize-typescript';

@Table({ tableName: "address" })
export class Address extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    endereco!: string;

    @AllowNull(false)
    @Column
    numero!: number;

    @AllowNull(true)
    @Column(DataType.STRING(30))
    complemento!: string;

    @AllowNull(false)
    @Is(/[0-9]{5}-[0-9]{3}/)
    @Column(DataType.STRING(9))
    cep!: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    bairro!: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    cidade!: string;

    @AllowNull(false)
    @Column(DataType.STRING(2))
    estado!: string;
};