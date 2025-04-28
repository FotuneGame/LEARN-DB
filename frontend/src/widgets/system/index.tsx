import UserAPI from "@/shared/api/user"
import type { RootState } from "@/shared/store"
import { useDispatch, useSelector } from "react-redux"
import {actions as actionsCode} from "@/shared/store/slice/code"
import { useNavigate } from "react-router-dom"

import SystemForm from "@/features/system"
import {paths} from "@/shared/const"

import Log from "@/entities/log";
import { useState } from "react";


function SystemWidget (){
    const email = useSelector((state:RootState)=>state.user.email);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [log,setLog] = useState<boolean>(false);

    async function onSubmit(){
        try{
            const res = await UserAPI.code(email, "delete_account");
            if(!res){
                setLog(true);
                return;
            }
            dispatch(actionsCode.setType("delete_account"));
            setLog(false);
            navigator(paths.code);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <>
            <SystemForm onSubmit={onSubmit}/>
            {log &&
                <Log name="Ошибка удаления" message="Возможно вам следует повторить это позже..." type="error" callback={()=>setLog(false)}/>
            }
        </>
    )
}

export default SystemWidget;