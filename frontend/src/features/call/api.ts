import ClientAPI from "@/shared/api/client";

export const listOfClients = async ()=>{
    try{
        const list = await ClientAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}