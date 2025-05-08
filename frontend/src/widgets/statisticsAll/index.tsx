import Screen from "@/shared/ui/screen";
import GrowNumber from "@/shared/ui/growNumber";
import { Separator } from "@/shared/ui/separator";
import { useState, useLayoutEffect } from "react";
import {getCounts} from "./api";

interface IProps extends React.HTMLAttributes<HTMLElement>{
    duration: number,
    name?: string
}


function StatisitcsAllWidget({duration, name, ...props}:IProps){

    const [countOfClient, setCountOfClient] = useState<number>(0);
    const [countOfEmploee, setCountOfEmployee] = useState<number>(0);
    const [countOfSpecialist, setCountOfSpecialist] = useState<number>(0);
    const [countOfProblem, setCountOfProblem] = useState<number>(0);
    const [countOfAnswer, setCountOfAnswer] = useState<number>(0);

    useLayoutEffect(()=>{
        const getData = async()=>{
            const data = await getCounts();
            if(!data) return;
            setCountOfClient(data.clients);
            setCountOfEmployee(data.employees);
            setCountOfSpecialist(data.specialists);
            setCountOfProblem(data.problems);
            setCountOfAnswer(data.answers);
        }
        getData();
    },[])

    return(
        <Screen 
            {...props} 
            className={`flex flex-col gap-12 relative overflow-hidden rounded-xl w-full ${props.className}`}
        >   
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl text-center md:text-start">{name}</h1>
                <Separator />
            </div>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-12">
                <div className="flex gap-4">
                    <h3 className="text-xl">Кол-во клиентов:</h3>
                    <GrowNumber className="text-xl font-bold" value={countOfClient} duration={duration}/>
                </div>
                <div className="flex  gap-4">
                    <h3 className="text-xl">Кол-во сотрудников:</h3>
                    <GrowNumber className="text-xl font-bold" value={countOfEmploee} duration={duration}/>
                </div>
                <div className="flex  gap-4">
                    <h3 className="text-xl">Кол-во специалстов:</h3>
                    <GrowNumber className="text-xl font-bold" value={countOfSpecialist} duration={duration}/>
                </div>
                <div className="flex  gap-4">
                    <h3 className="text-xl">Кол-во проблемм:</h3>
                    <GrowNumber className="text-xl font-bold" value={countOfProblem} duration={duration}/>
                </div>
                <div className="flex gap-4">
                    <h3 className="text-xl">Кол-во решений:</h3>
                    <GrowNumber className="text-xl font-bold" value={countOfAnswer} duration={duration}/>
                </div>
            </div>
        </Screen>
    );
}

export default StatisitcsAllWidget;