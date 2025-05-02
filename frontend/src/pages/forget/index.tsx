import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"


import {paths} from "@/shared/const"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import {actions as actionsCode} from "@/shared/store/slice/code"
import {actions as actionsForget} from "@/shared/store/slice/forget"

import type { SubmitForgetType } from "@/features/forget";
import ForgetForm from "@/features/forget";

import UserAPI from "@/shared/api/user";

import Log from "@/entities/log";
import { useState } from "react";




function Forget(){

    const [log,setLog] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    async function onSubmit(values: SubmitForgetType) {
        const res = await UserAPI.code(values.email, "forget");
        if(!res) {
            setLog(true);
            return;
        }
        dispatch(actionsCode.setType("forget"));
        dispatch(actionsForget.setEmail(values.email));
        setLog(false);
        navigate(paths.code);
    }
    
    return(
        <div className="h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Востановление пароля</h1>
                    <Separator />
                </div>
                <ForgetForm onSubmit={onSubmit}/>
            </Screen>
            {log &&
                <Log name="Ошибка востановления" message="Возможно вам стоит перезагрузить страницу или зайти позже" type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Forget