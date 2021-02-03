import express from 'express';
import jwt from 'jsonwebtoken';

import { closeDb } from '../db/db';
import { Adress } from '../models/adress';
import { Person } from '../models/persons';

export async function update(req: express.Request) {
    try {
        if (Object.keys(req.body).length == 0) throw "Body não pode ser vazio!";

        const newPerson: any = new Person(req.body);
        Object.keys(newPerson).forEach(key => {
            if (newPerson[key] === undefined) {
                delete newPerson[key];
            }
        });
        const newAdress: any = new Adress(req.body);
        Object.keys(newAdress).forEach(key => {
            if (newAdress[key] === undefined) {
                delete newAdress[key];
            }
        });
        if (!req.headers.token) throw "Deve ser enviado um token atraves do header";
        else {
            let id;
            try {
                const token = jwt.verify(req.headers.token.toString(), 'winn');
                id = Object.values(token)[0];
            } catch (err) { throw err }

            const dataResponse = [];
            let updatePerson, updateAdress;

            if (Object.keys(newPerson).length != 0) {
                updatePerson = await Person.update(id, newPerson);
            }
            else updatePerson = { isValid: true, msg: "Pessoa não foi alterada" };
            if (!updatePerson.isValid) throw updatePerson.msg;
            else {
                dataResponse.push({ person_id: updatePerson.msg });

                if (Object.keys(newAdress).length != 0) {
                    updateAdress = await Adress.update(id, newAdress);
                }
                else updateAdress = { isValid: true, msg: "Endereço não foi alterado" };

                if (!updateAdress.isValid) throw updateAdress.msg;
                else {
                    dataResponse.push({ adress_id: updateAdress.msg });
                    return {
                        status: 200,
                        msg: "Cadastro atualizado com sucesso",
                        return: dataResponse
                    };
                }
            }
        }
    } catch (err) {
        return {
            status: 400,
            msg: "update",
            return: err
        };
    } finally {
        closeDb();
    };
};