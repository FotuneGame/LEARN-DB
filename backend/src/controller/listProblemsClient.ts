import { Request, Response,NextFunction } from "express";
import dbListProblemsClient from "../db/tables/list_problems_client"
import HandlerError from "../error";


class ListProblemsClient{


    /*
        id_client:number
        arr_problems: Array<{id:number, name:string, is_solve:boolean}>
    */
    async connection(req:Request, res:Response,next:NextFunction){
        const {id_client, arr_problems} = req.body;
        if(!Number(id_client) || !arr_problems)
            return next(HandlerError.internal("listProblemsClient add:","Bad args!"));
        try{
            const clear = await dbListProblemsClient.deleteAll(Number(id_client));
            if(!clear)
                return next(HandlerError.internal("listProblemsClient clear arr_problems:","Cannot clear arr_problems!"));
            for (let i in arr_problems){
                const answers = await dbListProblemsClient.create({
                    id_client: Number(id_client),
                    id_problem: Number(arr_problems[i].id),
                    is_solve: arr_problems[i].is_solve
                })
                if(!answers)
                    return next(HandlerError.internal("listProblemsClient add arr_problems:","Cannot add arr_problems!"));
            }

            res.json({id_client:id_client, arr_problems:arr_problems});
        }catch(err){
            return next(HandlerError.internal("listProblemsClient add:",(err as Error).message));
        }
    }


    
    async get(req:Request, res:Response,next:NextFunction){
        const {id_client} = req.query;
        if(!Number(id_client))
            return next (HandlerError.badRequest("listProblemsClient get:","Bad args!"));
        try{
            const problems = await dbListProblemsClient.findAllByIdClient(Number(id_client));
            if(!problems)
                return next(HandlerError.internal("listProblemsClient get:","Cannot gets!"));
            res.json({problems: problems});
        }catch(err){
            return next(HandlerError.internal("listProblemsClient get:",(err as Error).message));
        }
    }
}

export default new ListProblemsClient();