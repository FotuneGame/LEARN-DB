import { AuthStoryType, RegistrationStoryType, ForgetStoryType, UserType, SecurityStoryType, CodeType } from "@/types";
import axios from "axios";

const urlUserAPI = "https://localhost/api/v1/user"
export const urlUserAvatars = "https://localhost/api/v1/user/static"

const api = axios.create({
    withCredentials: true,
    baseURL: urlUserAPI,
})


export default class UserAPI{

    static async login(data:AuthStoryType){
        try{

            const res = await api.post("/login",{
                password: data.password,
                email: data.email,
                date: new Date()
            })

            console.log("login: ",res.data);
            const res_user=res.data.user;
            return {
                id: res_user.id,
                first_name: res_user.first_name,
                second_name: res_user.second_name,
                middle_name: res_user.middle_name,
                avatar: res_user.avatar,
                email: res_user.email,
                phone: res_user.phone,
                accessToken: res.data.access,
            }
        }catch(err){
            console.error(err);
        }
    }

    static async registration(data:RegistrationStoryType){
        try{
            const res = await api.post("/registration",{
                password: data.password,
                email: data.email,
                first_name: data.first_name,
                second_name: data.second_name,
                middle_name: data.middle_name,
                date: new Date(),
            })
            console.log("reg: ",res.data);
            const res_user=res.data.user;
            return {
                id: res_user.id,
                first_name: res_user.first_name,
                second_name: res_user.second_name,
                middle_name: res_user.middle_name,
                avatar: res_user.avatar,
                email: res_user.email,
                phone: res_user.phone,
                accessToken: res.data.access,
            }
        }catch(err){
            console.error(err)
        }
    }

    static async code(email:string, type: CodeType){
        try{
            const res = await api.post("/code",{
                email:email,
                type: type
            })
            console.log("code: ",email, type);
            return res.data.send;
        }catch(err){
            console.error(err)
        }
    }

    static async confirm(email:string, code:string){
        try{
            const res = await api.post("/confirm",{
                email:email,
                code: code
            })
            console.log("confirm: ",email, code);
            return res.data.confirm;
        }catch(err){
            console.error(err)
        }
    }

    static async newPassword(data: ForgetStoryType){
        try{
            const res = await api.patch("/new/password",{
                password: data.password,
                email: data.email,
            })
            console.log("newPassword: ",res.data);
            const res_user=res.data.user;
            return {
                id: res_user.id,
                first_name: res_user.first_name,
                second_name: res_user.second_name,
                middle_name: res_user.middle_name,
                avatar: res_user.avatar,
                email: res_user.email,
                phone: res_user.phone,
                accessToken: res.data.access,
            }
        }catch(err){
            console.error(err)
        }
    }

    static async newSecurity(data: SecurityStoryType){
        try{
            const res = await api.patch("/new/security", {
                password: data.password,
                phone: data.phone,
                email: data.email
            });

            console.log("newSecurity", res.data);
            const res_user=res.data.user;
            return {
                id: res_user.id,
                first_name: res_user.first_name,
                second_name: res_user.second_name,
                middle_name: res_user.middle_name,
                avatar: res_user.avatar,
                email: res_user.email,
                phone: res_user.phone,
                accessToken: res.data.access,
            }
        }catch(err){  
            console.error(err);
        }
    }

    static async newData(user: UserType, file: File | null){
        console.log(file)
        try{
            const formData = new FormData();
        
            // Добавляем каждое поле по отдельности (не JSON строку)
            formData.append('first_name', user.first_name);
            formData.append('second_name', user.second_name);
            formData.append('middle_name', user.middle_name);
            
            if (file) {
                formData.append('avatar', file);
            }
    
            const res = await api.patch("/new/data", formData, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
    
            const res_user = res.data.user;
            console.log("newData: ", res.data);
            return {
                id: res_user.id,
                first_name: res_user.first_name,
                second_name: res_user.second_name,
                middle_name: res_user.middle_name,
                avatar: res_user.avatar,
                email: res_user.email,
                phone: res_user.phone,
                accessToken: res.data.access,
            } as UserType;
        }catch(err){
            console.error(err);
        }
    }

    static async delete(user: UserType){
        try{
            const res = await api.delete("/delete", {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
    
            console.log("Аккаунт успешно удален:", res.data);
            return true;
        }catch(err){
            console.error(err);
        }
    }
}