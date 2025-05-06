import EmployeeAPI from "@/shared/api/employee"



export const loadList = async (id_employee: number) =>{
    try{
        const list = await EmployeeAPI.getListProblems(id_employee);
        return list;
    }catch(err){
        return [];
    }
}