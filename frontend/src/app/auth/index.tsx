import { ReactElement, useEffect } from 'react';
import UserAPI from '@/shared/api/user';
import {actions as acionsUser} from "@/shared/store/slice/user";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/store';



function Auth(props:{children: ReactElement}){

    const userOld = useSelector((state:RootState)=>state.user);
    const dispatch = useDispatch();

    const refreshToken = async () =>{
        try{
            if(userOld && userOld.accessToken){
                const acessToken = await UserAPI.refreshToken(userOld);
                if(!acessToken) return;
                dispatch(acionsUser.setAccessToken(acessToken));
            }
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        refreshToken();
    },[])

    return(
        <>
            {props.children}
        </>
    )
}

export default Auth;