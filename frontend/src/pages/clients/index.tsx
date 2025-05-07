import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

import ClientsList from "@/features/clientsList";
import ClientForm, {SubmitClientType} from "@/features/client";
import { ClientType } from "@/types";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import Log from "@/entities/log";
import ClientAPI from "@/shared/api/client";
import ClientProblmsForm, { SubmitClientProblemsType } from "@/features/clientProblems";





function Clients(){

    const employee = useSelector((state:RootState)=>state.employee);
    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [client,setClient] = useState<ClientType | null>(null);
    const [defaultValues,setDefaultValues] = useState<SubmitClientType>({
        first_name: "",
        second_name: "",
        middle_name: "",
        id_employee: employee.id.toString()
    });

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);
    const [reload,setReload] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setClient({...defaultValues, id:-1, id_employee: employee.id});
            setDefaultValues({
                first_name: "",
                second_name: "",
                middle_name: "",
                id_employee: employee.id.toString()
            });
            return;
        }
        try{
            const newClient = await ClientAPI.getById(id);
            if(newClient){
                setDefaultValues({ 
                    first_name: newClient.first_name,
                    second_name: newClient.second_name,
                    middle_name: newClient.middle_name,
                    id_employee: newClient.id_employee.toString()
                });
            }else{
                setDefaultValues({
                    first_name: "",
                    second_name: "",
                    middle_name: "",
                    id_employee: employee.id.toString()
                });
            }
            setClient(newClient);
        }catch(err){
            setLog(true);
            setClient(null);
        }
    }


    async function onSubmit(value:SubmitClientType) {
        if(!access || !client) return;
        setLoad(true);
        try{
            let newClient = null;
            if(client.id > 0){
                newClient = await ClientAPI.update(access, {
                    id: client.id,
                    ...value,
                    id_employee: Number(value.id_employee)
                });
            }else{
                newClient = await ClientAPI.add(access, {
                    id: -1,
                    ...value,
                    id_employee: Number(value.id_employee)
                });
            }
            if(!newClient)
                setLog(true);
            setClient(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                first_name: "",
                second_name: "",
                middle_name: "",
                id_employee: employee.id.toString()
            })
        }
    }

    async function onSubmitCP(values:SubmitClientProblemsType) {
        console.log(values)
        if(!access || !client) return;
        setLoad(true);
        try{
            let newCP = null;
            if(client.id > 0){
                newCP = await ClientAPI.connection(access, {
                    id_client: client.id,
                    arr_problems: values.arr_problems,
                });
            }
            if(!newCP)
                setLog(true);
            setClient(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            const res = await ClientAPI.delete(access, id);
            if(!res)
                setLog(true);
            setClient(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                first_name: "",
                second_name: "",
                middle_name: "",
                id_employee: employee.id.toString()
            })
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
                        <h1 className="text-2xl">Клиенты</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить нового клиента</Button>
                    </div>
                    <Separator />
                </div>
                {client &&
                    <>
                        <ClientForm onSubmit={onSubmit} onRemove={onRemove} client={client} load={load} defaultValues={defaultValues}/>
                        {client.id > 0 && 
                            <>
                                <Separator className="my-6"/>
                                <ClientProblmsForm onSubmit={onSubmitCP}  client={client} load={load}/>
                            </>
                        }
                    </>
                }
            </div>
            <ClientsList callback={get} reload={reload}/>
            {log &&
                <Log name="Ошибка применения данных клиента" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Clients