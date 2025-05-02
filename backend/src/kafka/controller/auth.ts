import {HandlerMessageArg} from "../types";
import CustomKafka from "../index";

type AnswerAuthType = {
    id: number, 
    name: string, 
    email: string
} 

interface IAuth{
    callback: (parse: AnswerAuthType)=> Promise<void>;
    errorCallback: (error:string)=> Promise<void>
}


class Auth implements IAuth{
    async callback(parse: AnswerAuthType){};
    async errorCallback(error:string){};

    async setCallbacks(callback:(parse: AnswerAuthType)=> Promise<void>, errorCallback: (error:string)=>Promise<void>){
        this.callback = callback;
        this.errorCallback = errorCallback;
    }

    async init() {
       return await CustomKafka.subscribe({groupId: "backend-service-group"},["auth-responses"],[this.handler.bind(this)],false);
    }

    async handler(data:HandlerMessageArg){
        const parse = JSON.parse(data.message.value?.toString() || '{}');
        if (parse.email) {
            this.callback(parse);
        } else {
            this.errorCallback(parse.error ?? "Error authed token after kafka send");
        }
    }
}

export default  new Auth();
