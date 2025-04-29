import express, {Router} from "express";
import { controller } from "../controller";

const routerSpecialist:Router = express.Router();


routerSpecialist.post("/add", controller.specialist.add);
routerSpecialist.delete("/delete", controller.specialist.delete);
routerSpecialist.get("/get", controller.specialist.get);
routerSpecialist.get("/list", controller.specialist.list);
routerSpecialist.get("/list_by_theme", controller.specialist.listByTheme);
routerSpecialist.get("/statistics", controller.specialist.statistics);
routerSpecialist.put("/update", controller.specialist.update);

export default routerSpecialist;
