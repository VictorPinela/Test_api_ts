import { conectDb } from '../db/db';

export class Adress {
    logradouro: string;
    nome_adress: string;
    numero: number;
    complemento?: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;

    constructor(adress: any) {
        this.logradouro = adress.logradouro;
        this.nome_adress = adress.nome_adress;
        this.numero = adress.numero;
        this.complemento = adress.complemento;
        this.cep = adress.cep;
        this.bairro = adress.bairro;
        this.cidade = adress.cidade;
        this.estado = adress.estado;
    };

    public static async create(newAdress: any) {
        try {
            if (newAdress.complemento == undefined) newAdress.complemento = "";

            let adress = await (await conectDb()).query("SELECT id_adress FROM adress AS a WHERE a.logradouro = ? AND a.nome_adress = ? AND a.numero = ? AND a.complemento = ? AND a.cep = ? AND a.bairro = ? AND a.cidade = ? AND a.estado = ?",
                [newAdress.logradouro, newAdress.nome_adress, newAdress.numero, newAdress.complemento, newAdress.cep, newAdress.bairro, newAdress.cidade, newAdress.estado])

            if (adress.length != 0) return ({ isValid: true, msg: adress[0].id_adress });
            else {

                adress = await (await conectDb()).query("INSERT INTO adress SET ?", newAdress);
                return ({ isValid: true, msg: adress.insertId });
            }
        } catch (err) {
            throw err;
        };
    };

    public static async read(adressId: any) {
        try {
            let adress = await (await conectDb()).query(`SELECT * FROM adress WHERE id_adress = ${adressId}`)

            if (adress.length != 0) return ({ isValid: true, msg: adress[0] });
            else return ({ isValid: false, msg: "Endereço não encontrado" });
        } catch (err) {
            throw err;
        };
    };

    public static async update(personId: any, newAdress: any) {
        try {
            let adressId = await (await conectDb()).query("SELECT id_adress FROM persons WHERE id_persons = ?",
                [personId]);

            const adress = await (await conectDb()).query(`UPDATE adress SET ? WHERE id_adress = ?`,
                [newAdress, adressId[0].id_adress]);

            if (adress.affectedRows != 0) return ({ isValid: true, msg: adressId[0].id_adress });
            else return ({ isValid: false, msg: "Enderço não encontrada" });
        } catch (err) {
            return ({ isValid: false, msg: err });
        };
    };
};