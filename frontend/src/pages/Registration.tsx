import Screen from "@/components/screen"
import { Separator } from "@/components/ui/separator"


import { paths } from ".";
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import {actions as actionsCode} from "@/store/slice/code"
import {actions as actionsRegistration} from "@/store/slice/registration"

import type { SubmitRegistrationType } from "@/components/form/registration";
import RegistrationForm from "@/components/form/registration"

import UserAPI from "@/api/user";



function Registration(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    async function onSubmit(values: SubmitRegistrationType) {
        const res = await UserAPI.code(values.email, "registration");
        if(!res) return;
        dispatch(actionsCode.setType("registration"));
        dispatch(actionsRegistration.setData(values));
        navigate(paths.code);
    }


    return(
        <div className="md:h-[80vh] flex items-center justify-center">
            <Screen className="flex flex-col items-start gap-8 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Регистрация</h1>
                    <Separator />
                </div>
                <RegistrationForm onSubmit={onSubmit}/>
            </Screen>
        </div>
    )
}

export default Registration