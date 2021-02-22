import express from 'express';
import { Address } from '../sqz/models/Address';

import { Person } from '../sqz/models/Person';

export async function update(req: express.Request) {
    try {
        if (req.body.updateAddress) {
            const address = await Address.create(req.body);
            req.body.address = address.id;
        }
        const person = await Person.update(req.body, {
            where: {
                id: req.body.id_person
            }
        });
        return { status: 200, msg: { id: person[0] } }
    } catch (err) {
        return { status: 500, mdg: err };
    };
};