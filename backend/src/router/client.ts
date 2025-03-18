import express, {Router} from "express";
import { controller } from "../controller";

const routerClient:Router = express.Router();


routerClient.post("/add", controller.client.add);
routerClient.delete("/delete", controller.client.delete);
routerClient.get("/get", controller.client.get);
routerClient.get("/list", controller.client.list);
routerClient.put("/update", controller.client.update);
routerClient.get("/change/employee", controller.client.changeEmployee);

export default routerClient;
