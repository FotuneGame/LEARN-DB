import express, {Router} from "express";
import { controller } from "../controller";

const routerSpam:Router = express.Router();


routerSpam.post("/add", controller.spam.add);
routerSpam.delete("/delete", controller.spam.delete);
routerSpam.get("/find", controller.spam.find);
routerSpam.get("/get", controller.spam.get);
routerSpam.get("/list", controller.spam.list);
routerSpam.put("/update", controller.spam.update);

export default routerSpam;
