import express from 'express';
import jwt from 'jsonwebtoken';

import { closeDb } from '../db/db';
import { Person } from '../models/persons';

export async function delet(req: express.Request) {
    try {
        if (!req.headers.token) throw "Deve ser enviado um token atraves do header";
        else {
            let id;
            try {
                const token = jwt.verify(req.headers.token.toString(), 'winn');
                id = Object.values(token)[0];
            } catch (err) { throw err }

            const deletePerson = await Person.delet(id);
            if (!deletePerson.isValid) throw deletePerson.msg;
            else return {
                status: 200,
                msg: "Cadastro deletado com sucesso",
                return: { id_deletado: deletePerson.msg }
            };
        };
    } catch (err) {
        return {
            status: 500,
            msg: "delet",
            return: err
        };
    } finally {
        closeDb();
    };
};