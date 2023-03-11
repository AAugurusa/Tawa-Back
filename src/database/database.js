//manejo conexion base de datos
import mysql from "promise-mysql";
import config from "../config";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port,
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};
