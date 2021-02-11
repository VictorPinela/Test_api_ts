import express from 'express';

import { create } from '../controller/create';
import { read, readNewest } from '../controller/read';
import { update } from '../controller/update';
import { delet } from '../controller/delet';
import { login } from '../controller/login';
import { responseHandler } from '../handler/handler';
import { handlresDB } from '../config';

export const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const bd = await handlresDB();
        await bd.sync({ force: true });
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
    }
    // responseHandler(await create(req), res);
});

// router.get('/read', readMiddleware, async (req, res) => {
//     responseHandler(await read(req), res);
// });

// router.put('/update', updateMiddleware, async (req, res) => {
//     responseHandler(await update(req), res);
// });

// router.delete('/delete', deleteMiddleware, async (req, res) => {
//     responseHandler(await delet(req), res);
// });

// router.get('/newest', async (req, res) => {
//     responseHandler(await readNewest(), res);
// });

// router.get('/login', loginMiddleware, async (req, res) => {
//     responseHandler(await login(req), res);
// });