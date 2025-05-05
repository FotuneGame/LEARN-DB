import { ReactElement, useEffect } from 'react';
import EmployeeAPI from '@/shared/api/employee';
import {actions as acionsEmployee} from "@/shared/store/slice/employee";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/store';



function AuthEmployee(props:{children: ReactElement}){

    const user = useSelector((state:RootState)=>state.user);
    const dispatch = useDispatch();

    const authEmployee = async () =>{
        try{
            if(user.accessToken){
                const employee = await EmployeeAPI.login(user);
                if(!employee) return;
                dispatch(acionsEmployee.setEmployee(employee));
            }
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        authEmployee();
    },[user.accessToken, user.first_name, user.second_name, user.middle_name, user.phone]);

    return(
        <>
            {props.children}
        </>
    )
}

export default AuthEmployee;