import { AnswerType } from "@/types";
import axios from "axios";
import {BASE_URL} from "@/shared/const";

const urlUserAPI = BASE_URL + "/api/v1/backend/answer"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class AnswerAPI{


    static async getListByTheme(id_theme:number){
        try{
            const res = await api.get(`/list_by_theme?id_theme=${id_theme}`);
            console.log("list of answer by theme: ",res.data);
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
            console.log("list of answers: ",res.data);
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
            console.log("list of all answer: ",res.data);
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
            console.log("answer: ",res.data);
            if(!res.data.answer)
                return null;
            return {
                id: res.data.answer[0].id,
                name: res.data.answer[0].name,
                describe: res.data.answer[0].describe,
                important: res.data.answer[0].important,
            } as AnswerType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async add(access: string, answer: AnswerType){
        try{
            const res = await api.post(`/add`,{
                name: answer.name,
                describe: answer.describe,
                important: answer.important
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("answer add: ",res.data);
            if(!res.data.answer)
                return null;
            return {
                id: res.data.answer[0].id,
                name: res.data.answer[0].name,
                describe: res.data.answer[0].describe,
                important: res.data.answer[0].important,
            } as AnswerType;
        }catch(err){
            console.error(err);
            return null;
        }
    }

    static async update(access: string, answer: AnswerType){
        try{
            const res = await api.put(`/update`,{
                id: answer.id,
                name: answer.name,
                describe: answer.describe,
                important: answer.important
            },{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            console.log("answer update: ",res.data);
            if(!res.data.answer)
                return null;
            return {
                id: res.data.answer[0].id,
                name: res.data.answer[0].name,
                describe: res.data.answer[0].describe,
                important: res.data.answer[0].important,
            } as AnswerType;
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
            console.log("answer delete: ",res.data);
            if(!res.data.answer)
                return null;
            return {
                id: res.data.answer[0].id,
                name: res.data.answer[0].name,
                describe: res.data.answer[0].describe,
                important: res.data.answer[0].important,
            } as AnswerType;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}