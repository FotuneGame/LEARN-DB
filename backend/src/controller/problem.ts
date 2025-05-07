import { Request, Response,NextFunction } from "express";
import dbListProblemsClient from "../db/tables/list_problems_client";
import dbProblems from "../db/tables/problems";
import HandlerError from "../error";



class Problem{
    async add(req:Request, res:Response,next:NextFunction){
        const {id_theme, id_employee, id_answer, id_specialist, name, describe} = req.body;
        if(!Number(id_theme) || !name || !describe)
            return next(HandlerError.internal("problems add:","Bad args! Min state: (id_theme, name, describe)"));

        try{
            const problem = await dbProblems.create({
                id_theme: Number(id_theme),
                id_employee: Number(id_employee) > 0 ? Number(id_employee) : null,
                id_answer: Number(id_answer) > 0 ? Number(id_answer) : null,
                id_specialist: Number(id_specialist) > 0 ? Number(id_specialist) : null,
                name: name,
                describe: describe
            });
            if(!problem)
                return next(HandlerError.internal("problems add:","Cannot add problem"));

            let is_solve = false;
            if(problem[0].id_answer || problem[0].id_employee || problem[0].id_specialist)
                is_solve = true;
            const changeSolve = await dbListProblemsClient.updateSolve(Number(problem[0].id),is_solve);

            res.json({problem: problem, is_solve:is_solve});
        }catch(err){
            return next(HandlerError.internal("problems add:",(err as Error).message));
        }
    }

    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.badRequest("problem get:", "Bad args!"));
        try{
            const problem = await dbProblems.read(Number(id));
            if(!problem)
                return next(HandlerError.badRequest("problem get:", "Cannot get problem with id:"+id));
            res.json({problem:problem});
        }catch(err){
            return next(HandlerError.internal("problem get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("problem list:","Bad args!"));

        try{
            const list = await dbProblems.readAll(false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("problem list:","Cannot get list of problems!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("problem list:",(err as Error).message));
        }
    }

    async listAll(req:Request, res:Response,next:NextFunction){
        try{
            const list = await dbProblems.readAll(true, 1, 0);
            if(!list)
                return next(HandlerError.internal("problem list all:","Cannot get list of problems!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("problem list all:",(err as Error).message));
        }
    }


    async update(req:Request, res:Response,next:NextFunction){
        const {id, id_theme, id_employee, id_answer, id_specialist, name, describe} = req.body;
        if(!Number(id) || !Number(id_theme) || !name || !describe)
            return next(HandlerError.internal("problems update:","Bad args! Min state: (id, id_theme, name, describe)"));
        
        try{
            const problem = await dbProblems.update(Number(id),{
                id_theme: Number(id_theme),
                id_employee: Number(id_employee) > 0 ? Number(id_employee) : null,
                id_answer: Number(id_answer) > 0 ? Number(id_answer) : null,
                id_specialist: Number(id_specialist) > 0 ? Number(id_specialist) : null,
                name: name,
                describe: describe
            });
            if(!problem)
                return next(HandlerError.internal("problems update:","Cannot update problem with id: "+id));

            let is_solve = false;
            if(problem[0].id_answer || problem[0].id_employee || problem[0].id_specialist)
                is_solve = true;
            const changeSolve = await dbListProblemsClient.updateSolve(Number(problem[0].id),is_solve);

            res.json({problem: problem, is_solve: is_solve});
        }catch(err){
            return next(HandlerError.internal("problems update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.internal("problems delete:","Bad args!"));
        
        try{
            const problem = await dbProblems.delete(Number(id));
            if(!problem)
                return next(HandlerError.internal("problems delete:","Cannot delete problem with id: "+id));
            res.json({problem: problem});
        }catch(err){
            return next(HandlerError.internal("problems delete:",(err as Error).message));
        }
    }
}


export default new Problem();