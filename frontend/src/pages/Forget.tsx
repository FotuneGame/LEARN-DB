import Screen from "@/components/screen"
import { Separator } from "@/components/ui/separator"


import { paths } from ".";
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import {actions as actionsCode} from "@/store/slice/code"
import {actions as actionsForget} from "@/store/slice/forget"

import type { SubmitForgetType } from "@/components/form/forget";
import ForgetForm from "@/components/form/forget";

import UserAPI from "@/api/user";




function Forget(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    async function onSubmit(values: SubmitForgetType) {
        const res = await UserAPI.code(values.email, "forget");
        if(!res) return;
        dispatch(actionsCode.setType("forget"));
        dispatch(actionsForget.setEmail(values.email));
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
        </div>
    )
}

export default Forget