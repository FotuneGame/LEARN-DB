import ClientAPI from "@/shared/api/client";
import EmployeeAPI from "@/shared/api/employee";
import SpecialistAPI from "@/shared/api/specialist";
import ProblemAPI from "@/shared/api/problem";
import AnswerAPI from "@/shared/api/answer";

export const getCounts = async () => {
    try{
        const clients = await ClientAPI.getListAll();
        const employees = await EmployeeAPI.getListAll();
        const specialists = await SpecialistAPI.getListAll();
        const problems = await ProblemAPI.getListAll();
        const answers = await AnswerAPI.getListAll();

        return {
            clients: clients ? clients.length : 0,
            employees: employees ? employees.length : 0,
            specialists: specialists ? specialists.length : 0,
            problems: problems ? problems.length : 0,
            answers: answers ? answers.length : 0 
        }
    }catch(err){
        console.error(err);
        return 0;
    }
}