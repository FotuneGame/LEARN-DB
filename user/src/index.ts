import "dotenv/config";
import express, { Express } from "express";
import cookieParser from 'cookie-parser';
import session from "express-session";
import {ware} from "./middleware/";
import HandlerError from "./error";
import passport from "./passport";
import CustomKafka from "./kafka";
import CustomRedis from "./redis";
import {logger} from "./logs";
import router from "./router";
import sequelize from "./db";
import multer from 'multer';
import path from "path";
import cors from "cors";
import initKafka from "./kafka/init";



const PORT = process.env.PORT || 3002
const ULR_CORS = process.env.URL_CORS?.split(" ") || ["http://localhost"]



const app: Express = express();

// 1. Парсеры должны быть ПЕРВЫМИ
app.use(express.json()); // Для application/json

// 2. Затем остальные middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || ULR_CORS.includes(origin)) {
            callback(null, true);
        } else {
            callback(HandlerError.badRequest("CORS", "Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
}));

app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY || "SALT",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: Number(process.env.MAX_COOCKIE_LIFE) || 60 * 24 * 60 * 60 * 1000
    }
}));

// 3. Статические файлы
app.use("/static", express.static(path.join(__dirname, '..', 'public')));

// 4. Passport и роутеры
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

// 5. Обработчик ошибок - последним
app.use(ware.errorWare);



app.listen(PORT, async ()=>{
    try{
        await initKafka();
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`[user]: User is running at http://localhost:`+PORT);
        logger.info("[user]: User is running PORT: "+PORT);
    }catch(err){
        console.log(`[user]: Error: `, err);
        logger.error("[user]: User is NOT running. Error: "+err);
        await CustomKafka.shutdown();
    }
})