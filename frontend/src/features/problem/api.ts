import AnswerAPI from "@/shared/api/answer";
import EmployeeAPI from "@/shared/api/employee";
import SpecialistAPI from "@/shared/api/specialist";
import ThemeAPI from "@/shared/api/theme"


export const listOfTheme = async ()=>{
    try{
        const list = await ThemeAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}



export const listOfAnswerByTheme = async (id_theme:number)=>{
    try{
        const list = await AnswerAPI.getListByTheme(id_theme);
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const listOfEmployeeByTheme = async (id_theme: number)=>{
    try{
        const list = await EmployeeAPI.getListByTheme(id_theme);
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const listOfSpecialistByTheme = async (id_theme: number)=>{
    try{
        const list = await SpecialistAPI.getListByTheme(id_theme);
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}
