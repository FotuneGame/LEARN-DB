import SpecialistAPI from "@/shared/api/specialist"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await SpecialistAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}