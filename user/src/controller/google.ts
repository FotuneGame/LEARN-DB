import {Request, Response, NextFunction} from "express";
import { MetaUser } from "../models/MetaUser";
import { User } from "../models/User";
import {generateJWT} from "../utils";
import HandlerError from "../error";
import sequelize from "../db";



class GoogleController{

     async sign(req:Request, res:Response, next:NextFunction) {
        const data:any = req.user;

        if(!(data))
            return next(HandlerError.badRequest("[GoogleController sign]", "Bad args!"));

        const trans = await sequelize.transaction();
    
        try{
            const name = data.displayName;
            let user = await User.findOne({where:{name,social:"google"}});
            if(!user)
                user = await User.create({first_name:name, social: "google"}, { transaction: trans });
            
            let metaUser = await MetaUser.findOne({where:{userId:user.id}});
            if(!metaUser)
                metaUser = await MetaUser.create({userId:user.id, lastPlaceIn: "google", lastTimeIn: new Date().toDateString()}, { transaction: trans });
    

            await trans.commit();
            
            const access = generateJWT({id:user.id,name:name,password:user.password, email:user.email}, false);
            const refresh = generateJWT({id:user.id,name:name,password:user.password, email:user.email}, true);
    
            res.cookie("refresh",refresh,{httpOnly: false, secure: false, signed: false});
            res.json({access,user:user, metaUser:metaUser});
            
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[GoogleController sign]",(err as Error).message));
        }
    }


    
    async fail(req:Request, res:Response, next:NextFunction) {
        res.json({sign:false});
    }
}


export default new GoogleController();