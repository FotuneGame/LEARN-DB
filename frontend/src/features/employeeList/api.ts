import EmployeeAPI from "@/shared/api/employee"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await EmployeeAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}