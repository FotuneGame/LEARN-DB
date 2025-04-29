import { Request, Response,NextFunction } from "express";
import dbAnswersByTheme from "../db/tables/answers_by_theme";
import dbAnswers from "../db/tables/answers";
import HandlerError from "../error";



//Использовать answer_by_theme и answer
class Answer{
    async add(req:Request, res:Response,next:NextFunction){
        const {name, discribe, important} = req.body;
        if(!name || !discribe || !important)
            return next(HandlerError.internal("answer add:","Bad args!"));

        try{
            const answer = await dbAnswers.create({
                name:name,
                describe: discribe,
                important: important
            });
            if(!answer)
                return next(HandlerError.internal("answer add:","Cannot add answer!"));
            res.json({answer:answer});

        }catch(err){
            return next(HandlerError.internal("answer add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.internal("answer get:", "Bad args!"));
        try{
            const answer = await dbAnswers.read(Number(id));
            if(!answer)
                return next(HandlerError.internal("answer get:","Cannot add answer with id: "+id));
            res.json({answer:answer});
        }catch(err){
            return next(HandlerError.internal("answer get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("answer list:","Bad args!"));

        try{
            const list = await dbAnswers.readAll(false,Number(limit),Number(offset));
            if(!list)
                return next(HandlerError.internal("answer list:","Cannot get list of answer!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("answer list:",(err as Error).message));
        }
    }

    async listByTheme(req:Request, res:Response,next:NextFunction){
        const {id_theme,limit, offset} = req.query;
        if(!Number(id_theme) || !Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("answer listByTheme:","Bad args!"));

        try{
            const list = await dbAnswersByTheme.readAll(Number(id_theme),false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("answer listByTheme:","Cannot get listByTheme of answer!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("answer listByTheme:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id, name, discribe, important} = req.body;
        if(!Number(id) || !name || !discribe || !important)
            return next(HandlerError.internal("answer update:","Bad args!"));

        try{
            const answer = await dbAnswers.update(Number(id),{
                name:name,
                describe: discribe,
                important: important
            });
            if(!answer)
                return next(HandlerError.internal("answer update:","Cannot update answer with id: "+id));
            res.json({answer:answer});

        }catch(err){
            return next(HandlerError.internal("answer update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.body;
        if(!Number(id))
            return next(HandlerError.internal("answer delete:","Bad args!"));

        try{
            const answer = await dbAnswers.delete(Number(id));
            if(!answer)
                return next(HandlerError.internal("answer delete:","Cannot delete answer with id: "+id));
            res.json({answer:answer});
        }catch(err){
            return next(HandlerError.internal("answer delete:",(err as Error).message));
        }
    }
}


export default new Answer();