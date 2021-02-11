import axios from 'axios';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../config/config';

export function validateBody(req: express.Request): void {
    if (Object.keys(req.body).length == 0) throw "Body não pode ser vazio!";
};

export async function validateAddress(req: express.Request): Promise<void> {
    try {
        if (req.body.complemento == undefined) req.body.complemento = "";
        const address = await _getAddress(req.body.cep);
        Object.assign(req.body, address);
        req.body.updateAddress = true;
    } catch (err) {
        throw err;
    }
};

export async function validatePassword(req: express.Request): Promise<void> {
    try {
        if (!/[a-z]/.test(req.body.senha)) throw "Senha deve conter ao menos uma letra minuscula";
        if (!/[A-Z]/.test(req.body.senha)) throw "Senha deve conter ao menos uma letra maiuscula";
        if (!/[0-9]/.test(req.body.senha)) throw "Senha deve conter ao menos um numero";
        if (!/[\W]/.test(req.body.senha)) throw "Senha deve conter ao menos uma caracter especial";
        if (!/.{8,30}/.test(req.body.senha)) throw "Senha deve conter entre 8 e 30 digitos"

        req.body.senha = await bcrypt.hash(req.body.senha, config.salt);
    } catch (err) {
        throw err;
    }
};

export function validateDate(req: express.Request): void {
    const regex = /(?<dia>..)\/(?<mes>..)\/(?<ano>....)/;
    let data = regex.exec(req.body.data_nasc);

    if (!data) throw "Campo data_nasc não pode ser vazio";
    else {
        if (data.groups == undefined) throw "Data_nasc deve ser no formato dd/mm/aaaa"
        else {
            req.body.data_nasc = `${data.groups.ano}-${data.groups.mes}-${data.groups.dia}`
        }
    };
};

export async function validateToken(req: express.Request) {
    try {
        if (!req.headers.token) throw "Deve ser enviado um token atraves do header";

        const token = jwt.verify(req.headers.token.toString(), config.privateKey);
        req.body.id_person = Object.values(token)[0];

    } catch (err) {
        throw err;
    }
};


async function _getAddress(cep: string) {
    try {
        return await axios({
            method: 'GET',
            url: `https://api.postmon.com.br/v1/cep/${cep}`,
            responseType: 'json'
        }).then(function (response) {
            response.data.endereco = response.data.logradouro;
            delete response.data.logradouro;
            delete response.data.estado_info;
            delete response.data.cidade_info;
            delete response.data.cep;
            return response.data;
        });
    } catch (err) {
        throw err;
    }
};