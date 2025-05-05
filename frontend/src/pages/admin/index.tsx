import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

import EmployeesList from "@/features/employeeList"
import { SubmitEmployeeType } from "@/features/employee";
import EmployeeForm from "@/features/employee";
import { EmployeeType } from "@/types";
import EmployeeAPI from "@/shared/api/employee";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import Log from "@/entities/log";




function Admin(){

    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [employee,setEmployee] = useState<EmployeeType | null>(null);
    const [defaultValues,setDefaultValues] = useState<SubmitEmployeeType>({
        email: "",
        post: "Сотрудник"
    });

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);
    const [reload,setReload] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setEmployee({id:-1, post: defaultValues.post});
            setDefaultValues({
                email: "",
                post: "Сотрудник"
            })
            return;
        }
        try{
            const newEmployee = await EmployeeAPI.getById(id);
            if(newEmployee){
                setDefaultValues({
                    email: newEmployee.email,
                    post: newEmployee.post
                })
            }else{
                setDefaultValues({
                    email: "",
                    post: "Сотрудник"
                })
            }
            setEmployee(newEmployee);
        }catch(err){
            setLog(true);
            setEmployee(null);
        }
    }


    async function onSubmit(value:SubmitEmployeeType) {
        if(!access || !employee) return;
        setLoad(true);
        try{
            let newEmployee = null;
            if(employee.id > 0){
                newEmployee = await EmployeeAPI.update(access, employee.id, value.post, value.email);
            }else{
                newEmployee = await EmployeeAPI.add(access, value.post, value.email);
            }
            if(!newEmployee)
                setLog(true);
            setEmployee(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                email: "",
                post: "Сотрудник"
            })
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            const res = await EmployeeAPI.delete(access,id);
            if(!res)
                setLog(true);
            setEmployee(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                email: "",
                post: "Сотрудник"
            })
        }
    }

    

    return(
        <div className="flex flex-col  gap-4 mt-8">
            <div className="flex flex-col gap-4 my-12">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        <h1 className="text-2xl">Сотрудник</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить нового сотрудника</Button>
                    </div>
                    <Separator />
                </div>
                {employee &&
                    <EmployeeForm onSubmit={onSubmit} onRemove={onRemove} employee={employee} load={load} defaultValues={defaultValues}/>
                }
            </div>
            <EmployeesList callback={get} reload={reload}/>
            {log &&
                <Log name="Ошибка применения данных сотрудника" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Admin