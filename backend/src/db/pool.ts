import "dotenv/config";
import { Pool } from "pg";



export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});


/* Для начала создать в базу данных и новго пользователя
CREATE DATABASE learn_db;
CREATE USER my_user WITH ENCRYPTED PASSWORD '12345';
*/

//Grant - для парв на текущие таблицы
//Alter default - для прав для последующих и текущих таблиц
/*
GRANT ALL PRIVILEGES ON DATABASE learn_db TO my_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO my_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO my_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO my_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO my_user;
*/