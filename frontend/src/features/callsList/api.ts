import CallAPI from "@/shared/api/call"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await CallAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}