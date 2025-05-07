import { Request, Response,NextFunction } from "express";
import dbAnswersByTheme from "../db/tables/answers_by_theme";
import dbEmployeesByTheme from "../db/tables/employees_by_theme";
import dbSpecialistsByTheme from "../db/tables/specialists_by_theme";
import dbFindByTheme from "../db/functions/find_by_theme";
import HandlerError from "../error";


class ThemeAES{

    /*
    id_theme: number
    arr_answers: Array<{id_answer:number, ...}>
    arr_employee: Array<{id_employee:number, ...}>
    arr_specialist: Array<{id_specialist:number, ...}>
    */
    async connection(req:Request, res:Response,next:NextFunction){
        const {id_theme, arr_answers, arr_employee, arr_specialist} = req.body;
        if(!Number(id_theme) || !arr_answers || !arr_employee || !arr_specialist)
            return next(HandlerError.internal("themeAES add:","Bad args!"));
        try{
            let clear = await dbAnswersByTheme.deleteAll(Number(id_theme));
            if(!clear)
                return next(HandlerError.internal("themeAES clear arr_answers:","Cannot clear arr_answers!"));
            for (let i in arr_answers){
                const answers = await dbAnswersByTheme.create({
                    id_theme: Number(id_theme),
                    id_answer: Number(arr_answers[i].id_answer)
                })
                if(!answers)
                    return next(HandlerError.internal("themeAES add arr_answers:","Cannot add arr_answers!"));
            }

            clear = await dbEmployeesByTheme.deleteAll(Number(id_theme));
            if(!clear)
                return next(HandlerError.internal("themeAES clear arr_employee:","Cannot clear arr_employee!"));
            for (let i in arr_employee){
                const employee = await dbEmployeesByTheme.create({
                    id_theme: Number(id_theme),
                    id_employee: Number(arr_employee[i].id_employee)
                })
                if(!employee)
                    return next(HandlerError.internal("themeAES add arr_employee:","Cannot add arr_employee!"));
            }


            clear = await dbSpecialistsByTheme.deleteAll(Number(id_theme));
            if(!clear)
                return next(HandlerError.internal("themeAES clear arr_specialist:","Cannot clear arr_specialist!"));
            for (let i in arr_specialist){
                const specialist = await dbSpecialistsByTheme.create({
                    id_theme: Number(id_theme),
                    id_specialist: Number(arr_specialist[i].id_specialist)
                })
                if(!specialist)
                    return next(HandlerError.internal("themeAES add arr_specialist:","Cannot add arr_specialist!"));
            }

            res.json({id_theme:id_theme, arr_answers:arr_answers, arr_employee:arr_employee, arr_specialist:arr_specialist});
        }catch(err){
            return next(HandlerError.internal("themeAES add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        const {id_theme} = req.query;
        if(!Number(id_theme))
            return next (HandlerError.badRequest("themeAES get:","Bad args!"));
        try{
            const result = await dbFindByTheme.call(Number(id_theme));
            if(!result)
                return next(HandlerError.internal("themeAES get:","Cannot gets!"));
            res.json({answers: result[0].answers, employees:result[0].employees, specialists:result[0].specialists});
        }catch(err){
            return next(HandlerError.internal("themeAES get:",(err as Error).message));
        }
    }
}

export default new ThemeAES();