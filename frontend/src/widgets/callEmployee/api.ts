import EmployeeAPI from "@/shared/api/employee";

export const getEmployees = async () => {
    try{
        const employees = await EmployeeAPI.getListAll();
        if(!employees)
            return null;
        return employees;
    }catch(err){
        console.error(err);
        return null;
    }
}