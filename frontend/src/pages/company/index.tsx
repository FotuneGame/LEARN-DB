import MainWidget from "@/widgets/main";
import StatisitcsAllWidget from "@/widgets/statisticsAll";
import StatisitcsWidget from "@/widgets/statistics"

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import StatisticsIMG from "/imgs/statistics.jpg"

function Company(){

    const employee = useSelector((state:RootState)=>state.employee);
    const access = useSelector((state:RootState)=>state.user.accessToken);
    
    if(!access || !employee.id)
        return(
            <div className="flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl">Прежде чем приступить, подождите пока администратор привяжет вас к системе...</h1>
            </div>
        )
    return(
        <div className="flex flex-col items-center md:items-start gap-4 mb-12">
            <MainWidget img={StatisticsIMG}>
                <h1 className="text-6xl text-center md:text-start text-white">Компания и статистика</h1>
            </MainWidget>
            <StatisitcsAllWidget duration={1000} name="Краткая сводка" className="mt-12"/>
            <StatisitcsWidget />
        </div>
    )
}

export default Company