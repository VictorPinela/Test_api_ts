import { errorHandler, middlewareHandler, responseHandler } from '../src/handler/handler';
import { delet } from '../src/controller/delet'
import { update } from '../src/controller/update'
import { create } from '../src/controller/create'
import { read, readNewest } from '../src/controller/read'
import { people } from '../src/interface/interface';
import { validateInput, validateId } from '../src/controller/validate';
import { bank } from '../src/router/router';
import express, { NextFunction } from 'express';

const res: any = {
  send: jest.fn(),
  locals: jest.fn(),
  status: jest.fn((code) => { return res }),
}

const next = jest.fn();


describe('Handler', () => {

  test('responseHandler', () => {
    let resposta: any = { status: 404, msg: "Teste erro", return: "erro" };
    responseHandler(resposta, res)
    expect(res.status).toBeCalledWith(404);
    resposta = { status: 200, msg: "Teste" }
    responseHandler(resposta, res)
    expect(res.status).toBeCalledWith(200);
  });

  test('errorHandler', () => {
    let resposta: any = { status: 404, msg: "Teste erro", return: "erro" };
    errorHandler(resposta, res);
    expect(res.status).toBeCalledWith(404);
  });
});


describe("Validação", () => {

  test('validateId', () => {
    let id = "123";
    expect(() => validateId(id)).toThrow();
    id = "a1109190-5e59-11eb-915b-01c08cd2d91e";
    expect(() => validateId(id)).not.toThrow();
  });

  test('validateInput', () => {
    let pessoa: any = { name: "", age: undefined };
    expect(() => validateInput(pessoa)).toThrow();
    pessoa.name = "234";
    expect(() => validateInput(pessoa)).toThrow();
    pessoa.name = "victor";
    expect(() => validateInput(pessoa)).toThrow();
    pessoa.age = "sdv 12";
    expect(() => validateInput(pessoa)).toThrow();
    pessoa.age = 12;
    expect(() => validateInput(pessoa)).toThrow();
    pessoa.age = 23;
    expect(() => validateInput(pessoa)).not.toThrow();
  });
});

describe('Funções', () => {
  afterEach(() => {
    while (bank.length) {
      bank.pop();
    };
  });

  test('delet', () => {
    let id = "222";
    bank.push({ id: "123", name: "victor", age: 23 });
    let teste = delet(id);
    expect(teste.status).toBe(404);
    expect(teste.msg).toEqual("Pessoa não encontada");
    id = "123";
    teste = delet(id);
    expect(teste.status).toBe(200);
    expect(teste.msg).toEqual("Cadastro deletado com sucesso");
    expect(teste.return).toEqual([{ id: "123", name: "victor", age: 23 }]);
    expect(bank).toStrictEqual([]);
  });

  test('update', () => {
    bank.push({ id: "123", name: "victor", age: 23 });
    let id = "222";
    let mod = ({ name: "renato", age: 32 });
    let teste = update(id, mod);
    expect(teste.status).toBe(304);
    expect(teste.msg).toEqual("Falha ao tentar editar pessoa");
    id = "123";
    teste = update(id, mod);
    expect(teste.status).toBe(200);
    expect(teste.msg).toEqual("Pessoa editada com sucesso");
    expect(bank[0]).toEqual({ id: "123", name: "renato", age: 32 });
  });

  test('create', () => {
    let mod = { name: "victor", age: 23 };
    let teste = create(mod);
    expect(teste.status).toBe(201);
    expect(teste.msg).toEqual("Cadastro criado com sucesso");
    expect(bank[0].name).toEqual("victor");
    expect(bank[0].age).toBe(23);

  });

  test('read', () => {
    bank.push({ id: "123", name: "victor", age: 23 });
    let id = "222"
    let teste1 = read(id, false);
    let teste2 = read(id, true);
    expect(teste1.status).toBe(404);
    expect(teste1.msg).toEqual("Pessoa não encontrada");
    expect(teste2.status).toBe(404);
    expect(teste2.msg).toEqual("Pessoa não encontrada");
    id = "123"
    teste1 = read(id, false);
    teste2 = read(id, true);
    expect(teste1.status).toBe(302);
    expect(teste1.msg).toEqual("Pessoa encontrada");
    expect(teste1.return).toEqual({ id: "123", name: "victor", age: 23 });
    expect(teste2.status).toBe(302);
    expect(teste2.msg).toEqual("Pessoa encontrada");
    expect(teste1.return).toEqual({ id: "123", name: "victor", age: 23 });

  });

  test('searchNewest', () => {
    bank.push({ id: "123", name: "victor", age: 23 });
    bank.push({ id: "548", name: "gabriel", age: 21 });
    bank.push({ id: "221", name: "renato", age: 32 });
    let teste = readNewest();
    expect(teste.status).toBe(302);
    expect(teste.msg).toEqual("Pessoa mais nova encontrada");
    expect(teste.return).toEqual({ id: "548", name: "gabriel", age: 21 });
  });
});

