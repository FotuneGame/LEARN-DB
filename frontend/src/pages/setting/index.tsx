import Screen from "@/shared/ui/screen"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/shared/ui/navigation-menu"

import { useState, useEffect } from "react"
import { RootState } from "@/shared/store"
import { useSelector } from "react-redux"
import {paths} from "@/shared/const"
import { useNavigate } from "react-router-dom";
import { UserType } from "@/types"
import AccountWidget from "@/widgets/account";
import SecurityWidget from "@/widgets/security"
import SystemWidget from "@/widgets/system"



function MenuSetting(props: {idScreen:number, user: UserType}){
    switch(props.idScreen){
        case 0: 
            return(
                <AccountWidget user={props.user}/>
            );
        case 1:
            return(
                <SecurityWidget user={props.user}/>
            );
        case 2:
            return(
                <SystemWidget user={props.user}/>
            );
        default:
            return null;
    }
}


function Settings(){

    const [idScreen,setIdScreen] = useState<number>(0);
    const user = useSelector((state:RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.accessToken) navigate(paths.auth);
    }, [user.accessToken, navigate]);
    
    return(
        <div className="flex flex-col items-center md:items-start gap-4 mb-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-center md:text-start">Настройки</h1>
                <Separator className="min-w-[200px] md:min-w-[400px]"/>
            </div>

            <Screen className="flex flex-col gap-4 items-center  md:flex-row justify-between md:min-h-[600px]">
                <NavigationMenu className="flex flex-col items-center justify-start md:items-start md:justify-center">
                    <NavigationMenuList className="flex flex-col items-center md:items-start  gap-2">
                        <NavigationMenuItem>
                            <Button variant={idScreen===0 ? "default" : "ghost"} onClick={()=>setIdScreen(0)}>Основное</Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant={idScreen===1 ? "default" : "ghost"} onClick={()=>setIdScreen(1)}>Безопасность</Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant={idScreen===2 ? "default" : "ghost"} onClick={()=>setIdScreen(2)}>Дополнительное</Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Separator className="hidden md:block md:min-h-[600px] me-12" orientation="vertical" />
                <Separator className="block md:hidden md:min-w-[200px] mb-12" />
                <MenuSetting idScreen={idScreen} user={user}/>
            </Screen>
        </div>
    )
}

export default Settings