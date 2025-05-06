import ClientAPI from "@/shared/api/client"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await ClientAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}