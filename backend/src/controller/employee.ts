import { Request, Response,NextFunction } from "express";
import dbEmployeesByTheme from "../db/tables/employees_by_theme";
import dbEmployees from "../db/tables/employees";
import dbFindProblemsByEmployee from "../db/functions/find_problems_by_employee";
import HandlerError from "../error";


//Использовать employees_by_theme и employees
class Employee{
    async add(req:Request, res:Response,next:NextFunction){
        const {first_name, second_name, middle_name, phone , email , post} = req.body;
        if(!first_name || !second_name || !middle_name || !phone || !email || !post)
            return next(HandlerError.internal("employee add:","Bad args!"));
        try{
            const employee = await dbEmployees.create({
                first_name:first_name,
                second_name:second_name,
                middle_name:middle_name,
                phone:phone,
                email:email,
                post:post
            });

            if(!employee)
                return next(HandlerError.internal("employee add:","Cannot add employee!"));
            res.json({employee:employee});
        }catch(err){
            return next(HandlerError.internal("employee add:",(err as Error).message));
        }
    }


    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.internal("employee get:","Bad args!"));

        try{
            const employee = await dbEmployees.read(Number(id));
            if(!employee)
                return next(HandlerError.internal("employee get:","Cannot get employee with id: "+id));

            res.json({employee:employee});
        }catch(err){
            return next(HandlerError.internal("employee get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("employee list:","Bad args!"));

        try{
            const list = await dbEmployees.readAll(false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("employee list:","Cannot get list of employees!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("employee list:",(err as Error).message));
        }
    }

    async listByTheme(req:Request, res:Response,next:NextFunction){
        const {id_theme,limit, offset} = req.query;
        if(!Number(id_theme) || !Number(limit) || (!Number(offset) && Number(offset)<0))
            return next (HandlerError.badRequest("employee listByTheme:","Bad args!"));

        try{
            const list = await dbEmployeesByTheme.readAll(Number(id_theme),false, Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.internal("employee listByTheme:","Cannot get listByTheme of employees!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("employee listByTheme:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id, first_name, second_name, middle_name, phone , email , post} = req.body;
        if(!Number(id) || !first_name || !second_name || !middle_name || !phone || !email || !post)
            return next(HandlerError.internal("employee update:","Bad args!"));
        try{
            const employee = await dbEmployees.update(Number(id),{
                first_name:first_name,
                second_name:second_name,
                middle_name:middle_name,
                phone:phone,
                email:email,
                post:post
            });

            if(!employee)
                return next(HandlerError.internal("employee update:","Cannot update employee with id: "+id));
            res.json({employee:employee});
        }catch(err){
            return next(HandlerError.internal("employee update:",(err as Error).message));
        }
    }

    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.body;
        if(!Number(id))
            return next(HandlerError.internal("employee delete:","Bad args!"));
        try{
            const employee = await dbEmployees.delete(Number(id));

            if(!employee)
                return next(HandlerError.internal("employee delete:","Cannot delete employee with id: "+id));
            res.json({employee:employee});
        }catch(err){
            return next(HandlerError.internal("employee delete:",(err as Error).message));
        }
    }

    async statistics(req:Request, res:Response,next:NextFunction){
        try{
            const stat = await dbEmployees.statics();
            if (!stat)
                return next(HandlerError.badRequest("employee statistics:","Cannot read statistics"));
            res.json({statistics: stat});
        }catch(err){
            return next(HandlerError.internal("employee statistics:",(err as Error).message));
        }
    }


    //find_problems_employe
    async problems(req:Request, res:Response,next:NextFunction){
        const {id_employee} = req.query;
        if(!Number(id_employee))
            return next(HandlerError.badRequest("employee problems:","Bad args!")); 
        try{
            const listProblems = await dbFindProblemsByEmployee.call(Number(id_employee));
            if (!listProblems)
                return next(HandlerError.badRequest("employee problems", "Cannot take propblems for employee with id: "+id_employee));
            res.json({problems:listProblems});
        }catch(err){
            return next(HandlerError.internal("employee problems:",(err as Error).message));
        }
    }

    async login(req:Request, res:Response,next:NextFunction){
        const {email} = req.body;
        const {first_name, second_name, middle_name, phone} = req.body;
        if(!email)
            return next(HandlerError.badRequest("employee login:","Have not email!"));
        if(!first_name || !second_name || !middle_name)
            return next(HandlerError.badRequest("employee login:","Have not args user (first_name, second_name, middle_name)!"));
        try{
            
            let employee = await dbEmployees.readByEmail(email)
            if(!employee)
                return next(HandlerError.badRequest("employee login", "Cannot find array of employees" ));

            if (!employee[0]){
                const list = process.env.ADMIN_EMAILS?.split(" ") || [];
                if(list.includes(email)){
                    employee = await dbEmployees.create({
                        first_name:first_name,
                        second_name:second_name,
                        middle_name:middle_name,
                        phone:phone,
                        email:email,
                        post: "Админ"
                    });
                    if(employee && employee[0]){
                        res.json({employee:employee[0]});
                        return;
                    }else{
                        return next(HandlerError.badRequest("employee login", "Cannot canot create admin employee account" ));
                    }
                }else{
                    return next(HandlerError.badRequest("employee login", "Cannot loggin to employee account" ));
                }
            }else{
                res.json({employee:employee[0]});
            }
        }catch(err){
            return next(HandlerError.internal("employee login:",(err as Error).message));
        }
    }
}


export default new Employee();