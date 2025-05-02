import {Request, Response, NextFunction} from "express";
import HandlerError from "../error";



export default async function adminsWare(req:Request, res:Response, next:NextFunction) {
    const {email} = req.body;
    if(!email)
        return next(HandlerError.badRequest("[adminsWare]","Bad args!"));

    const list = process.env.ADMIN_EMAILS?.split(" ") || [];
    if(list.includes(email)){
        return next();
    }else{
        return next(HandlerError.internal("[adminsWare]", "This is not admin email: "+email));
    }
}