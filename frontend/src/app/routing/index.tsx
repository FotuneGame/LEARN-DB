import { RouterProvider} from "react-router-dom";
import {router} from '@/app/routing/model';


function Routing(){
    return(
        <RouterProvider router={router}/>
    )
}

export default Routing;