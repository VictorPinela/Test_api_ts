import express from 'express';

import { create } from '../controller/create';
import { read, readNewest } from '../controller/read';
import { update } from '../controller/update';
import { delet } from '../controller/delet';
import { login } from '../controller/login';
import { responseHandler } from '../handler/handler';

export const router = express.Router();

router.post('/create', async (req, res) => {
    responseHandler(await create(req), res);
});

router.get('/read', async (req, res) => {
    responseHandler(await read(req), res);
});

router.put('/update', async (req, res) => {
    responseHandler(await update(req), res);
});

router.delete('/delete', async (req, res) => {
    responseHandler(await delet(req), res);
});

router.get('/newest', async (req, res) => {
    responseHandler(await readNewest(), res);
});

router.get('/login', async (req, res) => {
    responseHandler(await login(req), res);
});