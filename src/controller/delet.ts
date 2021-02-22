import express from 'express';

import { Address } from '../sqz/models/Address';
import { Person } from '../sqz/models/Person';

export async function delet(req: express.Request) {
    try {
        const person = await Person.findOne({
            where: {
                id: req.body.id_person
            },
            include: Address,
            raw: true,
            nest: true
        });
        if (person == null) throw "Cadastro não encontrado";

        await Person.destroy({
            where: {
                id: req.body.id_person
            }
        });
        return { status: 200, msg: { "cadastro deletado": person } };
    } catch (err) {
        return { status: 500, mdg: err };
    };
};