import type { SubmitAccountType } from "@/features/account"
import AccountForm from "@/features/account"
import { useState } from "react"

import UserAPI from "@/shared/api/user"
import { useDispatch } from "react-redux"
import {actions as actionsUser} from "@/shared/store/slice/user"
import { UserType } from "@/types"

import Log from "@/entities/log";



function AccountWidget(props: {user: UserType}){
    const dispatch = useDispatch();
    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);

    const [defaultValues, setDefaultValues] = useState<SubmitAccountType>({
        first_name: props.user.first_name,
        second_name: props.user.second_name,
        middle_name: props.user.middle_name,
        file: null,
    });

    async function onSubmit(values:SubmitAccountType){
        setLoad(true);
        setDefaultValues({
            first_name: values.first_name,
            second_name: values.second_name,
            middle_name: values.middle_name,
            file: values.file,
          });
        try{
            const res = await UserAPI.newData(
            {
                ...props.user,
                first_name: values.first_name,
                second_name: values.second_name,
                middle_name: values.middle_name,
            },values.file);
            if(!res){
                setLog(true);
                return;
            }
            setLog(false);
            dispatch(actionsUser.setUser(res));
        }catch(err){
            console.error(err);
        }finally{
            setLoad(false);
        }
    }

    return(
        <> 
            <AccountForm onSubmit={onSubmit} user={props.user} load={load} defaultValues={defaultValues}/>
            {log &&
                <Log name="Ошибка изменения данных аккаунта" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </>
    )
}

export default AccountWidget;