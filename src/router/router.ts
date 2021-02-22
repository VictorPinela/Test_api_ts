import express from 'express';

import { create } from '../controller/create';
import { read, readNewest } from '../controller/read';
import { update } from '../controller/update';
import { delet } from '../controller/delet';
import { login, recoverPassword } from '../controller/login';
import { responseHandler } from '../handler/handler';
import { handlresDB } from '../sqz';
import { createMiddleware, deleteMiddleware, loginMiddleware, readMiddleware, recoverMiddleware, updateMiddleware } from '../middleware/middleware';

export const router = express.Router();

router.post('/create', createMiddleware, async (req, res) => {
    const bd = await handlresDB();
    await bd.sync({ force: true });
    responseHandler(await create(req), res);
});

router.get('/read', readMiddleware, async (req, res) => {
    const bd = await handlresDB();
    await bd.sync();
    responseHandler(await read(req), res);
});

router.put('/update', updateMiddleware, async (req, res) => {
    const bd = await handlresDB();
    await bd.sync();
    responseHandler(await update(req), res);
});

router.delete('/delete', deleteMiddleware, async (req, res) => {
    const bd = await handlresDB();
    await bd.sync();
    responseHandler(await delet(req), res);
});

router.get('/newest', async (req, res) => {
    const bd = await handlresDB();
    await bd.sync();
    responseHandler(await readNewest(), res);
});

router.get('/login', loginMiddleware, async (req, res) => {
    const bd = await handlresDB();
    await bd.sync();
    responseHandler(await login(req), res);
});

router.put('/recover', recoverMiddleware, async (req, res) => {
    const bd = await handlresDB();
    await bd.sync();
    responseHandler(await recoverPassword(req), res);
});