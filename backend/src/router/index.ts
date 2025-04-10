import express, {Router} from "express";
import routerSpecialist from "./specialist";
import routerCallbacks from "./callbacks";
import routerEmployee from "./employee";
import routerProblem from "./problem";
import routerAnswer from "./answer";
import routerClient from "./client";
import routerTheme from "./theme";
import routerCalls from "./calls";


const router:Router = express.Router();

router.use("/specialist", routerSpecialist);
router.use("/callbacks", routerCallbacks);
router.use("/employee", routerEmployee);
router.use("/problem", routerProblem);
router.use("/answer", routerAnswer);
router.use("/client", routerClient);
router.use("/theme", routerTheme);
router.use("/calls", routerCalls);




export default router;
