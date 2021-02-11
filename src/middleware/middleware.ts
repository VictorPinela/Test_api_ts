import express from 'express';

import { validateBody, validateAddress, validatePassword, validateDate, validateToken } from '../controller/validate';
import { responseHandler } from '../handler/handler';


export async function createMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        validateBody(req);
        await validateAddress(req);
        await validatePassword(req);
        validateDate(req);
        next();
    } catch (err) {
        responseHandler({ status: 500, return: err }, res);
    };
};

export async function readMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await validateToken(req);
        next();
    } catch (err) {
        responseHandler({ status: 500, return: err }, res);
    };
};

export async function updateMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await validateToken(req);
        validateBody(req);
        if (req.body.senha) await validatePassword(req);
        if (req.body.cep && req.body.numero) await validateAddress(req);
        next();
    } catch (err) {
        responseHandler({ status: 500, return: err }, res);
    };
};

export async function deleteMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await validateToken(req);
        next();
    } catch (err) {
        responseHandler({ status: 500, return: err }, res);
    };
};

export async function loginMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        validateBody(req);
        next();
    } catch (err) {
        responseHandler({ status: 500, return: err }, res);
    };
};

export async function recoverMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        validateBody(req);
        next();
    } catch (err) {
        responseHandler({ status: 500, return: err }, res);
    };
};