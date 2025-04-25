import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/shared/ui/navigation-menu"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import { Link } from "react-router-dom"
import {paths} from "@/shared/const"

import GitHubSVG from "/icons/github.svg";
import YouTubeSVG from "/icons/youtube.svg";



function Footer(){
    return (
        <footer className="flex flex-col min-h-[10vh] mt-2">
            <Separator />
            <div className="flex flex-col gap-4 md:flex-row md:justify-between py-8 ">
                <div className="flex flex-col justify-center">
                    <Link to={paths.main} className="text-xl">Калл-мастер</Link>
                    <label className="text-gray-500">© 2025 Call-master - лучшие B2B</label>
                </div>
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-4 md:gap-2">
                        <NavigationMenuItem>
                            <NavigationMenuLink to={paths.about}>О нас</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink  to={paths.FAQ}>FAQ</NavigationMenuLink> 
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <a href="https://github.com/FotuneGame">
                                <Button>
                                    <img src={GitHubSVG} alt="github"/>
                                </Button>
                            </a>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <a href="https://www.youtube.com/watch?v=3b9OlUhGF8U">
                                <Button>
                                    <img src={YouTubeSVG} alt="youtube"/>
                                </Button>
                            </a>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </footer>
    )
}

export default Footer