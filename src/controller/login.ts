import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Person } from '../models/persons';
import { closeDb } from '../db/db';

export async function login(req: express.Request) {
    try {
        if (Object.keys(req.body).length == 0) throw "Body deve conter email e senha";

        const loginPerson = await Person.login(req.body.email);

        if (!loginPerson.isValid) throw loginPerson.msg;
        else {

            const match = await bcrypt.compare(req.body.senha, loginPerson.msg.senha);
            if (!match) throw "Senha errada";
            else {
                const token = jwt.sign({ data: loginPerson.msg.id_persons.toString() }, 'winn');
                return {
                    status: 200,
                    msg: "Login feito com sucesso",
                    return: { token: token }
                };
            }
        }
    } catch (err) {
        return {
            status: 400,
            msg: "login",
            return: err
        };
    } finally {
        closeDb();
    };
};