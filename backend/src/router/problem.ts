import express, {Router} from "express";
import { controller } from "../controller";

const routerProblem:Router = express.Router();


routerProblem.post("/add", controller.problem.add);
routerProblem.delete("/delete", controller.problem.delete);
routerProblem.get("/get", controller.problem.get);
routerProblem.get("/list", controller.problem.list);
routerProblem.put("/update", controller.problem.update);

export default routerProblem;
