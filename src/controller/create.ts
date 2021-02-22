import express from 'express';

import { Address } from '../sqz/models/Address';
import { Person } from '../sqz/models/Person';

export async function create(req: express.Request) {
    try {
        let address;
        address = await Address.findOne({
            where: {
                cep: req.body.cep,
                numero: req.body.numero,
                complemento: req.body.complemento
            },
            raw: true
        });
        if (address == null) {
            address = await Address.create(req.body);
        };
        req.body.address = address.id;
        const person = await Person.create(req.body);
        return { status: 200, msg: { id: person.id } };
    } catch (err) {
        return { status: 500, mdg: err };
    };
};