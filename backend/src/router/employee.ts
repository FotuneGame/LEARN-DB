import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerEmployee:Router = express.Router();


routerEmployee.post("/add", wares.tokensWare, wares.adminsWare, controller.employee.add);
routerEmployee.post("/login", wares.tokensWare, controller.employee.login);
routerEmployee.delete("/delete", wares.tokensWare, wares.adminsWare, controller.employee.delete);
routerEmployee.get("/get", controller.employee.get);
routerEmployee.get("/list", controller.employee.list);
routerEmployee.get("/list_all", controller.employee.listAll);
routerEmployee.get("/list_by_theme", controller.employee.listByTheme);
routerEmployee.get("/statistics", controller.employee.statistics);
routerEmployee.get("/problems", controller.employee.problems)
routerEmployee.put("/update", wares.tokensWare, wares.adminsWare, controller.employee.update);


export default routerEmployee;
