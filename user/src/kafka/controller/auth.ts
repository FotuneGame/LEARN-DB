import {HandlerMessageArg} from "../types";
import CustomKafka from "../index";
import {logger} from "../../logs";
import { verifyJWT } from "../../utils";
import { JWTType } from "@/utils/types";


class Auth{

    async init() {
        return await CustomKafka.subscribe({groupId: "user-service-group"},["auth-requests"],[this.handler],true);
    }

    async handler(data:HandlerMessageArg){
        const parse = JSON.parse(data.message.value?.toString() || '{}');
        if (parse.access || parse.refresh) {
            
            const decoded_access = verifyJWT(parse.access);
            const decoded_refresh = verifyJWT(parse.refresh);
            if(!decoded_refresh){
                await CustomKafka.send("auth-responses",{value: JSON.stringify({error:"Cannot verify!"})});
                return;
            }
            let value = {};
            if (decoded_access){
                value = {
                    id: (decoded_access as JWTType).id, 
                    name: (decoded_access as JWTType).name, 
                    email: (decoded_access as JWTType).email, 
                }
            }else if(decoded_refresh){
                value = {
                    id: (decoded_refresh as JWTType).id, 
                    name: (decoded_refresh as JWTType).name, 
                    email: (decoded_refresh as JWTType).email, 
                }
            }
            await CustomKafka.send("auth-responses",{value: JSON.stringify(value)});
        } else {
            logger.error({name:"[user auth kafka handler]",message:"Bad args {access, refresh}"});
            console.error("[user auth kafka handler]: Bad args {access, refresh}");
            await CustomKafka.send("auth-responses",{value: JSON.stringify({error:"Bad args!"})});
            return;
        }
    }
}

export default  new Auth();
