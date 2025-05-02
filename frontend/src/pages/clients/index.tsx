
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";





function Clients(){
    const user = useSelector((state:RootState)=>state.user);
    const employee = useSelector((state:RootState)=>state.employee);

    if(!user.accessToken || !employee.id)
        return(
            <div className="flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl">Прежде чем приступить, подождите пока администратор привяжет вас к системе...</h1>
            </div>
        )
    return(
        <section>
            <h1>Страница сотрудника</h1>
        </section>
    )
}

export default Clients