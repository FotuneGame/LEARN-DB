import EmployeeAPI from "@/shared/api/employee"



export const loadList = async () =>{
    try{
        const list = await EmployeeAPI.getStatistics();
        return list;
    }catch(err){
        return [];
    }
}