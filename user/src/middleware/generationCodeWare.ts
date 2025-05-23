import {Request, Response, NextFunction} from "express";
import {CodeType} from "../utils/types";
import HandlerError from "../error";
import { codeGen } from "../utils";
import redis from "../redis";



export default async function generationCodeWare(req:Request, res:Response, next:NextFunction) {
    const {email, type} = req.body;
    
    if(!email || !type)
        return next(HandlerError.badRequest("[generationCodeWare]", "Bad args!"));
    try{
        const data = email;
        const code = codeGen(6);
        req.body.code = code;
        if(process.env.TEST_EMAIL!=='' && process.env.TEST_EMAIL==email)
            await redis.set(data,"code",process.env.TEST_CODE+"" || "123456")
        else
            await redis.set(data, "code", code);
        await redis.set(data, "time", new Date().getTime().toString());
        await redis.set(data, "confirm", "0");
        await redis.set(data, "type", (type as CodeType).toString());
        req.body.codeType = type as CodeType;
        return next();
    }catch(err){
        return next(HandlerError.internal("[generationCodeWare]",(err as Error).message));
    }
}