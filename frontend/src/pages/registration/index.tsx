import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"


import {paths} from "@/shared/const"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import {actions as actionsCode} from "@/shared/store/slice/code"
import {actions as actionsRegistration} from "@/shared/store/slice/registration"

import type { SubmitRegistrationType } from "@/features/registration";
import RegistrationForm from "@/features/registration"

import UserAPI from "@/shared/api/user";

import Log from "@/entities/log";
import { useState } from "react";




function Registration(){

    const [log,setLog] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    async function onSubmit(values: SubmitRegistrationType) {
        const res = await UserAPI.code(values.email, "registration");
        if(!res) {
            setLog(true);
            return;
        }
        dispatch(actionsCode.setType("registration"));
        dispatch(actionsRegistration.setData(values));
        setLog(false);
        navigate(paths.code);
    }


    return(
        <div className="md:h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Регистрация</h1>
                    <Separator />
                </div>
                <RegistrationForm onSubmit={onSubmit}/>
            </Screen>
            {log &&
                <Log name="Ошибка регистрации" message="Возможно вам стоит попробовать снова или зайти позже" type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Registration