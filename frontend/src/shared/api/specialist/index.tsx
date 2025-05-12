import { SpecialistType } from "@/types";
import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL+"/api/v1/backend/specialist";

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class SpecialistAPI{

    static async getStatistics(){
        try{
            const res = await api.get(`/statistics`);
            console.log("statistics of all specialists: ",res.data);
            if(!res.data.statistics)
                return null;
            return res.data.statistics;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async getListByTheme(id_theme:number){
        try{
            const res = await api.get(`/list_by_theme?id_theme=${id_theme}`);
            console.log("list of specialist by theme: ",res.data);
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
            console.log("list of specialists: ",res.data);
            if(!res.data.list)
                return null;
            return res.data.list;
        }catch(err){
            console.error(err);
            return null;
        }
    }


    static async getListAll(){
        try{
            const res = await api.get(`/list_all`);
            console.log("list of all specialists: ",res.data);
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
            console.log("specialist: ",res.data);
            if(!res.data.specialist)
                return null;
            return {
                id: res.data.specialist[0].id,
                first_name: res.data.specialist[0].first_name,
                second_name: res.data.specialist[0].second_name,
                middle_name: res.data.specialist[0].middle_name,
                phone: res.data.specialist[0].phone,
                email: res.data.specialist[0].email,
                adress: res.data.specialist[0].adress,
                profession: res.data.specialist[0].profession
            } as SpecialistType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, specialist: SpecialistType){
        try{
            const res = await api.post(`/add`,{
                first_name: specialist.first_name,
                second_name: specialist.second_name,
                middle_name: specialist.middle_name,
                phone: specialist.phone,
                email: specialist.email,
                adress: specialist.adress,
                profession: specialist.profession
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("specialist add: ",res.data);
            if(!res.data.specialist)
                return null;
            return {
                id: res.data.specialist[0].id,
                first_name: res.data.specialist[0].first_name,
                second_name: res.data.specialist[0].second_name,
                middle_name: res.data.specialist[0].middle_name,
                phone: res.data.specialist[0].phone,
                email: res.data.specialist[0].email,
                adress: res.data.specialist[0].adress,
                profession: res.data.specialist[0].profession
            } as SpecialistType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, specialist: SpecialistType){
        try{
            const res = await api.put(`/update`,{
                id: specialist.id,
                first_name: specialist.first_name,
                second_name: specialist.second_name,
                middle_name: specialist.middle_name,
                phone: specialist.phone,
                email: specialist.email,
                adress: specialist.adress,
                profession: specialist.profession
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("specialist update: ",res.data);
            if(!res.data.specialist)
                return null;
            return {
                id: res.data.specialist[0].id,
                first_name: res.data.specialist[0].first_name,
                second_name: res.data.specialist[0].second_name,
                middle_name: res.data.specialist[0].middle_name,
                phone: res.data.specialist[0].phone,
                email: res.data.specialist[0].email,
                adress: res.data.specialist[0].adress,
                profession: res.data.specialist[0].profession
            } as SpecialistType;
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
            console.log("specialist delete: ",res.data);
            if(!res.data.specialist)
                return null;
            return {
                id: res.data.specialist[0].id,
                first_name: res.data.specialist[0].first_name,
                second_name: res.data.specialist[0].second_name,
                middle_name: res.data.specialist[0].middle_name,
                phone: res.data.specialist[0].phone,
                email: res.data.specialist[0].email,
                adress: res.data.specialist[0].adress,
                profession: res.data.specialist[0].profession
            } as SpecialistType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}