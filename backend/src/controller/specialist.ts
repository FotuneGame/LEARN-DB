import { Request, Response,NextFunction } from "express";
import dbSpecialistsByTheme from "../db/tables/specialists_by_theme";
import dbSpecialists from "../db/tables/specialists";
import HandlerError from "../error";


//Использовать specialists_by_theme и specialists
class Specialist{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("specialist add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("specialist get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("specialist list:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("specialist update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("specialist delete:",(err as Error).message));
        }
    }
}


export default new Specialist();