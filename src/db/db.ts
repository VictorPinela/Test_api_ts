import mysql from 'promise-mysql';

let connected: boolean = false;
let db: mysql.Connection;

export async function conectDb() {
    if (!connected) {

        db = await mysql.createConnection({
            host: 'lab.cflraosognjp.sa-east-1.rds.amazonaws.com',
            user: 'winn_lab_rint',
            password: 'rint_lab_winn',
            database: "victor"
        });

        console.log("Banco conectado com sucesso");

        connected = true;
    }
    else {
        console.log("Conexão ja existente");
    };
    return db;
};

export async function closeDb() {
    if (connected) {
        await db.end().then(() => {
            console.log("Banco encerrado");
            connected = false;
        });
    }
};