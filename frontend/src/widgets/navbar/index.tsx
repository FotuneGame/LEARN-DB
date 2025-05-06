import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger} from "@/shared/ui/navigation-menu"

import type {PostType, UserType} from "@/types";
import {paths} from "@/shared/const"

import {RootState} from "@/shared/store"
import { useDispatch, useSelector } from "react-redux";
import { actions } from '@/shared/store/slice/user';



function SingMenu (props: {sign: ()=> void}){


    return(
        <>
            <NavigationMenuItem>
                <NavigationMenuLink to={paths.about}>О нас</NavigationMenuLink> 
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Button onClick={props.sign}>
                    Войти
                </Button>
            </NavigationMenuItem>
        </>
    )
}



function AuthedMenu (props: {user:UserType, post: PostType, exit: ()=>void}){

    return (
        <>
            <NavigationMenuLink to={paths.company}>Компания</NavigationMenuLink>
            <NavigationMenuItem>       
                <NavigationMenuTrigger>
                    <Avatar>
                        <AvatarImage src={props.user.avatar} />
                        <AvatarFallback>А</AvatarFallback>
                    </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col gap-2">
                    <NavigationMenuLink to={paths.setting}>Настройки</NavigationMenuLink>
                    <NavigationMenuLink to={paths.calls}>Звонки</NavigationMenuLink>
                    <NavigationMenuLink to={paths.clients}>Клиенты</NavigationMenuLink>
                    <NavigationMenuLink to={paths.problems}>Проблемы</NavigationMenuLink>
                    <NavigationMenuLink to={paths.themes}>Темы</NavigationMenuLink>
                    {props.post === "Админ" && <NavigationMenuLink to={paths.admin}>Админка</NavigationMenuLink>}

                    <Separator className="my-2"/>
                    <Button variant="destructive" onClick={props.exit}>
                        Выйти
                    </Button>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </>
    )
}




function Menu (){
    const user = useSelector((state:RootState) => state.user);
    const post = useSelector((state:RootState) => state.employee.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sign = () =>{
        navigate(paths.auth);
    }
    const exit = async ()=>{
        dispatch(actions.setDefault())
        navigate(paths.main);
    }

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-2">
                {
                    user.accessToken ? <AuthedMenu user={user} post={post} exit={exit}/> : <SingMenu sign={sign}/>
                }
            </NavigationMenuList>
        </NavigationMenu>
    );
}



function Navbar (){
    return(
        <nav className="flex justify-between items-center py-2 mb-4">
            <Link to={paths.main} className="text-xl">Калл-мастер</Link>
            <Menu />
        </nav>
    )
}

export default Navbar