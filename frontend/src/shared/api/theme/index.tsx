import { ThemeType } from "@/types";
import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL+"/api/v1/backend/theme";

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class ThemeAPI{

    static async getStatistics(){
        try{
            const res = await api.get(`/statistics`);
            console.log("statistics of all themes: ",res.data);
            if(!res.data.statistics)
                return null;
            return res.data.statistics;
        }catch(err){
            console.error(err);
            return null;
        }
    }

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

    static async find(id_theme: number){
        try{
            const res = await api.get(`/find?id_theme=${id_theme}`);
            console.log("find by theme: ",res.data);
            if(!res.data.answers && !res.data.employees && !res.data.specialists)
                return null;
            return {
                answers: res.data.answers,
                employees: res.data.employees,
                specialists: res.data.specialists
            };
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async connection(access: string, data: {id_theme:number, arr_answers:Array<any>, arr_employee:Array<any>, arr_specialist:Array<any>}){
        try{
            const res = await api.post(`/connection`,{
                id_theme: data.id_theme,
                arr_answers: data.arr_answers,
                arr_employee: data.arr_employee,
                arr_specialist: data.arr_specialist
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("theme connection: ",res.data);
            if(!res.data.id_theme)
                return null;
            return {
                id_theme: res.data.id_theme,
                arr_answers: res.data.arr_answers,
                arr_employee: res.data.arr_employee,
                arr_specialist: res.data.arr_specialist,
            };
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