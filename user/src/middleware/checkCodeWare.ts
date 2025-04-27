import {Request, Response, NextFunction} from "express";
import {CodeRedisType} from "../utils/types";
import HandlerError from "../error";
import redis from "../redis";



export default async function checkCodeWare(req:Request, res:Response, next:NextFunction) {
    const {email, code} = req.body;
    if(!email || !code)
        return next(HandlerError.badRequest("[checkCodeWare]", "Bad args!"));

    try{
        const data = email;
        const data_cash = (await redis.get(data)) as CodeRedisType;
        if(!data_cash.code)
            return next(HandlerError.internal("[checkCodeWare]","Have NOT code in redis!"));
        if(code != data_cash.code)
            return next(HandlerError.internal("[checkCodeWare]",`Code is not equals!`));

        const time = new Date(new Date(data_cash.time).getTime() - Date.now());
        const limitMinute = Number(process.env.CODE_CONFIRM_ACTIVITY_MINUNTE) ?? 15; 
        if(time.getMinutes() >= limitMinute)
            return next(HandlerError.internal("[checkCodeWare]","Code is too old!"));

        await redis.set(data, "confirm", "1");
        req.body.codeType = data_cash.type;
        return next();
    }catch(err){
        return next(HandlerError.internal("[checkCodeWare]",(err as Error).message));
    }
}