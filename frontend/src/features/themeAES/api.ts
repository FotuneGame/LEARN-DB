import AnswerAPI from "@/shared/api/answer";
import EmployeeAPI from "@/shared/api/employee";
import SpecialistAPI from "@/shared/api/specialist";
import ThemeAPI from "@/shared/api/theme"


export const listOfFindTheme = async (id_theme:number)=>{
    try{
        const list = await ThemeAPI.find(id_theme);
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}


export const listOfAnswers = async ()=>{
    try{
        const list = await AnswerAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const listOfEmployees = async ()=>{
    try{
        const list = await EmployeeAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const listOfSpecialists = async ()=>{
    try{
        const list = await SpecialistAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}