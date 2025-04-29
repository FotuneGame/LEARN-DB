import "dotenv/config";
import express, { Express } from "express"; 
import {wares} from "./middleware/";
import HandlerError from "./error";
import {poolSync} from "./db";
import router from "./router";
import path from "path";
import cors from "cors";




const PORT = process.env.PORT || 3000
const ULR_CORS = process.env.URL_CORS?.split(" ") || ["http://localhost:3000","https://localhost:3000"]



const app:Express = express();
app.use(cors({
    origin: function (origin,callback){
        if(!origin || origin && ULR_CORS.includes(origin))
            callback(null,true);
        else
            callback(HandlerError.badRequest("CORS","Not allowed by CORS"));
    },
    allowedHeaders:['Authorization','Content-Type']
}));
app.use(express.json())
app.use("/static",express.static(path.join(__dirname,'..', 'public')));
app.use("/",router);
app.use(wares.error);



app.listen(PORT, ()=>{
    poolSync();
    console.log(`[server]: Web-server is running at http://localhost:${PORT}/`);
})