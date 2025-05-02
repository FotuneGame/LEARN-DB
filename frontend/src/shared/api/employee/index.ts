import { UserType, EmployeeType } from "@/types";
import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/backend/employee"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class EmployeeAPI{
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
                post: res.data.employee.post,
            } as EmployeeType
        }catch(err){
            console.error(err);
        }
    }
}