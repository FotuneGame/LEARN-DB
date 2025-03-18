import express, {Router} from "express";
import { controller } from "../controller";

const routerCalls:Router = express.Router();


routerCalls.post("/add", controller.call.add);
routerCalls.delete("/delete", controller.call.delete);
routerCalls.get("/get", controller.call.get);
routerCalls.get("/list", controller.call.list);
routerCalls.put("/update", controller.call.update);

export default routerCalls;