describe('routes', () => {

  beforeAll(() => {
    res.locals.teste = true;
  })

  beforeEach(() => {
    res.status.mockClear();
    res.send.mockClear();
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('/', () => {
    const express = require('express');
    const router = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    jest.spyOn(express, 'Router').mockImplementation(() => router);
    let req: any = { query: { id: "a1109190-5e59-11eb-915b-01c08cd2d91e" } };
    res.locals.fakeUrl = "/";
    router.get.mockImplementation((path, callback) => {
      if (path === '/') {
        callback(middlewareHandler(req, res, next), (res));
      }
    });
    require('../src/app/router/router');
    expect(res.status).toBeCalledWith(404);
  });

  it('/create', () => {
    const express = require('express');
    const router = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    jest.spyOn(express, 'Router').mockImplementation(() => router);
    let req: any = { body: { name: "victor", age: 23 } };
    res.locals.fakeUrl = "/create";
    router.post.mockImplementation((path, callback) => {
      if (path === '/create') {
        callback(middlewareHandler(req, res, next), (res));
      }
    });
    require('../src/app/router/router');
    expect(res.status).toBeCalledWith(201);
  });

  it('/newest', () => {
    const express = require('express');
    const router = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    res.locals.fakeUrl = "/newest";
    jest.spyOn(express, 'Router').mockImplementationOnce(() => router);
    const req: any = { query: { id: "a1109190-5e59-11eb-915b-01c08cd2d91e" } };
    router.get.mockImplementation((path, callback) => {
      if (path === '/newest') {
        callback(middlewareHandler(req, res, next), res)
      }
    });
    require('../src/app/router/router');
    expect(res.status).toBeCalledWith(404);
  });

  it('/update', () => {
    const express = require('express');
    const router = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    res.locals.fakeUrl = "/update";
    jest.spyOn(express, 'Router').mockImplementationOnce(() => router);
    const req: any = {
      query: { id: "a1109190-5e59-11eb-915b-01c08cd2d91e" },
      body: { name: "victor", age: 23 }
    };
    router.put.mockImplementation((path, callback) => {
      if (path === '/update') {
        callback(middlewareHandler(req, res, next), res)
      }
    });
    require('../src/app/router/router');
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('/delete', () => {
    const express = require('express');
    const router = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
    res.locals.fakeUrl = "/delete";
    jest.spyOn(express, 'Router').mockImplementationOnce(() => router);
    const req: any = { query: { id: "a1109190-5e59-11eb-915b-01c08cd2d91e" } };
    router.delete.mockImplementation((path, callback) => {
      if (path === '/delete') {
        callback(middlewareHandler(req, res, next), res)
      }
    });
    require('../src/app/router/router');
    expect(res.status).toHaveBeenCalledWith(404);
  });
});