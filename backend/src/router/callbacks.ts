import express, {Router} from "express";
import { controller } from "../controller";


const routerCallbacks:Router = express.Router();

routerCallbacks.post("/add", controller.callbacks.add);
routerCallbacks.delete("/delete", controller.callbacks.delete);
routerCallbacks.get("/get", controller.callbacks.get);
routerCallbacks.put("/update", controller.callbacks.update);

export default routerCallbacks;
