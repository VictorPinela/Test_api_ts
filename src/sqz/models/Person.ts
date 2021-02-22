import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, CreatedAt, UpdatedAt, Is, DataType, ForeignKey, BelongsTo, Unique } from 'sequelize-typescript';
import { Address } from './Address';

enum sexo { 'feminino', 'masculino' };
enum signo { "Áries", "Leão", "Sagitário", "Capricórnio", "Touro", "Virgem", "Libra", "Aquário", "Gêmeos", "Câncer", "Escorpião", "Peixes" };
enum tipo_sanguineo { "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" };

@Table({ tableName: "person" })
export class Person extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => Address)
    @Column
    address!: number;

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
    @Column(DataType.STRING(14))
    cpf!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(12))
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
    @Column(DataType.STRING(14))
    telefone_fixo!: string;

    @AllowNull(false)
    @Column(DataType.STRING(15))
    celular!: string;

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