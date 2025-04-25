import { api } from "..";
import { AuthStoryType, RegistrationStoryType, ForgetStoryType, UserType, SecurityStoryType, CodeType } from "@/types";

export default class UserAPI{

    static async login(data:AuthStoryType){
        try{
            /*
            const res = await api.get<{
                some: string,
            }>("/login",{});
        
            return res.data;*/
            console.log("login: ",data);
            return {
                id: 1,
                first_name: "Григорий",
                second_name: "Титов",
                middle_name: "Алексеевич",
                avatar: "",
                email: "titovgrisha04@gmail.com",
                phone: "89533496109",
                accessToken: "2324rfe",
            }
        }catch(err){
            console.error(err);
        }
    }

    static async registration(data:RegistrationStoryType){
        console.log("reg: ",data);
        return {
            id: 1,
            first_name: "Григорий",
            second_name: "Титов",
            middle_name: "Алексеевич",
            avatar: "",
            email: "titovgrisha04@gmail.com",
            phone: "89533496109",
            accessToken: "2324rfe",
        }
    }

    static async code(email:string, type: CodeType){
        console.log("code: ",email, type);
        return "qwerty";
    }

    static async confirm(code:string){
        console.log("confirm: ",code);
        return true;
    }

    static async newPassword(data: ForgetStoryType){
        console.log("newPassword: ",data);
        return {
            id: 1,
            first_name: "Григорий",
            second_name: "Титов",
            middle_name: "Алексеевич",
            avatar: "",
            email: "titovgrisha04@gmail.com",
            phone: "89533496109",
            accessToken: "2324rfe",
        };
    }

    static async newSecurity(data: SecurityStoryType){
        console.log("newSecurity: ",data);
        return {
            id: 1,
            first_name: "Григорий",
            second_name: "Титов",
            middle_name: "Алексеевич",
            avatar: "",
            email: data.email,
            phone: data.phone,
            accessToken: "2324rfe",
        };
    }

    static async newData(user: UserType, file: File | null){
        console.log("newData: ",user, file);
        return user;
    }

    static async delete(user: UserType){
        console.log("delete account: ");
        return false;
    }
}