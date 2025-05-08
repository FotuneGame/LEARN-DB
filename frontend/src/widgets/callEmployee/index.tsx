import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"
import { Carousel,CarouselContent, CarouselItem, CarouselPrevious,CarouselNext } from "@/shared/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useState, useLayoutEffect, useRef } from "react";
import {getEmployees} from "./api";
import type {EmployeeType} from "@/types";
import EmployeeCard from "@/entities/employee";


interface IProps extends React.HTMLAttributes<HTMLElement>{
    name?: string
    delay: number,
}


function CallEmployeeWidget({name, delay, ...props}:IProps){

    const [employees, setEmployees] = useState<Array<EmployeeType>|null>(null);
    const plugin = useRef(Autoplay({ delay: delay, stopOnInteraction: true }));

    useLayoutEffect(()=>{
        const getData = async()=>{
            const data = await getEmployees();
            if(!data) return;
            setEmployees(data);
        }
        getData();
    },[]);


    return(
        <Screen {...props} className={"flex flex-col gap-8 justify-center relative rounded-xl "+props.className}>

            <div className="flex flex-col gap-2">
                <h3 className="text-3xl">{name}</h3>
                <Separator />
            </div>
            <Carousel plugins={[plugin.current]} >
                <CarouselContent>
                    {employees && employees.map((employee, index) => {
                            if(employee.first_name === "Не указан" && employee.second_name === "Не указан" && employee.middle_name === "Не указан")
                                return null;
                            return (
                            <CarouselItem key={"employee_call_now_"+index}>
                                <EmployeeCard employee={employee}/>
                            </CarouselItem>
                            )
                        }
                    )}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext />
            </Carousel>
        </Screen>
    );
}

export default CallEmployeeWidget;