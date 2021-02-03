import express from 'express';
import jwt from 'jsonwebtoken';

import { closeDb } from '../db/db';
import { Adress } from '../models/adress';
import { Person } from '../models/persons';

export async function read(req: express.Request) {
    try {
        if (!req.headers.token) throw "Deve ser enviado um token atraves do header";
        else {
            let id;
            try {
                const token = jwt.verify(req.headers.token.toString(), 'winn');
                id = Object.values(token)[0];
            } catch (err) { throw err }

            const dataResponse = [];

            const readPerson = await Person.read(id);

            if (!readPerson.isValid) throw readPerson.msg;
            else {
                dataResponse.push({ person: readPerson.msg });

                const readAdress = await Adress.read(readPerson.msg.id_adress);

                if (!readAdress.isValid) throw readAdress.msg;
                else {

                    dataResponse.push({ adress: readAdress.msg });
                    return {
                        status: 302,
                        msg: "Cadastro encontrada",
                        return: dataResponse
                    };
                };
            };
        };
    } catch (err) {
        return {
            status: 500,
            msg: "read",
            return: err
        };
    } finally {
        closeDb();
    };
};

export async function readNewest() {
    try {
        const dataResponse = [];

        const newestPerson = await Person.newest();
        if (!newestPerson.isValid) throw newestPerson.msg;
        else {
            dataResponse.push({ person: newestPerson.msg });

            const newestAdress = await Adress.read(newestPerson.msg.id_adress);

            if (!newestAdress.isValid) throw newestAdress.msg;
            else {
                dataResponse.push({ adress: newestAdress.msg });
                return {
                    status: 302,
                    msg: "Pessoa mais nova encontrada",
                    return: dataResponse
                };
            }
        }
    } catch (err) {
        return {
            status: 500,
            msg: "newest",
            return: err
        };
    } finally {
        closeDb();
    };
};