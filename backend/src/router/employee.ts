import express, {Router} from "express";
import { controller } from "../controller";

const routerEmployee:Router = express.Router();


routerEmployee.post("/add", controller.employee.add);
routerEmployee.delete("/delete", controller.employee.delete);
routerEmployee.get("/get", controller.employee.get);
routerEmployee.get("/list", controller.employee.list);
routerEmployee.put("/update", controller.employee.update);


export default routerEmployee;
