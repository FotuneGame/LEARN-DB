import { ProblemType } from "@/types";
import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL + "/api/v1/backend/problem";

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class ProblemAPI{
    static async getListAll(){
        try{
            const res = await api.get(`/list_all`);
            console.log("list of all problems: ",res.data);
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
            console.log("list of problem: ",res.data);
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
            console.log("problem: ",res.data);
            if(!res.data.problem)
                return null;
            return {
                id: res.data.problem[0].id,
                id_theme: res.data.problem[0].id_theme,
                id_employee: res.data.problem[0].id_employee,
                id_answer: res.data.problem[0].id_answer,
                id_specialist: res.data.problem[0].id_specialist,
                name: res.data.problem[0].name,
                describe: res.data.problem[0].describe
            } as ProblemType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, problem: ProblemType){
        try{
            const res = await api.post(`/add`,{
                id_theme: problem.id_theme,
                id_employee: problem.id_employee > 0 ? problem.id_employee : null,
                id_answer: problem.id_answer > 0 ? problem.id_answer : null,
                id_specialist: problem.id_specialist > 0 ? problem.id_specialist : null,
                name: problem.name,
                describe: problem.describe
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("problem add: ",res.data);
            if(!res.data.problem)
                return null;
            return {
                id: res.data.problem[0].id,
                id_theme: res.data.problem[0].id_theme,
                id_employee: res.data.problem[0].id_employee,
                id_answer: res.data.problem[0].id_answer,
                id_specialist: res.data.problem[0].id_specialist,
                name: res.data.problem[0].name,
                describe: res.data.problem[0].describe
            } as ProblemType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, id:number, problem: ProblemType){
        try{
            const res = await api.put(`/update`,{
                id: id,
                id_theme: problem.id_theme,
                id_employee: problem.id_employee > 0 ? problem.id_employee : null,
                id_answer: problem.id_answer > 0 ? problem.id_answer : null,
                id_specialist: problem.id_specialist > 0 ? problem.id_specialist : null,
                name: problem.name,
                describe: problem.describe
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("problem update: ",res.data);
            if(!res.data.problem)
                return null;
            return {
                id: res.data.problem[0].id,
                id_theme: res.data.problem[0].id_theme,
                id_employee: res.data.problem[0].id_employee,
                id_answer: res.data.problem[0].id_answer,
                id_specialist: res.data.problem[0].id_specialist,
                name: res.data.problem[0].name,
                describe: res.data.problem[0].describe
            } as ProblemType;
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
            console.log("problem delete: ",res.data);
            if(!res.data.problem)
                return null;
            return {
                id: res.data.problem[0].id,
                id_theme: res.data.problem[0].id_theme,
                id_employee: res.data.problem[0].id_employee,
                id_answer: res.data.problem[0].id_answer,
                id_specialist: res.data.problem[0].id_specialist,
                name: res.data.problem[0].name,
                describe: res.data.problem[0].describe
            } as ProblemType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}