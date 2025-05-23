import { UserType, EmployeeType, PostType } from "@/types";
import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL+"/api/v1/backend/employee"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class EmployeeAPI{

    static async getStatistics(){
        try{
            const res = await api.get(`/statistics`);
            console.log("statistics of all employees: ",res.data);
            if(!res.data.statistics)
                return null;
            return res.data.statistics;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    
    static async login(user:UserType){
        try{
            console.log(user)
            const res = await api.post(`/login`,{
                first_name: user.first_name,
                second_name: user.second_name,
                middle_name: user.middle_name,
                phone: user.phone
            },
            {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            }
            )

            console.log("login employee: ",res.data);
            if(!res.data.employee)
                return null;
            return {
                id: res.data.employee.id,
                post: res.data.employee.post as PostType,
            } as EmployeeType
        }catch(err){
            console.error(err);
            return null;
        }
    }


    static async getList(limit: number, offset:number){
        try{
            const res = await api.get(`/list?offset=${offset}&limit=${limit}`);
            console.log("list of employes: ",res.data);
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
            console.log("list of all employes: ",res.data);
            if(!res.data.list)
                return null;
            return res.data.list;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async getListByTheme(id_theme:number){
        try{
            const res = await api.get(`/list_by_theme?id_theme=${id_theme}`);
            console.log("list of employees by theme: ",res.data);
            if(!res.data.list)
                return null;
            return res.data.list;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async getListProblems(id_employee: number){
        try{
            const res = await api.get(`/problems?id_employee=${id_employee}`);
            console.log("problems of employee: ",res.data);
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
            console.log("employe: ",res.data);
            if(!res.data.employee)
                return null;
            return {
                id: res.data.employee[0].id,
                email: res.data.employee[0].email,
                post: res.data.employee[0].post
            };
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, post: PostType, email: string){
        try{
            const res = await api.post(`/add`,{
                first_name: "Не указан",
                second_name: "Не указан",
                middle_name: "Не указан",
                phone: "Не указан",
                new_email: email,
                post: post
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("employe add: ",res.data);
            if(!res.data.employee)
                return null;
            return {
                id: res.data.employee[0].id,
                post: res.data.employee[0].post
            } as EmployeeType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, id:number, post: PostType, email: string){
        try{
            const res = await api.put(`/update`,{
                id: id,
                new_email: email,
                post: post
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("employe update: ",res.data);
            if(!res.data.employee)
                return null;
            return {
                id: res.data.employee[0].id,
                post: res.data.employee[0].post
            } as EmployeeType;
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
            console.log("employe delete: ",res.data);
            if(!res.data.employee)
                return null;
            return {
                id: res.data.employee[0].id,
                post: res.data.employee[0].post
            } as EmployeeType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}