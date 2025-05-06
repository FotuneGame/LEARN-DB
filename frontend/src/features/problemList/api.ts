import ProblemAPI from "@/shared/api/problem"



export const loadList = async (limit: number, offset: number) =>{
    try{
        const list = await ProblemAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}