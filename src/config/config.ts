import bcrypt from 'bcryptjs';

const _developer = {
    username: "winn_lab_rint",
    password: "rint_lab_winn",
    database: "victor",
    host: "lab.cflraosognjp.sa-east-1.rds.amazonaws.com",
    privateKey: "Teste sequelize em TypeScript",
    salt: bcrypt.genSaltSync(),
    email: "victor_gaah@hotmail.com",
    email_password: "Loko&brizado"
};

const _config = {
    developer: _developer
}

export const config = _config.developer;