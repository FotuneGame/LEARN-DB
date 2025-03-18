import express, {Router} from "express";
import { controller } from "../controller";

const routerSpecialist:Router = express.Router();


routerSpecialist.post("/add", controller.specialist.add);
routerSpecialist.delete("/delete", controller.specialist.delete);
routerSpecialist.get("/get", controller.specialist.get);
routerSpecialist.get("/list", controller.specialist.list);
routerSpecialist.put("/update", controller.specialist.update);

export default routerSpecialist;
