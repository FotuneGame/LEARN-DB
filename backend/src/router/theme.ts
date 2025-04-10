import express, {Router} from "express";
import { controller } from "../controller";

const routerTheme:Router = express.Router();


routerTheme.post("/add", controller.theme.add);
routerTheme.delete("/delete", controller.theme.delete);
routerTheme.get("/get", controller.theme.get);
routerTheme.get("/find", controller.theme.findResults);
routerTheme.get("/list", controller.theme.list);
routerTheme.get("/statistics", controller.theme.statistics);
routerTheme.put("/update", controller.theme.update);

export default routerTheme;
