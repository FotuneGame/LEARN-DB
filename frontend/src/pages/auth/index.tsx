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



function Auth(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function onSubmit(values: SubmitLoginType) {
        const res = await UserAPI.code(values.email, "auth");
        if(!res) return;
        dispatch(actionsCode.setType("auth"));
        dispatch(actionsAuth.setData(values));
        navigate(paths.code);
    }


    return(
        <div className="h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Вход в систему</h1>
                    <Separator />
                </div>
                <LoginForm onSubmit={onSubmit}/>
            </Screen>
        </div>
    )
}

export default Auth