import express, {Router} from "express";
import { controller } from "../controller";
import { wares } from "../middleware";

const routerOther:Router = express.Router();


routerOther.post("/report", wares.tokensWare, wares.adminsWare, controller.other.report);


export default routerOther;
