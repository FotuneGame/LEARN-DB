import { Request, Response,NextFunction } from "express";
import dbCallbacks from "../db/tables/callbacks";
import HandlerError from "../error";



class Callbacks{
    async add(req:Request, res:Response,next:NextFunction){
        const {id_problem, phone, client_email} = req.body;
        if(!Number(id_problem) || !phone || !client_email)
            return next(HandlerError.badRequest("callbacks add:", "Bad args!"));

        try{
            const callback = await dbCallbacks.create({
                id_problem: id_problem,
                phone:phone,
                email:client_email
            });

            if(!callback)
                return next(HandlerError.badRequest("callbacks add:","Cannot add callbacks!"));

            res.json({callback:callback});
        }catch(err){
            return next(HandlerError.internal("callbacks add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.badRequest("callbacks get:", "Bad args!"));

        try{
            const callback =  await dbCallbacks.read(Number(id));
            if(!callback)
                return next(HandlerError.badRequest("callbacks get:","Cannot get callback with id: "+id));

            res.json({callback:callback});
        }catch(err){
            return next(HandlerError.internal("callbacks get:",(err as Error).message));
        }
    }

    async getByIdProblem(req:Request, res:Response,next:NextFunction){
        const {id_problem} = req.query;
        if(!Number(id_problem))
            return next(HandlerError.badRequest("callbacks getByIdProblem:", "Bad args!"));

        try{
            const callback =  await dbCallbacks.readByIdProblem(Number(id_problem));
            if(!callback)
                return next(HandlerError.badRequest("callbacks getByIdProblem:","Cannot get callback with id_problem: "+id_problem));

            res.json({callback:callback});
        }catch(err){
            return next(HandlerError.internal("callbacks getByIdProblem:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id,id_problem, phone, client_email} = req.body;
        if(!Number(id) || !Number(id_problem) || !phone || !client_email)
            return next(HandlerError.badRequest("callbacks update:", "Bad args!"));

        try{
            const callback = await dbCallbacks.update(Number(id),{
                id_problem: id_problem,
                phone:phone,
                email:client_email
            });

            if(!callback)
                return next(HandlerError.badRequest("callbacks update:","Cannot update callbacks with id: "+id));

            res.json({callback:callback});
        }catch(err){
            return next(HandlerError.internal("callbacks update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.badRequest("callbacks delete:", "Bad args!"));

        try{
            const callback = await dbCallbacks.delete(Number(id));

            if(!callback)
                return next(HandlerError.badRequest("callbacks delete:","Cannot delete callbacks with id: "+id));

            res.json({callback:callback});
        }catch(err){
            return next(HandlerError.internal("callbacks delete:",(err as Error).message));
        }
    }
}


export default new Callbacks();