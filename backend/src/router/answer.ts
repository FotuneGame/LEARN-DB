import express, {Router} from "express";
import { controller } from "../controller";

const routerAnswer:Router = express.Router();


routerAnswer.post("/add", controller.answer.add);
routerAnswer.delete("/delete", controller.answer.delete);
routerAnswer.get("/get", controller.answer.get);
routerAnswer.get("/list", controller.answer.list);
routerAnswer.get("/list_by_theme", controller.answer.listByTheme);
routerAnswer.put("/update", controller.answer.update);

export default routerAnswer;
