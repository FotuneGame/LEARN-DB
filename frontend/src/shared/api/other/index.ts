import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/backend/other"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class OtherAPI{
   

    static async report(access: string){
        try{
            const res = await api.post(`/report`,{},{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                responseType: 'blob'
            });
            if(!res.data)
                return null;
            return res.data;
        }catch(err){
            console.error(err);
            return null;
        }
    }
}