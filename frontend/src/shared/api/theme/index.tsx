import { ThemeType } from "@/types";
import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/backend/theme"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class ThemeAPI{
    static async getListAll(){
        try{
            const res = await api.get(`/list_all`);
            console.log("list of all themes: ",res.data);
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
            console.log("list of themes: ",res.data);
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
            console.log("theme: ",res.data);
            if(!res.data.theme)
                return null;
            return {
                id: res.data.theme[0].id,
                name: res.data.theme[0].name
            } as ThemeType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, theme: ThemeType){
        try{
            const res = await api.post(`/add`,{
                name: theme.name
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("theme add: ",res.data);
            if(!res.data.theme)
                return null;
            return {
                id: res.data.theme[0].id,
                name: res.data.theme[0].name
            } as ThemeType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, theme: ThemeType){
        try{
            const res = await api.put(`/update`,{
                id: theme.id,
                name: theme.name
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("theme update: ",res.data);
            if(!res.data.theme)
                return null;
            return {
                id: res.data.theme[0].id,
                name: res.data.theme[0].name
            } as ThemeType;
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
            console.log("theme delete: ",res.data);
            if(!res.data.theme)
                return null;
            return {
                id: res.data.theme[0].id,
                name: res.data.theme[0].name
            } as ThemeType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}