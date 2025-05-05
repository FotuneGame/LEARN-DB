import { Request, Response,NextFunction } from "express";
import dbCalls from "../db/tables/calls";
import HandlerError from "../error";



class Call{
    async add(req:Request, res:Response,next:NextFunction){
        const {id_client, phone, date, time} = req.body;
        if(!id_client || !phone || !date || !time)
            return next (HandlerError.badRequest("call add:","Bad args!"));
        
        try{
            const call = await dbCalls.create({
                id_client: id_client,
                phone:phone,
                date: date,
                time: time,
                is_spam: false
            });

            if(!call)
                return next (HandlerError.badRequest("call add:","Cannot add call"));

            res.json({call:call});
        }catch(err){
            return next(HandlerError.internal("call add:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("call list:","Bad args!"));


        try{
            const list = await dbCalls.readAll(false, Number(limit), Number(offset));

            if(!list)
                return next (HandlerError.badRequest("call list:","Cannot get list of calls"));
            
            res.json({list: list});
        }catch(err){
            return next(HandlerError.internal("call list:",(err as Error).message));
        }
    }

    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next (HandlerError.badRequest("call get:","Bad args!"));

        try{
            const call = await dbCalls.read(Number(id));

            if(!call)
                return next (HandlerError.badRequest("call get:","Cannot get call with id: "+id));
            
            res.json({call: call});
        }catch(err){
            return next(HandlerError.internal("call get:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id, id_client, phone, date, time, is_spam} = req.body;
        if( !Number(id) || !id_client || !phone || !date || !time || is_spam===undefined)
            return next (HandlerError.badRequest("call update:","Bad args!"));

        try{
            const newCall = await dbCalls.update(Number(id),{
                id_client: id_client,
                phone: phone,
                date: date,
                time: time,
                is_spam: is_spam
            })

            if(!newCall)
                return next (HandlerError.badRequest("call update:","Cannot update call with id: "+id));

            res.json({call: newCall});
        }catch(err){
            return next(HandlerError.internal("call update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next (HandlerError.badRequest("call delete:","Bad args!"));

        try{
            const call = await dbCalls.delete(Number(id));
            if(!call)
                return next(HandlerError.badRequest("call delete:","Cannot delete call with id: "+id));

            res.json({call:call});
        }catch(err){
            return next(HandlerError.internal("call delete:",(err as Error).message));
        }
    }
}


export default new Call();