import EmployeeAPI from "@/shared/api/employee";

export const listOfEmployees = async ()=>{
    try{
        const list = await EmployeeAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}