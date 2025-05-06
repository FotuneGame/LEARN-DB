import { Request, Response,NextFunction } from "express";
import dbClientCallbacks from "../db/representation/clientCallbacks";
import dbClientEmployee from "../db/representation/clientEmployee";
import dbChangeEmployee from "../db/procedures/changeEmployee";
import dbClients from "../db/tables/clients";
import HandlerError from "../error";



class Client{
    async add(req:Request, res:Response,next:NextFunction){

        const {id_employee, first_name, second_name, middle_name} = req.body;
        if(!Number(id_employee) || !first_name || !second_name || !middle_name)
            return next(HandlerError.badRequest("client add:","Bad args!"));

        try{
            const client = await dbClients.create({
                id_employee: id_employee,
                first_name: first_name,
                second_name: second_name,
                middle_name: middle_name
            })

            if(!client)
                return next(HandlerError.badRequest("client add:", "Cannot add client!"));

            res.json({client: client});
        }catch(err){
            return next(HandlerError.internal("client add:",(err as Error).message));
        }
    }

    //by id (use veiw clientCallback clientEmployee)
    async get(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        console.log(id)
        if(!Number(id))
            return next(HandlerError.badRequest("client get:", "Bad args!"));
        try{
            const client = await dbClients.read(Number(id));
            const callback = await dbClientCallbacks.read(Number(id));
            const employe = await dbClientEmployee.read(Number(id));

            if(!client)
                return next(HandlerError.badRequest("client get:", "Cannot get client with id: "+id));

            res.json({
                client: client,
                callback: callback,
                employe: employe
            })
        }catch(err){
            return next(HandlerError.internal("client get:",(err as Error).message));
        }
    }

    async list(req:Request, res:Response,next:NextFunction){
        const {limit, offset} = req.query;
        if(!Number(limit) || (!Number(offset) && Number(offset)<0))
            return next(HandlerError.badRequest("client list:", "Bad args!"));

        try{
            const list = await dbClients.readAll(false,Number(limit), Number(offset));
            if(!list)
                return next(HandlerError.badRequest("client list:", "Cannot get list of clients!"));

            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("client list:",(err as Error).message));
        }
    }
    

    
    async listAll(req:Request, res:Response,next:NextFunction){
        try{
            const list = await dbClients.readAll(true, 1, 0);
            if(!list)
                return next(HandlerError.internal("client list all:","Cannot get list of clientS!"));
            res.json({list:list});
        }catch(err){
            return next(HandlerError.internal("client list all:",(err as Error).message));
        }
    }


    async delete(req:Request, res:Response,next:NextFunction){
        const {id} = req.query;
        if(!Number(id))
            return next(HandlerError.badRequest("client delete:", "Bad args!"));

        try{
            const client = await dbClients.delete(Number(id));

            if(!client)
                return next(HandlerError.badRequest("client delete:", "Cannot delete client with id: "+id));

            res.json({client:client});
        }catch(err){
            return next(HandlerError.internal("client delete:",(err as Error).message));
        }
    }

    async update(req:Request, res:Response,next:NextFunction){
        const {id, id_employee, first_name, second_name, middle_name} = req.body;
        if(!Number(id) || !Number(id_employee) || !first_name || !second_name || !middle_name)
            return next(HandlerError.badRequest("client update:","Bad args!"));

        try{
            const client = await dbClients.update(Number(id),{
                id_employee: id_employee,
                first_name: first_name,
                second_name: second_name,
                middle_name: middle_name
            })

            if(!client)
                return next(HandlerError.badRequest("client update:", "Cannot update client with id: "+ id));

            res.json({client: client});
        }catch(err){
            return next(HandlerError.internal("client update:",(err as Error).message));
        }
    }

    //use changeEmployee
    async changeEmployee(req:Request, res:Response,next:NextFunction){
        const {id_client, employe_first_name, employe_second_name, employe_middle_name} = req.body;
        if(!Number(id_client) || !employe_first_name || !employe_middle_name || !employe_second_name)
            return next(HandlerError.badRequest("client changeEmploye", "Bad args!"));

        try{
            const result = await dbChangeEmployee.call(Number(id_client), employe_first_name, employe_middle_name, employe_second_name);
            res.json({isChange:result});
        }catch(err){
            return next(HandlerError.internal("client changeEmployee:",(err as Error).message));
        }
    }
} 



export default new Client();