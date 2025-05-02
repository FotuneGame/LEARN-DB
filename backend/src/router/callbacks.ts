import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";


const routerCallbacks:Router = express.Router();

routerCallbacks.post("/add", wares.tokensWare, wares.employeeWare, controller.callbacks.add);
routerCallbacks.delete("/delete", wares.tokensWare, wares.employeeWare, controller.callbacks.delete);
routerCallbacks.get("/get", controller.callbacks.get);
routerCallbacks.put("/update", wares.tokensWare, wares.employeeWare, controller.callbacks.update);

export default routerCallbacks;
