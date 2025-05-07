import ThemeAPI from "@/shared/api/theme"


export const listOfTheme = async ()=>{
    try{
        const list = await ThemeAPI.getListAll();
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const listOfFinds = async (id_theme:number) =>{
    try{
        const list = await ThemeAPI.find(id_theme);
        return list;
    }catch(err){
        console.error(err);
        return null;
    }
}