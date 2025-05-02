import {Request, Response, NextFunction} from "express";
import CustomKafka from "../kafka";
import {controllers} from "../kafka/controller"
import HandlerError from "../error";



export default async function tokensWare(req:Request, res:Response, next:NextFunction) {
    const access = req.headers.authorization;
    const {refresh} = req.cookies;
    if(!access || !refresh)
        return next(HandlerError.badRequest("[tokensWare]","Bad args!"));

    const token= (access as string).split(" ")[1]; // Bearer token_hash

    try{
        await controllers.Auth.setCallbacks(
            async (parse)=>{
                req.body.email = parse.email;
                next();
            },
            async (err)=>{
                return next(HandlerError.internal("[tokensWare]",err));
            }
        )
        await CustomKafka.send("auth-requests",{
            value:JSON.stringify({
                access: token,
                refresh: refresh
            })
        });
    }catch(err){
        return next(HandlerError.internal("[tokensWare]",(err as Error).message));
    }
}