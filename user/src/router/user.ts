import express, {Router} from "express";
import {controller} from "../controller/";
import {ware} from "../middleware/";
import passport from "../passport";



const userRouter:Router = express.Router();


userRouter.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));
userRouter.get(process.env.GOOGLE_URL_CALLBACK as string, passport.authenticate("google", {
    failureRedirect: process.env.URL_SITE,
    session: true
}), controller.GoogleController.sign)

userRouter.get("/github", passport.authenticate("github", {scope: ['user:email']}));
userRouter.get(process.env.GITHUB_URL_CALLBACK as string, passport.authenticate("github", {
    failureRedirect: process.env.URL_SITE,
    session: true
}), controller.GitHubController.sign)




userRouter.get("/get", controller.UserController.get);
userRouter.post("/refresh",ware.tokensWare, controller.UserController.refresh);

userRouter.post("/confirm", ware.checkCodeWare, controller.UserController.confirm);
userRouter.post("/code", ware.generationCodeWare, controller.UserController.message);

userRouter.post("/login",ware.confirmWare, ware.findUserWare, ware.findMetaUserWare, controller.UserController.login);
userRouter.post("/registration", ware.confirmWare, ware.findUserWare, controller.UserController.registration);
userRouter.patch("/new/password", ware.confirmWare, ware.findUserWare, ware.findMetaUserWare, controller.UserController.setPassword);
userRouter.patch("/new/security", ware.confirmWare, ware.findUserWare, ware.findMetaUserWare, controller.UserController.setSecurity);

userRouter.delete("/delete",ware.tokensWare, ware.confirmWare, ware.findUserWare, ware.findMetaUserWare, controller.UserController.delete);
userRouter.patch("/new/data",ware.avatarWare, ware.tokensWare, ware.findUserWare, ware.findMetaUserWare, controller.UserController.setData);


export default userRouter;
