import { Response } from 'express';

export function responseHandler(data: any, res: Response) {
    if (data.status == 400) erroHandler(data, res);
    else return res.status(data.status).send({ message: data.msg, retorno: data.return });
};

export function erroHandler(erro: any, res: Response) {

    switch (erro.msg) {

        case "create":
            let msg = "Erro ao cadastrar pessoa";
            switch (erro.return) {
                case "Body não pode ser vazio!":
                    erro.status = 406;
                    break;

                default:
                    switch (erro.return.code) {
                        case "ER_DUP_ENTRY":
                            let regex = /\w+(?='$)/;
                            let err = regex.exec(erro.return.sqlMessage);
                            if (err != null) {
                                erro.status = 409;
                                erro.return = `${err[0]} já cadastrado`;
                            };
                            break;

                        case "ER_BAD_NULL_ERROR":
                            regex = /Column '(.+)' cannot be null/;
                            err = regex.exec(erro.return.sqlMessage);
                            if (err != null) {
                                erro.status = 406;
                                erro.return = `Campo ${err[1]} não pode ser vazio`;
                            };
                            break;

                        default:
                            erro.status = 500;
                    }
            }
            res.status(erro.status).send({ message: msg, return: erro.return });
            break;



        case "read":
            msg = "Erro ao procurar cadastro";
            switch (erro.return) {
                case "Deve ser enviado um token atraves do header":
                    erro.status = 406;
                    break;

                case "Cadastro não encontrado":
                    erro.status = 404;
                    break;

                default:
                    switch (erro.return.name) {
                        case "JsonWebTokenError":
                            erro.status = 401;
                            erro.return = "Token invalido";
                            break;

                        case "TokenExpiredError":
                            erro.status = 401;
                            erro.return = "Token expirado, faça login novamente";
                            break;

                        default:
                            erro.status = 500;
                    };
            };
            res.status(erro.status).send({ message: msg, return: erro.return });
            break;



        case "update":
            msg = "Erro ao atualizar cadastro";
            switch (erro.return) {
                case "Deve ser enviado um token atraves do header":
                    erro.status = 406;
                    break;

                case "Cadastro não encontrado":
                    erro.status = 404;
                    break;

                case "Body não pode ser vazio!":
                    erro.status = 406;
                    break;

                default:
                    switch (erro.return.name) {
                        case "JsonWebTokenError":
                            erro.status = 401;
                            erro.return = "Token invalido";
                            break;

                        case "TokenExpiredError":
                            erro.status = 401;
                            erro.return = "Token expirado, faça login novamente";
                            break;

                        default:
                            erro.status = 500;
                    };
            };
            res.status(erro.status).send({ message: msg, return: erro.return });
            break;

        case "delet":
            msg = "Erro ao deletar cadastro"
            switch (erro.return) {
                case "Deve ser enviado um token atraves do header":
                    erro.status = 406;
                    break;

                case "Cadastro não encontrado":
                    erro.status = 404;
                    break;

                default:
                    switch (erro.return.name) {
                        case "JsonWebTokenError":
                            erro.status = 401;
                            erro.return = "Token invalido";
                            break;

                        case "TokenExpiredError":
                            erro.status = 401;
                            erro.return = "Token expirado, faça login novamente";
                            break;

                        default:
                            erro.status = 500;
                    };
            };
            res.status(erro.status).send({ message: msg, return: erro.return });
            break;

        case "newest":
            msg = "Erro ao procurar pessoa mais nova";
            switch (erro.return) {
                case "Banco de dados vazio":
                    erro.status = 404;
                    break;

                default:
                    erro.status = 500;
            }
            res.status(erro.status).send({ message: msg, return: erro.return });
            break;

        case "login":
            msg = "Erro ao fazer login";
            switch (erro.return) {
                case "Body deve conter email e senha":
                    erro.status = 400;
                    break;

                case "Senha errada":
                    erro.status = 418;
                    break;

                case "Email não cadastrado":
                    erro.status = 404;
                    break;

                default:
                    erro.status = 500;
            }
            res.status(erro.status).send({ message: msg, return: erro.return });
            break;

        default:
            res.status(erro.status).send({ message: erro.msg, return: erro.return });
    }
};