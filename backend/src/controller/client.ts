import { Request, Response,NextFunction } from "express";
import dbClientCallbacks from "../db/representation/clientCallbacks";
import dbClientEmployee from "../db/representation/clientEmployee";
import dbChangeEmployee from "../db/procedures/changeEmployee";
import dbClients from "../db/tables/clients";
import HandlerError from "../error";



class Client{
    async add(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("client add:",(err as Error).message));
        }
    }

    //by id (use veiw clientCallback clientEmployee)
    async get(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("client get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("client list:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("client delete:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("client update:",(err as Error).message));
        }
    }

    //use changeEmployee
    async changeEmployee(req:Request, res:Response,next:NextFunction){
        try{

        }catch(err){
            return next(HandlerError.internal("client changeEmployee:",(err as Error).message));
        }
    }
} 



export default new Client();