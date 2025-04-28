import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"


import {paths} from "@/shared/const"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import {actions as actionsCode} from "@/shared/store/slice/code"
import {actions as actionsAuth} from "@/shared/store/slice/auth"

import type { SubmitLoginType } from "@/features/login";
import LoginForm from "@/features/login";
import UserAPI from "@/shared/api/user";

import Log from "@/entities/log";
import { useState } from "react";


function Auth(){
    
    const [log,setLog] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function onSubmit(values: SubmitLoginType) {
        const res = await UserAPI.code(values.email, "auth");
        if(!res) {
            setLog(true);
            return;
        }
        dispatch(actionsCode.setType("auth"));
        dispatch(actionsAuth.setData(values));
        setLog(false);
        navigate(paths.code);
    }


    return(
        <div className="h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Вход в систему</h1>
                    <Separator />
                </div>
                <LoginForm authGithub={UserAPI.loginGitHub} authGoogle={UserAPI.loginGoogle} onSubmit={onSubmit}/>
            </Screen>
            {log &&
                <Log name="Ошибка входа" message="Возможно вам стоит перезагрузить страницу или зайти позже" type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Auth