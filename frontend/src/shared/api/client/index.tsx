import { ClientType } from "@/types";
import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/backend/client"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class ClientAPI{
    static async getListAll(){
        try{
            const res = await api.get(`/list_all`);
            console.log("list of all clients: ",res.data);
            if(!res.data.list)
                return null;
            return res.data.list;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async getList(limit: number, offset:number){
        try{
            const res = await api.get(`/list?offset=${offset}&limit=${limit}`);
            console.log("list of clients: ",res.data);
            if(!res.data.list)
                return null;
            return res.data.list;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async getProblems(id_client:number){
        try{
            const res = await api.get(`/problems?id_client=${id_client}`);
            console.log("list of problems client: ",res.data);
            if(!res.data.problems)
                return null;
            return res.data.problems;
        }catch(err){
            console.error(err);
            return null;
        }
    }


    static async getById(id: number){
        try{
            const res = await api.get(`/get?id=${id}`);
            console.log("client: ",res.data);
            if(!res.data.client)
                return null;
            return {
                id: res.data.client[0].id,
                first_name: res.data.client[0].first_name,
                second_name: res.data.client[0].second_name,
                middle_name: res.data.client[0].middle_name,
                id_employee: res.data.client[0].id_employee
            } as ClientType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async connection(access: string, data: {id_client:number, arr_problems:Array<any>}){
        try{
            const res = await api.post(`/connection`,{
                id_client: data.id_client,
                arr_problems: data.arr_problems
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("client problem connection: ",res.data);
            if(!res.data.id_client)
                return null;
            return {
                id_client: res.data.id_client,
                arr_problems: res.data.arr_problems
            };
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, client: ClientType){
        try{
            const res = await api.post(`/add`,{
                first_name: client.first_name,
                second_name: client.second_name,
                middle_name: client.middle_name,
                id_employee: client.id_employee
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("client add: ",res.data);
            if(!res.data.client)
                return null;
            return {
                id: res.data.client[0].id,
                first_name: res.data.client[0].first_name,
                second_name: res.data.client[0].second_name,
                middle_name: res.data.client[0].middle_name,
                id_employee: res.data.client[0].id_employee
            } as ClientType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, client: ClientType){
        try{
            const res = await api.put(`/update`,{
                id: client.id,
                first_name: client.first_name,
                second_name: client.second_name,
                middle_name: client.middle_name,
                id_employee: client.id_employee
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("client update: ",res.data);
            if(!res.data.client)
                return null;
            return {
                id: res.data.client[0].id,
                first_name: res.data.client[0].first_name,
                second_name: res.data.client[0].second_name,
                middle_name: res.data.client[0].middle_name,
                id_employee: res.data.client[0].id_employee
            } as ClientType;
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
            console.log("client delete: ",res.data);
            if(!res.data.client)
                return null;
            return {
                id: res.data.client[0].id,
                first_name: res.data.client[0].first_name,
                second_name: res.data.client[0].second_name,
                middle_name: res.data.client[0].middle_name,
                id_employee: res.data.client[0].id_employee
            } as ClientType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}