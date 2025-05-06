import CallApi from "@/shared/api/call"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await CallApi.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}