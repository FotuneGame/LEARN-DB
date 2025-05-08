import OtherAPI from "@/shared/api/other";

export const loadFile = async (access:string) =>{
    try{

        const res = await OtherAPI.report(access);
        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.json');
        document.body.appendChild(link);
        link.click();
        
        // Очищаем
        if(link.parentNode)
            link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

    }catch(err){
        console.error(err);
        return err as Error;
    }
}