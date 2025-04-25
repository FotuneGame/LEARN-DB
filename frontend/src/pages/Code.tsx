import Screen from "@/components/screen"
import { Separator } from "@/components/ui/separator"

import { paths } from ".";
import { useNavigate } from "react-router-dom"
import { useState } from "react"


import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import {actions as actionsForget} from "@/store/slice/forget"
import {actions as actionsRegistration} from "@/store/slice/registration";
import {actions as actionsAuth} from "@/store/slice/auth";
import {actions as actionsSecurity} from "@/store/slice/security";
import {actions as actionsCode} from "@/store/slice/code"
import {actions as actionsUser} from "@/store/slice/user"

import UserAPI from "@/api/user"
import {useTimer} from "@/hooks";

import type { SubmitCodeType } from "@/components/form/code";
import CodeForm from "@/components/form/code";




function Code(){

    const email = useSelector((state: RootState) => {
        switch(state.code.type) {
        case "auth": return state.auth.email;
        case "forget": return state.forget.email;
        case "registration": return state.registration.email;
        case "security": return state.security.email;
        case "delete_account": return state.user.email;
        default: return "";
        }
    });

    const auth = useSelector( (state:RootState) => state.auth);
    const registration = useSelector( (state:RootState) => state.registration);
    const security = useSelector( (state:RootState) => state.security);
    const code = useSelector( (state:RootState)=> state.code);
    const user = useSelector( (state:RootState)=> state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [time,reloadTimer] = useTimer();
    const [load,setLoad] = useState<boolean>(false);
    

    async function onSubmit(values: SubmitCodeType) {
        setLoad(true);
        try{
            const confirm = await UserAPI.confirm(values.code);
            if(!confirm) return false;
            let new_user;
            switch (code.type){
                case "auth":
                    new_user = await UserAPI.login(auth);
                    if(!new_user) return false;
                    dispatch(actionsUser.setUser(new_user));
                    dispatch(actionsCode.setDefault());
                    dispatch(actionsAuth.setDefault());
                    navigate(paths.main);
                    break;
                case "forget":
                    dispatch(actionsForget.setConfirm(confirm));
                    navigate(paths.newPassword);
                    break;
                case "registration":
                    new_user = await UserAPI.registration(registration);
                    if(!new_user) return false;
                    dispatch(actionsUser.setUser(new_user));
                    dispatch(actionsCode.setDefault());
                    dispatch(actionsRegistration.setDefault());
                    navigate(paths.main);
                    break;
                case "security":
                    new_user = await UserAPI.newSecurity(security);
                    if(!new_user) return false;
                    dispatch(actionsUser.setUser(new_user));
                    dispatch(actionsCode.setDefault());
                    dispatch(actionsSecurity.setDefault());
                    navigate(paths.setting);
                    break;
                case "delete_account":
                    new_user = await UserAPI.delete(user);
                    if(new_user) return false;
                    dispatch(actionsUser.setDefault());
                    dispatch(actionsCode.setDefault());
                    navigate(paths.main);
                    break;
                default:
                    alert("Простите, но попрбуйте ещё раз, без перезагрузки страницы")
                    navigate(paths.main);
                    break;
            }
        }catch (err){
            console.error(err);
        }finally{
            setLoad(false);
        }
    }


    async function resendCode(e:React.MouseEvent){
        e.preventDefault();
        reloadTimer();
        if (!email) return;
        try {
            await UserAPI.code(email,code.type);
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <div className="h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Подтверждение</h1>
                    <Separator />
                </div>
                <CodeForm onSubmit={onSubmit} load={load} time={time} resendCode={resendCode}/>
            </Screen>
        </div>
    )
}

export default Code;