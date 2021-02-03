import { conectDb } from '../db/db';
import bcrypt from 'bcryptjs';

export class Person {
    id_persons: number;
    id_adress: number;
    nome_person: string;
    idade: number;
    cpf: string;
    rg: string;
    data_nasc: Date;
    sexo: sexo;
    signo?: signo;
    mae: string;
    pai?: string;
    email: string;
    senha: string;
    tel_fixo?: string;
    celular?: string;
    altura: number;
    peso: number;
    tipo_sanguineo?: tipo_sanguineo;
    cor_favorita?: string;

    constructor(person: any) {
        this.id_persons = person.id_persons;
        this.id_adress = person.id_adress;
        this.nome_person = person.nome_person;
        this.idade = person.idade;
        this.cpf = person.cpf;
        this.rg = person.rg;
        this.data_nasc = person.data_nasc;
        this.sexo = person.sexo;
        this.signo = person.signo;
        this.mae = person.mae;
        this.pai = person.pai;
        this.email = person.email;
        this.senha = person.senha;
        this.tel_fixo = person.tel_fixo;
        this.celular = person.celular;
        this.altura = person.altura;
        this.peso = person.peso;
        this.tipo_sanguineo = person.tipo_sanguineo;
        this.cor_favorita = person.cor_favorita;
    };

    public static async create(newPerson: any) {
        try {
            newPerson.senha = await bcrypt.hash(newPerson.senha, 10);

            const person = await (await conectDb()).query("INSERT INTO persons SET ?", newPerson);
            return ({ isValid: true, msg: person.insertId });
        } catch (err) {
            throw err;
        };
    };

    public static async read(personId: any) {
        try {
            const person = await (await conectDb()).query(`SELECT * FROM persons WHERE id_persons = ${personId}`);

            if (person.length != 0) return ({ isValid: true, msg: person[0] });
            else return ({ isValid: false, msg: "Cadastro não encontrado" });
        } catch (err) {
            return ({ isValid: false, msg: err });
        };
    };

    public static async newest() {
        try {
            const person = await (await conectDb()).query("SELECT * FROM persons ORDER BY idade");

            if (person.length != 0) return ({ isValid: true, msg: person[0] });
            else return ({ isValid: false, msg: "Banco de dados vazio" });
        } catch (err) {
            return ({ isValid: false, msg: err });
        };
    };

    public static async update(personId: any, newPerson: any) {
        try {
            const person = await (await conectDb()).query(`UPDATE persons SET ? WHERE id_persons = ?`,
                [newPerson, personId]);

            if (person.affectedRows != 0) return ({ isValid: true, msg: +personId });
            else return ({ isValid: false, msg: "Cadastro não encontrado" });
        } catch (err) {
            return ({ isValid: false, msg: err });
        };
    };

    public static async delet(personId: any) {
        try {
            const person = await (await conectDb()).query(`DELETE FROM persons WHERE id_persons = ${personId}`);

            if (person.affectedRows == 0) return ({ isValid: false, msg: "Cadastro não encontrado" });
            else return ({ isValid: true, msg: personId });
        } catch (err) {
            return ({ isValid: false, msg: err });
        }
    };

    public static async login(email: any) {
        try {
            const person = await (await conectDb()).query("SELECT senha, id_persons FROM persons WHERE email = ?", email);

            if (person.length != 0) return ({ isValid: true, msg: person[0] });
            else return ({ isValid: false, msg: "Email não cadastrado" });
        } catch (err) {
            return ({ isValid: false, msg: err });
        }
    };
};

enum sexo {
    'feminino',
    'masculino'
};

enum signo {
    "Áries",
    "Leão",
    "Sagitário",
    "Capricórnio",
    "Touro",
    "Virgem",
    "Libra",
    "Aquário",
    "Gêmeos",
    "Câncer",
    "Escorpião",
    "Peixes"
};

enum tipo_sanguineo {
    "AB+",
    "AB-",
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-"
}