import { CallbackType } from "@/types";
import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL + "/api/v1/backend/callbacks"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})



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


    static async getById(id_problem: number){
        try{
            const res = await api.get(`/get_by_id_problem?id_problem=${id_problem}`);
            console.log("callback: ",res.data);
            if(!res.data.callback)
                return null;
            return {
                id: res.data.callback[0].id,
                phone: res.data.callback[0].phone,
                email: res.data.callback[0].email,
                id_problem: res.data.callback[0].id_problem,
            } as CallbackType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, callback: CallbackType){
            try{
                const res = await api.post(`/add`,{
                    phone: callback.phone,
                    client_email: callback.email,
                    id_problem: callback.id_problem,
                },{
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                });
                console.log("callback add: ",res.data);
                if(!res.data.callback)
                    return null;
                return {
                    id: res.data.callback[0].id,
                    phone: res.data.callback[0].phone,
                    email: res.data.callback[0].email,
                    id_problem: res.data.callback[0].id_problem,
                } as CallbackType;
            }catch(err){
                console.error(err);
                return null;
            }
        }
    
        static async update(access: string, id:number, callback: CallbackType){
            try{
                const res = await api.put(`/update`,{
                    id: id,
                    phone: callback.phone,
                    client_email: callback.email,
                    id_problem: callback.id_problem,
                },{
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                });

                console.log("callback update: ",res.data);
                if(!res.data.callback)
                    return null;
                return {
                    id: res.data.callback[0].id,
                    phone: res.data.callback[0].phone,
                    email: res.data.callback[0].email,
                    id_problem: res.data.callback[0].id_problem,
                } as CallbackType;
            }catch(err){
                console.error(err);
                return null;
            }
        }
    
    
        static async delete(access: string, id: number){
            try{
                const res = await api.delete(`/delete?id=${id}`,{
                    headers: {
                        Authorization: `Bearer ${access}`,
                    },
                });
                console.log("callback delete: ",res.data);
                if(!res.data.callback)
                    return null;
                return {
                    id: res.data.callback[0].id,
                    phone: res.data.callback[0].phone,
                    email: res.data.callback[0].email,
                    id_problem: res.data.callback[0].id_problem,
                } as CallbackType;
            }catch(err){
                console.error(err);
                return null;
            }
        }
}