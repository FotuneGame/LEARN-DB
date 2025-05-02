import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerCalls:Router = express.Router();


routerCalls.post("/add", wares.tokensWare, wares.employeeWare, controller.call.add);
routerCalls.delete("/delete", wares.tokensWare, wares.employeeWare, controller.call.delete);
routerCalls.get("/get", controller.call.get);
routerCalls.get("/list", controller.call.list);
routerCalls.put("/update", wares.tokensWare, wares.employeeWare, controller.call.update);

export default routerCalls;
