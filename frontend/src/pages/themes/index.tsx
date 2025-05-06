import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

import ThemesList from "@/features/themesList";
import ThemeForm, { SubmitThemeType } from "@/features/theme";
import { ThemeType } from "@/types";
import ThemeAPI from "@/shared/api/theme";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import Log from "@/entities/log";




function Themes(){

    const employee = useSelector((state:RootState)=>state.employee);
    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [theme,setTheme] = useState<ThemeType | null>(null);
    const [defaultValues,setDefaultValues] = useState<SubmitThemeType>({
        name: "",
    });

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);
    const [reload,setReload] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setTheme({id:-1, name: defaultValues.name});
            setDefaultValues({name: ""});
            return;
        }
        try{
            const newTheme = await ThemeAPI.getById(id);
            if(newTheme){
                setDefaultValues({name: newTheme.name});
            }else{
                setDefaultValues({name: ""});
            }
            setTheme(newTheme);
        }catch(err){
            setLog(true);
            setTheme(null);
        }
    }


    async function onSubmit(value:SubmitThemeType) {
        if(!access || !theme) return;
        setLoad(true);
        try{
            let newTheme = null;
            if(theme.id > 0){
                newTheme = await ThemeAPI.update(access, {
                    id: theme.id,
                    name: value.name
                });
            }else{
                newTheme = await ThemeAPI.add(access,{
                    id:-1, 
                    name:value.name
                });
            }
            if(!newTheme)
                setLog(true);
            setTheme(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({name: ""})
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            const res = await ThemeAPI.delete(access,id);
            if(!res)
                setLog(true);
            setTheme(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({name: ""})
        }
    }

    
    if(!access || !employee.id)
        return(
            <div className="flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl">Прежде чем приступить, подождите пока администратор привяжет вас к системе...</h1>
            </div>
        )
    return(
        <div className="flex flex-col  gap-4 mt-8">
            <div className="flex flex-col gap-4 my-12">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        <h1 className="text-2xl">Темы</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить новую тему</Button>
                    </div>
                    <Separator />
                </div>
                {theme &&
                    <ThemeForm onSubmit={onSubmit} onRemove={onRemove} theme={theme} load={load} defaultValues={defaultValues}/>
                }
            </div>
            <ThemesList callback={get} reload={reload}/>
            {log &&
                <Log name="Ошибка применения данных темы" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Themes