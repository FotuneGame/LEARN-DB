import AnswerAPI from "@/shared/api/answer"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await AnswerAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}