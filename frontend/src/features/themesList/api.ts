import ThemesAPI from "@/shared/api/theme"



export const loadList = async (limit: number, offset:number) =>{
    try{
        const list = await ThemesAPI.getList(limit, offset);
        return list;
    }catch(err){
        return [];
    }
}