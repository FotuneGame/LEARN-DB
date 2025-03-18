import { Request, Response,NextFunction } from "express";
import dbCalls from "../db/tables/calls";
import HandlerError from "../error";



class Call{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("call add:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("call list:",(err as Error).message));
        }
    }

    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("call get:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("call update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("call delete:",(err as Error).message));
        }
    }
}


export default new Call();