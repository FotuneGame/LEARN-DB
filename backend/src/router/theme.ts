import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerTheme:Router = express.Router();


routerTheme.post("/add", wares.tokensWare, wares.employeeWare, controller.theme.add);
routerTheme.delete("/delete", wares.tokensWare, wares.employeeWare, controller.theme.delete);
routerTheme.get("/get", controller.theme.get);
routerTheme.get("/find", controller.theme.findResults);
routerTheme.get("/list", controller.theme.list);
routerTheme.get("/list_all", controller.theme.listAll);
routerTheme.get("/statistics", controller.theme.statistics);
routerTheme.put("/update", wares.tokensWare, wares.employeeWare, controller.theme.update);

export default routerTheme;
