import {Request, Response, NextFunction} from "express";
import express, {Router} from "express";


const router:Router = express.Router();



router.get("/", (req:Request, res:Response, next:NextFunction) => {    
    const {name,message} = req.query;
    res.json({status:true});
});

export default router;
