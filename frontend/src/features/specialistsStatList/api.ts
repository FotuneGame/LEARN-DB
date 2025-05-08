import SpecialistAPI from "@/shared/api/specialist"



export const loadList = async () =>{
    try{
        const list = await SpecialistAPI.getStatistics();
        return list;
    }catch(err){
        return [];
    }
}