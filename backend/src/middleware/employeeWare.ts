import {Request, Response, NextFunction} from "express";
import dbEmployees from "../db/tables/employees";
import HandlerError from "../error";



export default async function employeeWare(req:Request, res:Response, next:NextFunction) {
    const {email} = req.body;
    if(!email)
        return next(HandlerError.badRequest("[adminsWare]","Bad args!"));

    try{
        const employee = await dbEmployees.readByEmail(email)
        if (!employee)
            return next(HandlerError.badRequest("[adminsWare]", "Cannot auth to employee account" ));
        req.body.employee = employee[0];
        return next();
    }catch(err){
        return next(HandlerError.internal("[adminsWare]",(err as Error).message));
    }
}