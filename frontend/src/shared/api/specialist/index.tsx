import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/backend/specialist"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class SpecialistAPI{
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
}