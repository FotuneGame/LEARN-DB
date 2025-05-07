import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerProblem:Router = express.Router();


routerProblem.post("/add", wares.tokensWare, wares.employeeWare, controller.problem.add);
routerProblem.delete("/delete", wares.tokensWare, wares.employeeWare, controller.problem.delete);
routerProblem.get("/get", controller.problem.get);
routerProblem.get("/list", controller.problem.list);
routerProblem.get("/list_all", controller.problem.listAll);
routerProblem.put("/update", wares.tokensWare, wares.employeeWare, controller.problem.update);

export default routerProblem;
