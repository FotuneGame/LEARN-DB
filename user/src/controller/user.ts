import {Request, Response, NextFunction} from "express";
import {generateJWT, generateHash, equalsHash, loadAvatar} from "../utils";
import validator from "validator";

import { User } from "../models/User";
import { MetaUser } from "../models/MetaUser";
import { sendEmail } from "../email";
import HandlerError from "../error";
import sequelize from "../db";
import { CodeType } from "@/utils/types";



class UserController{


    async get(req:Request, res:Response, next:NextFunction){
        const {id} = req.params;
        if(!Number(id))
            return next(HandlerError.badRequest("[User get]","Bad id!"));

        try{
            const user = await User.findOne({where: {id}});
            const metaUser = await MetaUser.findOne({where: {userId:id}});
            if(user)
                user.password="";
            res.json({user:user, metaUser:metaUser});
        }catch(err){
            return next(HandlerError.internal("[User get]",(err as Error).message));
        }
    }



    async login(req:Request, res:Response, next:NextFunction){
        const {password, email, adress, date, codeType} = req.body;
        const {user} = req.body;
        let {metaUser} = req.body;
        
        if(!password || !(email) || !adress || !date)
            return next(HandlerError.badRequest("[User login]","Bad args!"));
        if(!user)
            return next(HandlerError.badRequest("[User login]","Have not this user!"));
        if(!(validator.isEmail(email)|| !(new Date(date)) || !validator.isIP(adress)))
            return next(HandlerError.badRequest("[User login]","Bad args, not validating!"));
        if(!codeType && (codeType as CodeType)==="auth")
            return next(HandlerError.badRequest("[User login]","This is not 'auth' confirm type!"));

        const trans = await sequelize.transaction();

        try{
            const compare = await equalsHash(password,user.password);
            if(!compare)
                return next(HandlerError.badRequest("[User login]","Not correct password!"));

            if(!metaUser)
                metaUser = await MetaUser.create({userId:user.id, lastPlaceIn:adress, lastTimeIn: date}, { transaction: trans });
            else
                metaUser = await MetaUser.update({lastPlaceIn:adress, lastTimeIn: date},{where:{id:metaUser.id}, transaction: trans});

            await trans.commit();
            
            const name = `${user.second_name} ${user.first_name} ${user.middle_name}`;
            const access = generateJWT({id:user.id,name:name,password:user.password, email:user.email}, false);
            const refresh = generateJWT({id:user.id,name:name,password:user.password, email:user.email}, true);

            if(user)
                user.password="";
            res.cookie("refresh",refresh,{httpOnly: false, secure: false, signed: false});
            res.json({access,user:user, metaUser:metaUser});
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[User login]",(err as Error).message));
        }
    }



    async registration(req:Request, res:Response, next:NextFunction){
        const {password, email, first_name, second_name, middle_name, adress, date, codeType} = req.body;
        let {user} = req.body;

        
        if(!password || !(email) || !first_name || !second_name || !middle_name || !adress || !date)
            return next(HandlerError.badRequest("[User registration]","Bad args!"));
        if(user)
            return next(HandlerError.badRequest("[User registration]","User is used!"));
        if(!(validator.isEmail(email)|| !(new Date(date)) || !validator.isIP(adress)))
            return next(HandlerError.badRequest("[User registration]","Bad args, not validating!"));
        if(!codeType && (codeType as CodeType)==="registration")
            return next(HandlerError.badRequest("[User registration]","This is not 'registration' confirm type!"));

        const trans = await sequelize.transaction();

        try{
            const passwordHash = await generateHash(password);
            user = await User.create({password:passwordHash,email:email, first_name: first_name, middle_name: middle_name, second_name:second_name}, { transaction: trans });
            const metaUser = await MetaUser.create({userId:user.id,lastPlaceIn:adress, lastTimeIn: date}, { transaction: trans });
            
            await trans.commit();

            const name = `${user.second_name} ${user.first_name} ${user.middle_name}`;
            const access = generateJWT({id:user.id,name:name,password:user.password, email:user.email}, false);
            const refresh = generateJWT({id:user.id,name:name,password:user.password, email:user.email}, true);
            
            if(user)
                user.password="";
            res.cookie("refresh",refresh,{httpOnly: false, secure: false, signed: false});
            res.json({access,user:user,metaUser:metaUser});
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[User registration]",(err as Error).message));
        }
    }



    async delete(req:Request, res:Response, next:NextFunction){
        const {tokens, codeType} = req.body;
        const {user, metaUser} = req.body;

        if(!tokens)
            return next(HandlerError.badRequest("[User delete]","Bad args!"));
        if(!user || !metaUser)
            return next(HandlerError.badRequest("[User delete]","Have not this user!"));
        if(!codeType && (codeType as CodeType)==="delete_account")
            return next(HandlerError.badRequest("[User delete]","This is not 'delete_account' confirm type!"));
        

        const trans = await sequelize.transaction();

        try{
            
            await MetaUser.destroy({where:{id:metaUser.id}, transaction: trans });
            await User.destroy({where:{id:user.id}, transaction: trans });

            await trans.commit();
            
            if(user)
                user.password="";
            res.json({user:user,metaUser:metaUser});
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[User delete]", (err as Error).message));
        }
    }



