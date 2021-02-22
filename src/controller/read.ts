import express from 'express';
import jwt from 'jsonwebtoken';
import { Address } from '../sqz/models/Address';

import { Person } from '../sqz/models/Person';

export async function read(req: express.Request) {
    try {
        const person = await Person.findOne({
            where: {
                id: req.body.id_person
            },
            include: Address,
            raw: true,
            nest: true
        })
        if (person == null) throw "Cadastro não encontrado";
        return { status: 200, msg: { person: person } }
    } catch (err) {
        return { status: 500, mdg: err };
    };
};

export async function readNewest() {
    try {
        const person = await Person.findOne({
            where: {
                idade: await Person.min("idade")
            },
            include: Address,
            raw: true,
            nest: true
        });
        if (person == null) throw "erro"
        return { status: 200, msg: { person: person } }
    } catch (err) {
        return { status: 500, mdg: err };
    };
};