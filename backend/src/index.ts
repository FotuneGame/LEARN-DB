import "dotenv/config";
import express, { Express } from "express"; 
import {wares} from "./middleware/";
import cookieParser from 'cookie-parser';
import session from "express-session";
import CustomKafka from "./kafka";
import initKafka from "./kafka/init";
import HandlerError from "./error";
import {poolSync} from "./db";
import router from "./router";
import path from "path";
import cors from "cors";




const PORT = process.env.PORT || 3000
const ULR_CORS = process.env.URL_CORS?.split(" ") || ["http://localhost"]



const app:Express = express();

app.use(express.json()) // Для application/json

app.use(cors({
    origin: function (origin,callback){
        if(!origin || origin && ULR_CORS.includes(origin))
            callback(null,true);
        else
            callback(HandlerError.badRequest("CORS","Not allowed by CORS"));
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

app.use("/static",express.static(path.join(__dirname,'..', 'public')));
app.use("/",router);
app.use(wares.error);



app.listen(PORT, async ()=>{
    try{
        await initKafka();
        poolSync();
        console.log(`[server]: Web-server is running at http://localhost:${PORT}/`);
    }catch(err){
        console.log(`[server]: Error: `, err);
        await CustomKafka.shutdown();
    }
})