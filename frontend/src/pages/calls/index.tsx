import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

import CallsList from "@/features/callsList";
import CallForm, {SubmitCallType} from "@/features/call";
import { CallType } from "@/types";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import Log from "@/entities/log";
import CallAPI from "@/shared/api/call";






function Calls(){

    const employee = useSelector((state:RootState)=>state.employee);
    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [call,setCall] = useState<CallType | null>(null);
    const [defaultValues,setDefaultValues] = useState<SubmitCallType>({
        phone: "",
        date: "",
        time: "",
        id_client: "",
        is_spam: false
    });

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);
    const [reload,setReload] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setCall({
                id:-1,
                id_client: -1,
                phone: defaultValues.phone,
                is_spam: defaultValues.is_spam,
                date: "",
                time: "",
            });
            setDefaultValues({
                phone: "",
                date: "",
                time: "",
                id_client: "",
                is_spam: false
            });
            return;
        }
        try{
            const newCall = await CallAPI.getById(id);
            if(newCall){
                setDefaultValues({ 
                    phone: newCall.phone,
                    date: newCall.date,
                    time: newCall.time,
                    id_client: newCall.id_client.toString(),
                    is_spam: newCall.is_spam
                });
            }else{
                setDefaultValues({
                    phone: "",
                    date: "",
                    time: "",
                    id_client: "",
                    is_spam: false
                });
            }
            setCall(newCall);
        }catch(err){
            setLog(true);
            setCall(null);
        }
    }


    async function onSubmit(value:SubmitCallType) {
        if(!access || !call) return;
        setLoad(true);
        try{
            let newCall = null;
            if(call.id > 0){
                newCall = await CallAPI.update(access, {
                    id: call.id,
                    ...value,
                    id_client: Number(value.id_client)
                });
            }else{
                newCall = await CallAPI.add(access, {
                    id: -1,
                    ...value,
                    id_client: Number(value.id_client)
                });
            }
            if(!newCall)
                setLog(true);
            setCall(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                phone: "",
                date: "",
                time: "",
                id_client: "",
                is_spam: false
            })
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            const res = await CallAPI.delete(access, id);
            if(!res)
                setLog(true);
            setCall(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                phone: "",
                date: "",
                time: "",
                id_client: "",
                is_spam: false
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
                        <h1 className="text-2xl">Звонки</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить нового звонка</Button>
                    </div>
                    <Separator />
                </div>
                {call &&
                    <CallForm onSubmit={onSubmit} onRemove={onRemove} call={call} load={load} defaultValues={defaultValues}/>
                }
            </div>
            <CallsList callback={get} reload={reload}/>
            {log &&
                <Log name="Ошибка применения данных звонка" message="Попробуйте позже. Если стоит галочка СПАМ, то поменять звонок нельзя!" type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Calls