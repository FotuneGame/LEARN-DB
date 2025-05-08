import Screen from "@/shared/ui/screen";
import { Button } from "@/shared/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/ui/tabs";
import { Loader2 } from "lucide-react";
import EmployeesStatList from "@/features/employeesStatList";
import ThemesStatList from "@/features/themesStatList";
import SpecialistsStatList from "@/features/specialistsStatList";
import Log from "@/entities/log";
import {loadFile} from "./api";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { useState } from "react";




interface IProps extends React.HTMLAttributes<HTMLElement>{}

function StatisitcsWidget(props:IProps){

    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [log,setLog] = useState<boolean>(false);
    const [load,setLoad] = useState<boolean>(false);

    const download = async () =>{
        setLoad(true);
        try{
            if(access)
                await loadFile(access);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
        }
    }

    return(
        <Screen 
            {...props} 
            className={`flex flex-col gap-6 relative overflow-hidden w-full ${props.className}`}
        >   
            <Tabs defaultValue="themes" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="themes">Темы</TabsTrigger>
                    <TabsTrigger value="employees">Сотрудники</TabsTrigger>
                    <TabsTrigger value="specialists">Специалисты</TabsTrigger>
                </TabsList>
                <TabsContent value="themes">
                    <ThemesStatList />
                </TabsContent>
                <TabsContent value="employees">
                    <EmployeesStatList />
                </TabsContent>
                <TabsContent value="specialists">
                    <SpecialistsStatList />
                </TabsContent>
            </Tabs>
            <div className="flex justify-center md:justify-start w-full">
                <Button onClick={download} disabled={load}>
                    {load ? <Loader2 className="animate-spin" /> : "Скачать отчет"}
                </Button>
            </div>
            {log &&
                <Log name="Ошибка загрузки файла..." message="Возможно необходимо перезайти в систему..." type="error" callback={()=>setLog(false)}/>
            }
        </Screen>
    );
}

export default StatisitcsWidget;