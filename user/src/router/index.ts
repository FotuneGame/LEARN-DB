import express, {Router} from "express";
import userRouter from "./user";

const router:Router = express.Router();

router.use("/",userRouter);



export default router;