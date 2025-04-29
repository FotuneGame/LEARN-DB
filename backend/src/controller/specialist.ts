import { Request, Response,NextFunction } from "express";
import dbSpecialistsByTheme from "../db/tables/specialists_by_theme";
import dbSpecialists from "../db/tables/specialists";
import HandlerError from "../error";


//Использовать specialists_by_theme и specialists
class Specialist{
    async add(req:Request, res:Response,next:NextFunction){
        const {first_name, middle_name, second_name, phone, email, adress, profession} = req.body;
        if(!first_name || !middle_name || !second_name || !phone || !email || !adress || !profession)
            return next(HandlerError.internal("specialist add:","Bad args!"));
        try{
            const specialist = await dbSpecialists.create({
                first_name:first_name,
                second_name:second_name,
                middle_name:middle_name,
                phone:phone,
                email:email,
                adress:adress,
                profession:profession
            });
            if(!specialist)
                return next(HandlerError.badRequest("specialist add:","Cannot add specialst!"));
            res.json({specialist:specialist});
        }catch(err){
            return next(HandlerError.internal("specialist add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.badRequest("specialist get:", "Bad args!"));
        try{
            const specialist = await dbSpecialists.read(Number(id));
            if(!specialist)
                return next(HandlerError.badRequest("specialist get:", "Cannot get specialist with id:"+id));
            res.json({specialist:specialist});
        }catch(err){
            return next(HandlerError.internal("specialist get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("specialist list:","Bad args!"));

        try{
            const list = await dbSpecialists.readAll(false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("specialist list:","Cannot get list of specialists!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("specialist list:",(err as Error).message));
        }
    }

    async listByTheme(req:Request, res:Response,next:NextFunction){
        const {id_theme,limit, offset} = req.query;
        if(!Number(id_theme) || !Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("specialist listByTheme:","Bad args!"));

        try{
            const list = await dbSpecialistsByTheme.readAll(Number(id_theme),false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("specialist listByTheme:","Cannot get listByTheme of specialists!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("specialist listByTheme:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id, first_name, middle_name, second_name, phone, email, adress, profession} = req.body;
        if(!Number(id) || !first_name || !middle_name || !second_name || !phone || !email || !adress || !profession)
            return next(HandlerError.internal("specialist update:","Bad args!"));
        try{
            const specialist = await dbSpecialists.update(Number(id),{
                first_name:first_name,
                second_name:second_name,
                middle_name:middle_name,
                phone:phone,
                email:email,
                adress:adress,
                profession:profession
            });
            if(!specialist)
                return next(HandlerError.badRequest("specialist update:","Cannot update specialst with id: "+ id));
            res.json({specialist:specialist});
        }catch(err){
            return next(HandlerError.internal("specialist update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.body;
        if(!Number(id))
            return next(HandlerError.internal("specialist delete:","Bad args!"));
        try{
            const specialist = await dbSpecialists.delete(Number(id));
            if(!specialist)
                return next(HandlerError.badRequest("specialist delete:","Cannot delete specialst with id: "+ id));
            res.json({specialist:specialist});
        }catch(err){
            return next(HandlerError.internal("specialist delete:",(err as Error).message));
        }
    }

    async statistics(req:Request, res:Response,next:NextFunction){
        try{
            const stat = await dbSpecialists.statics();
            if (!stat)
                return next(HandlerError.badRequest("specialist statistics:","Cannot read statistics"));
            res.json({statistics: stat});
        }catch(err){
            return next(HandlerError.internal("specialist statistics:",(err as Error).message));
        }
    }
}


export default new Specialist();