import { api } from "..";


export default class CallbackAPI{

    static async send(data:{email:string, callback:string}){
        try{
            /*
            const res = await api.get<{
                some: string,
            }>("/login",{});
        
            return res.data;*/
            console.log("callback: ", data);
            return true;
        }catch(err){
            console.error(err);
        }
    }
}