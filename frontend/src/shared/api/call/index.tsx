import { CallType } from "@/types";
import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/backend/calls"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class ThemeAPI{
    static async getList(limit: number, offset:number){
        try{
            const res = await api.get(`/list?offset=${offset}&limit=${limit}`);
            console.log("list of calls: ",res.data);
            if(!res.data.list)
                return null;
            return res.data.list;
        }catch(err){
            console.error(err);
            return null;
        }
    }
    

    static async getById(id: number){
        try{
            const res = await api.get(`/get?id=${id}`);
            console.log("call: ",res.data);
            if(!res.data.call)
                return null;
            return {
                id: res.data.call[0].id,
                phone: res.data.call[0].phone,
                date: res.data.call[0].date,
                time: res.data.call[0].time,
                id_client: res.data.call[0].id_client,
                is_spam: res.data.call[0].is_spam
            } as CallType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, call: CallType){
        try{
            const res = await api.post(`/add`,{
                phone: call.phone,
                date: call.date,
                time: call.time,
                id_client: call.id_client,
                is_spam: call.is_spam
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("call add: ",res.data);
            if(!res.data.call)
                return null;
            return {
                id: res.data.call[0].id,
                phone: res.data.call[0].phone,
                date: res.data.call[0].date,
                time: res.data.call[0].time,
                id_client: res.data.call[0].id_client,
                is_spam: res.data.call[0].is_spam
            } as CallType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, call: CallType){
        try{
            const res = await api.put(`/update`,{
                id: call.id,
                phone: call.phone,
                date: call.date,
                time: call.time,
                id_client: call.id_client,
                is_spam: call.is_spam
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("call update: ",res.data);
            if(!res.data.call)
                return null;
            return {
                id: res.data.call[0].id,
                phone: res.data.call[0].phone,
                date: res.data.call[0].date,
                time: res.data.call[0].time,
                id_client: res.data.call[0].id_client,
                is_spam: res.data.call[0].is_spam
            } as CallType;
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
            console.log("call delete: ",res.data);
            if(!res.data.call)
                return null;
            return {
                id: res.data.call[0].id,
                phone: res.data.call[0].phone,
                date: res.data.call[0].date,
                time: res.data.call[0].time,
                id_client: res.data.call[0].id_client,
                is_spam: res.data.call[0].is_spam
            } as CallType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}