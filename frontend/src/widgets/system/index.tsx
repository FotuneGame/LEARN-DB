import { UserType } from "@/types"
import UserAPI from "@/api/user"
import type { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import {actions as actionsCode} from "@/store/slice/code"
import { useNavigate } from "react-router-dom"

import type { SubmitSystemType } from "@/components/form/system"
import SystemForm from "@/components/form/system"
import {paths} from "@/pages"


function SystemWidget (props: {user: UserType}){
    const email = useSelector((state:RootState)=>state.user.email);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    async function onSubmit(value:SubmitSystemType){
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