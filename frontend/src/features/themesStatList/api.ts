import ThemesAPI from "@/shared/api/theme"



export const loadList = async () =>{
    try{
        const list = await ThemesAPI.getStatistics();
        return list;
    }catch(err){
        return [];
    }
}