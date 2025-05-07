import ClientAPI from "@/shared/api/client";
import Problems from "@/shared/api/problem"


export const listOfProblemsClient = async (id_client:number)=>{
    try{
        const list = await ClientAPI.getProblems(id_client);
        return list;
    }catch(err){
        console.error(err);
        return [];
    }
}


export const listAllOfProblems = async ()=>{
    try{
        const list = await Problems.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return [];
    }
}
