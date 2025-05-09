import { Sequelize } from "sequelize-typescript";

import { User } from "./models/User";
import { MetaUser } from "./models/MetaUser";

/*
"target": "es6", // или более поздняя версия ECMAScript
"experimentalDecorators": true,
"emitDecoratorMetadata": true
*/

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres', 
    models: [__dirname  + "/models/**/*.ts"],
  });


sequelize.addModels([User,MetaUser])
  
export default sequelize;