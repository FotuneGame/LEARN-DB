import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"

import {paths} from "@/shared/const"
import { useNavigate } from "react-router-dom"
import { useState } from "react";


import { RootState } from "@/shared/store"
import { useDispatch, useSelector } from "react-redux"
import {actions as actionsForget} from "@/shared/store/slice/forget"
import {actions as actionsCode} from "@/shared/store/slice/code"
import {actions as actionsUser} from "@/shared/store/slice/user"

import UserAPI from "@/shared/api/user"

import type { SubmitNewPasswordType } from "@/features/newPassword";
import NewPasswordForm from "@/features/newPassword";

import Log from "@/entities/log";



function NewPassword(){

    const [log,setLog] = useState<boolean>(false);
    const forget = useSelector( (state:RootState) => state.forget);
    const [load,setLoad] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    async function onSubmit(values: SubmitNewPasswordType) {
        setLoad(true);
        try{
            const user = await UserAPI.newPassword({...forget, password:values.password});
            if(!user) {
                setLog(true);
                return;
            }
            dispatch(actionsUser.setUser(user));
            dispatch(actionsCode.setDefault());
            dispatch(actionsForget.setDefault());
            setLog(false);
            navigate(paths.main);
        }catch(err){
            console.error(err);
        }finally{
            setLoad(false);
        }
    }


    return(
        <div className="h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Новый пароль</h1>
                    <Separator />
                </div>
                <NewPasswordForm onSubmit={onSubmit} load={load}/>
            </Screen>
            {log &&
                <Log name="Ошибка смены пароля" message="Возможно вам стоит попробовать снова или зайти позже" type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default NewPassword;