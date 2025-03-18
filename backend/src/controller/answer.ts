import { Request, Response,NextFunction } from "express";
import dbAnswersByTheme from "../db/tables/answers_by_theme";
import dbAnswers from "../db/tables/answers";
import HandlerError from "../error";


//Использовать answers_by_theme и answers
class Answer{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("answer add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("answer get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("answer list:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("answer update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("answer delete:",(err as Error).message));
        }
    }
}


export default new Answer();