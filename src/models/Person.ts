import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, CreatedAt, UpdatedAt, Is, DataType, ForeignKey, BelongsTo, Unique } from 'sequelize-typescript';
import { sexo, signo, tipo_sanguineo } from '../config/enum';
import { Address } from './Address';

@Table({ tableName: "person" })
export class Person extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => Address)
    address!: Address;

    @BelongsTo(() => Address)
    fk_address!: Address;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    nome!: string;

    @AllowNull(false)
    @Column
    idade!: number;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(11))
    cpf!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(9))
    rg!: string;

    @AllowNull(false)
    @Column
    data_nasc!: Date;

    @AllowNull(false)
    @Column(DataType.ENUM({ values: Object.keys(sexo) }))
    sexo!: sexo;

    @AllowNull(true)
    @Column(DataType.ENUM({ values: Object.keys(signo) }))
    signo!: signo;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    mae!: string;

    @AllowNull(true)
    @Column(DataType.STRING(50))
    pai!: string

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(100))
    email!: string;

    @AllowNull(false)
    @Column(DataType.STRING(60))
    senha!: string;

    @AllowNull(true)
    @Column(DataType.STRING(2))
    ddd_fixo!: string;

    @AllowNull(true)
    @Column(DataType.STRING(8))
    tel_fixo!: string;

    @AllowNull(false)
    @Column(DataType.STRING(2))
    ddd_cel!: string;

    @AllowNull(false)
    @Column(DataType.STRING(9))
    cel!: string;

    @AllowNull(false)
    @Column(DataType.STRING(4))
    altura!: string;

    @AllowNull(false)
    @Column(DataType.STRING(7))
    peso!: string;

    @AllowNull(true)
    @Column(DataType.ENUM({ values: Object.keys(tipo_sanguineo) }))
    tipo_sanguineo!: tipo_sanguineo;

    @AllowNull(true)
    @Column(DataType.STRING(7))
    cor!: string;
};