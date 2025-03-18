import { Request, Response,NextFunction } from "express";
import dbFindSpam from "../db/functions/find_spam";
import dbSpam from "../db/tables/spam";
import HandlerError from "../error";



class Spam{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("spam add:",(err as Error).message));
        }
    }

    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("spam get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("spam list:",(err as Error).message));
        }
    }


    //use find_spam
    async find(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("spam find:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("spam update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("spam delete:",(err as Error).message));
        }
    }
}


export default new Spam();