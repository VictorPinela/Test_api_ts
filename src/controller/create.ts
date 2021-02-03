import express from 'express';

import { closeDb } from '../db/db';
import { Adress } from '../models/adress';
import { Person } from '../models/persons';

export async function create(req: express.Request) {
    try {
        if (Object.keys(req.body).length == 0) throw "Body não pode ser vazio!";

        const createAdress = await Adress.create(new Adress(req.body));
        if (!createAdress.isValid) throw createAdress.msg;
        else {
            req.body.id_adress = createAdress.msg;

            const createPerson = await Person.create(new Person(req.body));
            if (!createPerson.isValid) throw createPerson.msg;
            else return {
                status: 200,
                msg: "Pessoa cadastrada",
                return: createPerson.msg
            };
        }
    } catch (err) {
        return {
            status: 500,
            msg: "create",
            return: err
        };
    } finally {
        closeDb();
    };
};