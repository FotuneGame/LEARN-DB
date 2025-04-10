import { Request, Response,NextFunction } from "express";
import dbFindByTheme from "../db/functions/find_by_theme";
import dbThemes from "../db/tables/themes";
import HandlerError from "../error";



class Theme{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme add:",(err as Error).message));
        }
    }

    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme list:",(err as Error).message));
        }
    }

    //use find_by_theme
    async findResults(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme find:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme delete:",(err as Error).message));
        }
    }

    async statistics(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("theme statistics:",(err as Error).message));
        }
    }
}


export default new Theme();