    async setPassword(req:Request, res:Response, next:NextFunction){
        const {password, tokens, codeType} = req.body;
        const {user, metaUser, setting} = req.body;

        if(!password || !tokens)
            return next(HandlerError.badRequest("[User setPassword]","Bad args!"));
        if(!user)
            return next(HandlerError.badRequest("[User setPassword]","Have not this user!"));
        if(!codeType && (codeType as CodeType)==="forget")
            return next(HandlerError.badRequest("[User setPassword]","This is not 'forget' confirm type!"));
        
        const trans = await sequelize.transaction();

        try{
            const passwordHash = await generateHash(password);
            const updateUser = await User.update({password:passwordHash},{where:{id:user.id}, transaction: trans});
            const newUser = await User.findOne({where:{id:user.id}});
            await trans.commit();
            if(newUser)
                newUser.password="";
            res.json({access: tokens.access,user:newUser,metaUser:metaUser,setting:setting});
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[User setPassword]", (err as Error).message));
        }
    }



    async refresh(req:Request, res:Response, next:NextFunction){
        const {tokens} = req.body;
        if(!tokens)
            return next(HandlerError.badRequest("[User refresh]","Have NOT tokens!"));
        res.json({access: tokens.access});
    }


    
    async confirm(req:Request, res:Response, next:NextFunction){
        const {codeType} = req.body;

        if(!codeType)
            return next(HandlerError.badRequest("[User confirm]","Cannot understand codeType!"));

        res.json({confirm:true});
    }
    

    
    async message(req:Request, res:Response, next:NextFunction){
        const {code, email, codeType} = req.body;
        if(!code || !email || !codeType)
            return next(HandlerError.badRequest("[User message]","Bad args!"));
        if(!(validator.isEmail(email)) )
            return next(HandlerError.badRequest("[User message]","Bad args, not validating!"));
        
        try{
            await sendEmail(code, email, codeType);
            res.json({send:true});
        }catch(err){
            return next(HandlerError.internal("[User message]", (err as Error).message));
        }
    }


    async setSecurity(req:Request, res:Response, next:NextFunction){
        const {email, phone, password, codeType} = req.body;
        const {user, metaUser} = req.body;

        if(!email || !password || !codeType)
            return next(HandlerError.badRequest("[User setSecurity]","Bad args!"));
        if(!user)
            return next(HandlerError.badRequest("[User setSecurity]","Have not this user!"));
        if(!validator.isEmail(email) || !(validator.isMobilePhone(phone) || !phone) || !password)
            return next(HandlerError.badRequest("[User setSecurity]","Bad args, not validating!"));
        if(!codeType && (codeType as CodeType)==="security")
            return next(HandlerError.badRequest("[User setSecurity]","This is not 'security' confirm type!"));

        const trans = await sequelize.transaction();

        try{
            const updateUser = await User.update({email:email, phone:phone, password:password},{where:{id:user.id}, transaction: trans});
            const newUser = await User.findOne({where:{id:user.id}});
            if(!newUser)
                return next(HandlerError.badRequest("[User setSecurity]","Have not updated user!"));

            await trans.commit();
        
            const name = `${newUser.second_name} ${newUser.first_name} ${newUser.middle_name}`;
            const access = generateJWT({id:newUser.id,name:name,password:newUser.password, email:newUser.email}, false);
            const refresh = generateJWT({id:newUser.id,name:name,password:newUser.password, email:newUser.email}, true);
            newUser.password="";

            res.cookie("refresh",refresh,{httpOnly: false, secure: false, signed: false});
            res.json({access,user:newUser,metaUser:metaUser});
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[User setSecurity]", (err as Error).message));
        }
    }



    async setData(req:Request, res:Response, next:NextFunction){
        const {first_name, second_name, middle_name} = req.body;
        const ava_name = req.file?.filename;
        const {user, metaUser} = req.body;

        if(!first_name && !second_name && !middle_name && !ava_name)
            return next(HandlerError.badRequest("[User setData]","Bad args, nothing args was take!"));
        if(!user)
            return next(HandlerError.badRequest("[User setData]","Have not this user!"));

        const trans = await sequelize.transaction();

        try{
            if(ava_name){
                loadAvatar(req,res, async (err:Error) => {
                    if (err) 
                        return res.status(400).json({ error: err.message });
                    if(req.file)
                        await User.update({avatar:`/static/${req.file.filename}`},{where:{id:user.id}, transaction: trans});
                })
            }
            
            await User.update({
                first_name: first_name ?? user.first_name,
                second_name: second_name ?? user.second_name,
                middle_name: middle_name ?? user.middle_name,
            },{where:{id:user.id}, transaction: trans});
            const newUser = await User.findOne({where:{id:user.id}});
            if(!newUser)
                return next(HandlerError.badRequest("[User setData]","Have not updated user!"));

            await trans.commit();

            const name = `${newUser.second_name} ${newUser.first_name} ${newUser.middle_name}`;
            const access = generateJWT({id:newUser.id,name:name,password:newUser.password, email:newUser.email}, false);
            const refresh = generateJWT({id:newUser.id,name:name,password:newUser.password, email:newUser.email}, true);
            newUser.password="";
            
            res.cookie("refresh",refresh,{httpOnly: false, secure: false, signed: false});
            res.json({access,user:newUser,metaUser:metaUser});
        }catch(err){
            await trans.rollback();
            return next(HandlerError.internal("[User setData]", (err as Error).message));
        }
    }

}

export default new UserController();