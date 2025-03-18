import { Request, Response,NextFunction } from "express";
import dbCallbacks from "../db/tables/callbacks";
import HandlerError from "../error";



class Callbacks{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("callbacks add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("callbacks get:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("callbacks update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("callbacks delete:",(err as Error).message));
        }
    }
}


export default new Callbacks();