import { Request, Response,NextFunction } from "express";
import dbEmployeesByTheme from "../db/tables/employees_by_theme";
import dbEmployees from "../db/tables/employees";
import HandlerError from "../error";


//Использовать employees_by_theme и employees
class Employee{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee list:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee delete:",(err as Error).message));
        }
    }

    async statistics(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee statistics:",(err as Error).message));
        }
    }


    //find_problems_employe
    async problems(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("employee problems:",(err as Error).message));
        }
    }
}


export default new Employee();