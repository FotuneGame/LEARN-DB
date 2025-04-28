import {Request, Response, NextFunction} from "express";
import { MetaUser } from "../models/MetaUser";
import { User } from "../models/User";
import HandlerError from "../error";
import {generateJWT} from "../utils";
import sequelize from "../db";



class GitHubController{

     async sign(req:Request, res:Response, next:NextFunction) {
        // Проверка аутентификации
        if (!req.isAuthenticated()) {
            res.redirect(
                `${process.env.URL_OAUTH}?` +
                `error=user_is_not_authed` +
                `app=github`
            )
        }
    
        // Получаем данные пользователя
        const { displayName, email } = req.user as any;
        const adress = req.header('x-forwarded-for') || req.ip;
        
        if (!displayName || !email) {
            res.redirect(
                `${process.env.URL_OAUTH}?` +
                `error=bad_args` +
                `app=github`
            )
        }


        const trans = await sequelize.transaction();
    
        try{
            let user = await User.findOne({where:{email: email}});
            if(!user)
                user = await User.create({email: email, first_name:displayName, second_name: 'Не указана', middle_name: 'Не указана', social: "github"}, { transaction: trans });
            
            let metaUser = await MetaUser.findOne({where:{userId:user.id}});
            if(!metaUser)
                metaUser = await MetaUser.create({userId:user.id, lastPlaceIn: adress, lastTimeIn: new Date().toDateString()}, { transaction: trans });


            await trans.commit();
            
            const access = generateJWT({id:user.id,name:displayName,password:user.password, email:user.email}, false);
            const refresh = generateJWT({id:user.id,name:displayName,password:user.password, email:user.email}, true);
    
            res.cookie("refresh",refresh,{httpOnly: false, secure: false, signed: false});
            res.redirect(
                `${process.env.URL_OAUTH}?` +
                `access=${access}&` +
                `user=${encodeURIComponent(JSON.stringify(user))}`
            )
        }catch(err){
            await trans.rollback();
            res.redirect(
                `${process.env.URL_OAUTH}?` +
                `error=${(err as Error).message}` +
                `app=github`
            )
        }
    }
}


export default new GitHubController();