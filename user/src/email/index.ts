import nodemailer from "nodemailer";
import HandlerError from "../error";
import { getMail } from "./data";
import { CodeType } from "@/utils/types";
import {logger} from "../logs";



const transporter=nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    port: 465,
    secure: true,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    }
});



export async function sendEmail(code: number, email: string, type: CodeType){

    const mail = getMail(code,type);

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: email,
        headers: mail.headers,
        subject: mail.subject,
        text: mail.text,
        html: mail.html
    }

    try{
        await transporter.sendMail(mailOptions, (err)=>{
            if(err)
                logger.error("[sendEmail] error:", err);
            else
                logger.log("[sendEmail] log: send mail to ", email);
        });
    }catch(err){
        return HandlerError.internal("[Mail send]",(err as Error).message);
    }
}