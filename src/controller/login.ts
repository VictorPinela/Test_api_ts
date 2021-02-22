import express from 'express';
import bcrypt, { hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { Person } from '../sqz/models/Person';
import { config } from '../../config';

export async function login(req: express.Request) {
    try {
        const person = await Person.findOne({
            where: {
                email: req.body.email
            }
        });
        if (person == null) throw "Cadastro não encontrado";

        const match = await bcrypt.compare(req.body.senha, person.senha);
        if (!match) throw "Senha errada";
        else {
            const token = jwt.sign({ data: person.id.toString() }, 'winn');
            return {
                status: 200,
                msg: { token: token }
            };
        };
    } catch (err) {
        return { status: 500, mdg: err };
    };
};

export async function recoverPassword(req: express.Request) {
    try {
        const person = await Person.findOne({
            where: {
                email: req.body.email,
                cpf: req.body.cpf
            },
            attributes: ["id"],
            raw: true
        })
        if (person == null) throw "Cadastro não encontrado"
        const senha = hashSync("Nova@1234", config.salt);
        await Person.update({ senha: senha }, {
            where: {
                id: person.id
            }
        });
        await config.remetente.sendMail({
            from: config.email,
            to: req.body.email,
            subject: "Recuperação de senha",
            text: "Sua nova senha é Nova@1234"
        });
        return { status: 200, msg: "senha enviada ao email" }
    } catch (err) {
        return { status: 500, msg: err };
    };
};