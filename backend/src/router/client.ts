import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerClient:Router = express.Router();


routerClient.post("/add", wares.tokensWare, wares.employeeWare, controller.client.add);
routerClient.post("/connection", wares.tokensWare, wares.employeeWare, controller.listProblemsClient.connection);
routerClient.delete("/delete", wares.tokensWare, wares.employeeWare, controller.client.delete);
routerClient.get("/problems", controller.listProblemsClient.get);
routerClient.get("/get", controller.client.get);
routerClient.get("/list", controller.client.list);
routerClient.get("/list_all", controller.client.listAll);
routerClient.put("/update", wares.tokensWare, wares.employeeWare, controller.client.update);
routerClient.post("/change/employee", wares.tokensWare, wares.employeeWare, controller.client.changeEmployee);

export default routerClient;
