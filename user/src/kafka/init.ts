import CustomKafka from "./";
import { controllers } from "./controller";
import {logger} from "../logs";


// топики auth-requests и auth-responses
const initKafka = async () =>{
    try{
        await controllers.Auth.init();
    }catch(err){
        logger.error({name:(err as Error).name,message:"Cannot create topics kafka: "+(err as Error).message});
        console.error(err);
    }
}

export default initKafka;