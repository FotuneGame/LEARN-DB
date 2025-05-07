import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerAnswer:Router = express.Router();


routerAnswer.post("/add",wares.tokensWare, wares.employeeWare, controller.answer.add);
routerAnswer.delete("/delete", wares.tokensWare, wares.employeeWare, controller.answer.delete);
routerAnswer.get("/get", controller.answer.get);
routerAnswer.get("/list", controller.answer.list);
routerAnswer.get("/list_all", controller.answer.listAll);
routerAnswer.get("/list_by_theme", controller.answer.listByTheme);
routerAnswer.put("/update", wares.tokensWare, wares.employeeWare, controller.answer.update);

export default routerAnswer;
