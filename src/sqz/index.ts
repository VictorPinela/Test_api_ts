import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from '../../config'

const sqlzOp: SequelizeOptions = {
    host: config.host,
    dialect: "mysql",
    logging: false,
    models: [__dirname + "/models"],
    pool: {
        min: 0,
        max: 1,
        idle: 10000,
        acquire: 30000
    },
};

export const handlresDB = async () => {
    const t0 = new Date().getTime();
    const db = new Sequelize(config.database, config.username, config.password, sqlzOp);
    const t1 = new Date().getTime();

    console.log(t1 - t0);
    return db;
};