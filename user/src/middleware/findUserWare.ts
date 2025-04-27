import {Request, Response, NextFunction} from "express";
import { User } from "../models/User";
import HandlerError from "../error";



export default async function findUserWare(req:Request, res:Response, next:NextFunction){

    const {email} = req.body;
    const id = req.body.tokens?.body?.id;
    if(!(email || id))
        return next();

    try{
        let userFind = null;
        if(!Number(id)){
            userFind = await User.findOne({
                where:{email:email}
            });
        }else{
            userFind = await User.findOne({where:{id}});
        }

        if(userFind)
            req.body.user = userFind;

        return next();
    }catch(err){
        return next(HandlerError.badRequest("[findUserWare]", (err as Error).message));
    }
}