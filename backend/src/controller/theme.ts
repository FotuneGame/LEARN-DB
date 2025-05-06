import { Request, Response,NextFunction } from "express";
import dbFindByTheme from "../db/functions/find_by_theme";
import dbThemes from "../db/tables/themes";
import HandlerError from "../error";



class Theme{
    async add(req:Request, res:Response,next:NextFunction){
        const {name} = req.body;
        if(!name)
            return next(HandlerError.internal("theme add:","Bad args!"));
        try{
            const theme = await dbThemes.create({
                name: name
            });
            if(!theme)
                return next(HandlerError.internal("theme add:","Cannot add theme!"));
            res.json({theme:theme});
        }catch(err){
            return next(HandlerError.internal("theme add:",(err as Error).message));
        }
    }

    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.badRequest("theme get:", "Bad args!"));
        try{
            const theme = await dbThemes.read(Number(id));
            if(!theme)
                return next(HandlerError.badRequest("theme get:", "Cannot get theme with id:"+id));
            res.json({theme:theme});
        }catch(err){
            return next(HandlerError.internal("theme get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("theme list:","Bad args!"));

        try{
            const list = await dbThemes.readAll(false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("theme list:","Cannot get list of themes!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("theme list:",(err as Error).message));
        }
    }

    async listAll(req:Request, res:Response,next:NextFunction){
        try{
            const list = await dbThemes.readAll(true, 1, 0);
            if(!list)
                return next(HandlerError.internal("theme list all:","Cannot get list of themes!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("theme list all:",(err as Error).message));
        }
    }

    //use find_by_theme
    async findResults(req:Request, res:Response,next:NextFunction){
        const {id_theme} = req.query;
        if(!Number(id_theme))
            return next (HandlerError.badRequest("theme find:","Bad args!"));
        try{
            const result = await dbFindByTheme.call(Number(id_theme));
            if(!result)
                return next(HandlerError.internal("theme find:","Cannot finds!"));
            res.json({result:result});
        }catch(err){
            return next(HandlerError.internal("theme find:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id, name} = req.body;
        if(!Number(id) || !name)
            return next(HandlerError.internal("theme update:","Bad args!"));
        try{
            const theme = await dbThemes.update(Number(id),{
                name: name
            });
            if(!theme)
                return next(HandlerError.internal("theme update:","Cannot update theme with id: "+id));
            res.json({theme:theme});
        }catch(err){
            return next(HandlerError.internal("theme update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.internal("theme delete:","Bad args!"));
        try{
            const theme = await dbThemes.delete(Number(id));
            if(!theme)
                return next(HandlerError.internal("theme delete:","Cannot delete theme with id: "+id));
            res.json({theme:theme});
        }catch(err){
            return next(HandlerError.internal("theme delete:",(err as Error).message));
        }
    }

    async statistics(req:Request, res:Response,next:NextFunction){
        try{
            const stat = await dbThemes.statics();
            if (!stat)
                return next(HandlerError.badRequest("theme statistics:","Cannot read statistics"));
            res.json({statistics: stat});
        }catch(err){
            return next(HandlerError.internal("theme statistics:",(err as Error).message));
        }
    }
}


export default new Theme();