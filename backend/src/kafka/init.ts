import { controllers } from "./controller";


// топики auth-requests и auth-responses
const initKafka = async () =>{
    try{
        await controllers.Auth.init();
    }catch(err){
        console.error(err);
    }
}

export default initKafka;