import { useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import {actions as acionsUser} from "@/shared/store/slice/user";
import { useDispatch } from 'react-redux';
import { UserType } from "@/types";
import { paths } from "@/shared/const";




function Oauth(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const access = params.get('access');
        const userJson = params.get('user');

        if (access && userJson) {
            try {
                const user:UserType = JSON.parse(decodeURIComponent(userJson));
                user.accessToken = access;
                dispatch(acionsUser.setUser(user));
            } catch (err) {
                console.error(err);
            }finally{
                navigate(paths.main);
            }
        }
    },[]);

    return(
        <section className="flex flex-center min-h-[90h] items-center">
            <h1 className="text-center">Авторизация на сайте...</h1>
        </section>
    )
}

export default Oauth;