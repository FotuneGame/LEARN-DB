import Screen from "@/components/screen"
import { Separator } from "@/components/ui/separator"

import { paths } from ".";
import { useNavigate } from "react-router-dom"
import { useState } from "react";


import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import {actions as actionsForget} from "@/store/slice/forget"
import {actions as actionsCode} from "@/store/slice/code"
import {actions as actionsUser} from "@/store/slice/user"

import UserAPI from "@/api/user"

import type { SubmitNewPasswordType } from "@/components/form/newPassword";
import NewPasswordForm from "@/components/form/newPassword";



function NewPassword(){

    const forget = useSelector( (state:RootState) => state.forget);
    const [load,setLoad] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    async function onSubmit(values: SubmitNewPasswordType) {
        setLoad(true);
        try{
            const user = await UserAPI.newPassword({...forget, password:values.password});
            if(!user) return;
            dispatch(actionsUser.setUser(user));
            dispatch(actionsCode.setDefault());
            dispatch(actionsForget.setDefault());
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
        </div>
    )
}

export default NewPassword;