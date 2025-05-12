import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL+"/api/v1/backend/other"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class OtherAPI{
   

    static async report(access: string){
        try{
            const res = await api.post(`/report`,{},{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                responseType: 'blob'
            });
            if(!res.data)
                return null;
            return res.data;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}