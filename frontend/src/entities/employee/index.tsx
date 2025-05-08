import { EmployeeType } from "@/types";
import { Button } from "@/shared/ui/button";
import {Card, CardHeader, CardDescription, CardFooter} from "@/shared/ui/card"


interface ServiceCardProps extends React.HTMLAttributes<HTMLElement> {
    employee:EmployeeType
}

function EmployeeCard({employee, ...props}:ServiceCardProps){
    return(
        <Card className={"flex flex-col"+props.className} {...props}>
            <CardHeader className="text-2xl">
                {`${employee.second_name} ${employee.first_name} ${employee.middle_name}`}
            </CardHeader>
            <CardDescription className="px-6">
                {employee.post}
            </CardDescription>
            <CardFooter className="w-full flex justify-center md:justify-end">
                <div className="w-full md:w-auto flex flex-col md:flex-row gap-1">
                    {employee.phone && employee.phone!=="Не указан"  && 
                        <Button className="w-full md:w-auto">
                            <a className="m-2" href={"tel:"+employee.phone}>{employee.phone}</a>
                        </Button>
                    }
                    {employee.email && employee.email!=="Не указан" && 
                        <Button className="w-full md:w-auto">
                            <a className=" m-2" href={"mailto:"+employee.email}>{employee.email}</a>
                        </Button>
                    }
                </div>
            </CardFooter>
        </Card>
    );
}

export default EmployeeCard;