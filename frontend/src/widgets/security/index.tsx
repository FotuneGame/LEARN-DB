import { useState } from "react"
import { UserType } from "@/types"
import UserAPI from "@/shared/api/user"
import { useDispatch } from "react-redux"
import {actions as actionsCode} from "@/shared/store/slice/code"
import {actions as actionSecurity} from "@/shared/store/slice/security"
import type { SubmitSecurityType } from "@/features/security"
import SecurityForm from "@/features/security"

import {paths} from "@/shared/const"
import { useNavigate } from "react-router-dom"



function SecurityWidget (props: {user: UserType}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState<SubmitSecurityType>({
        email: props.user.email,
        phone: props.user.phone,
        password: "",
        passwordReapet: "",
    });
    

    async function onSubmit(values: SubmitSecurityType ){
        setDefaultValues({
            email: values.email,
            phone: values.phone,
            password: values.password,
            passwordReapet: values.passwordReapet,
        })
        try{
            const res = await UserAPI.code(values.email, "security");
            if(!res) return;
            dispatch(actionsCode.setType("security"));
            dispatch(actionSecurity.setData({
                email: values.email,
                phone: values.phone,
                password: values.password
            }))
            navigate(paths.code);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <SecurityForm onSubmit={onSubmit} defaultValues={defaultValues}/>
    )
}

export default SecurityWidget;