import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerSpecialist:Router = express.Router();


routerSpecialist.post("/add", wares.tokensWare, wares.employeeWare, controller.specialist.add);
routerSpecialist.delete("/delete", wares.tokensWare, wares.employeeWare, controller.specialist.delete);
routerSpecialist.get("/get", controller.specialist.get);
routerSpecialist.get("/list", controller.specialist.list);
routerSpecialist.get("/list_all", controller.specialist.listAll);
routerSpecialist.get("/list_by_theme", controller.specialist.listByTheme);
routerSpecialist.get("/statistics", controller.specialist.statistics);
routerSpecialist.put("/update", wares.tokensWare, wares.employeeWare, controller.specialist.update);

export default routerSpecialist;
