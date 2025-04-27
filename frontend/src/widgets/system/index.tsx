import UserAPI from "@/shared/api/user"
import type { RootState } from "@/shared/store"
import { useDispatch, useSelector } from "react-redux"
import {actions as actionsCode} from "@/shared/store/slice/code"
import { useNavigate } from "react-router-dom"

import SystemForm from "@/features/system"
import {paths} from "@/shared/const"


function SystemWidget (){
    const email = useSelector((state:RootState)=>state.user.email);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    async function onSubmit(){
        try{
            const res = await UserAPI.code(email, "delete_account");
            if(!res) return;
            dispatch(actionsCode.setType("delete_account"));
            navigator(paths.code);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <SystemForm onSubmit={onSubmit}/>
    )
}

export default SystemWidget;