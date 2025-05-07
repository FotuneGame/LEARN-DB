import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";

import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";
import { useState } from "react";

import MyProblemsList from "@/features/myProblemsList";
import ProblemsList from "@/features/problemList";
import ProblemForm, { SubmitProblemType } from "@/features/problem";

import Log from "@/entities/log";
import { CallbackType, ProblemType } from "@/types";
import ProblemAPI from "@/shared/api/problem";
import CallbackAPI from "@/shared/api/callback";




function Problems(){
    const access = useSelector((state:RootState)=>state.user.accessToken);
    const employee = useSelector((state:RootState)=>state.employee);

    const [problem,setProblem] = useState<ProblemType | null>(null);
    const [callback,setCallback] = useState<CallbackType | null>(null);
    const [reload,setReload] = useState<boolean>(false);
    const [defaultValues,setDefaultValues] = useState<SubmitProblemType>({name: "", describe: "", id_theme: "", id_specialist: "", id_answer: "", id_employee: "", email: "", phone: ""});

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setProblem({id:-1,   name: "", describe: "", id_theme: -1, id_specialist: -1, id_answer: -1, id_employee: -1});
            setDefaultValues({name: "", describe: "", id_theme: "", id_specialist: "", id_answer: "", id_employee: "", email: "", phone: ""})
            return;
        }
        try{
            const newProblem = await ProblemAPI.getById(id);
            const newCallback = await CallbackAPI.getById(id);
            if(newProblem && newCallback){
                setDefaultValues({
                    name: newProblem.name,
                    describe: newProblem.describe,
                    id_theme: newProblem.id_theme ? newProblem.id_theme.toString() : "",
                    id_specialist: newProblem.id_specialist ? newProblem.id_specialist.toString() : "",
                    id_answer: newProblem.id_answer ? newProblem.id_answer.toString() : "",
                    id_employee: newProblem.id_employee ? newProblem.id_employee.toString() : "",
                    email: newCallback.email ?? "",
                    phone: newCallback.phone ?? "",
                });
            }else{
                setDefaultValues({name: "", describe: "", id_theme: "", id_specialist: "", id_answer: "", id_employee: "", email: "", phone: ""})
            }
            setProblem(newProblem);
            setCallback(newCallback);
        }catch(err){
            setLog(true);
            setProblem(null);
            setCallback(null);
        }
    }

    async function onSubmit(value:SubmitProblemType) {
        if(!access || !problem) return;
        setLoad(true);
        try{
            let newProblem = null;
            let newCallback = null;
            if(problem.id > 0){
                newProblem = await ProblemAPI.update(access, problem.id, {
                    id: problem.id,
                    name: value.name,
                    describe: value.describe,
                    id_theme: Number(value.id_theme),
                    id_answer: Number(value.id_answer),
                    id_employee: Number(value.id_employee),
                    id_specialist: Number(value.id_specialist),
                });
                if(callback)
                    newCallback = await CallbackAPI.update(access, callback.id, {
                        id: callback.id,
                        email:value.email,
                        phone: value.phone,
                        id_problem: problem.id
                    })
            }else{
                newProblem = await ProblemAPI.add(access, {
                    id: problem.id,
                    name: value.name,
                    describe: value.describe,
                    id_theme: Number(value.id_theme),
                    id_answer: Number(value.id_answer),
                    id_employee: Number(value.id_employee),
                    id_specialist: Number(value.id_specialist),
                });
                if(newProblem)
                    newCallback = await CallbackAPI.add(access, {
                        id: -1,
                        email: value.email,
                        phone: value.phone,
                        id_problem: newProblem.id
                    })
            }
            if(!newProblem || !newCallback)
                setLog(true);
            setProblem(null);
            setCallback(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({name: "", describe: "", id_theme: "", id_specialist: "", id_answer: "", id_employee: "", email: "", phone: ""})
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            let res_problem = null;
            if(callback && callback.id > 0)
                await CallbackAPI.delete(access, callback.id);
            if(problem && id > 0)
                res_problem = await ProblemAPI.delete(access, id);
            if(!res_problem)
                setLog(true);
            setProblem(null);
            setCallback(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({name: "", describe: "", id_theme: "", id_specialist: "", id_answer: "", id_employee: "", email: "", phone: ""})
        }
    }
    
    
    if(!access || !employee.id)
        return(
            <div className="flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl">Прежде чем приступить, подождите пока администратор привяжет вас к системе...</h1>
            </div>
        )
    return(
        <div className="flex flex-col  gap-4 mt-8">
            <div className="flex flex-col gap-8 my-12">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        <h1 className="text-2xl">Проблемы</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить новую проблему</Button>
                    </div>
                    <Separator />
                </div>
                {problem && 
                    <>
                        <ProblemForm onSubmit={onSubmit} onRemove={onRemove} problem={problem} load={load} defaultValues={defaultValues}/>
                        <Separator />
                    </>
                }
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xl">Мои</h1>
                    <MyProblemsList callback={get} reload={reload}/>
                </div>
                <Separator className="hidden min-h-[200px] md:block" orientation="vertical"/>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xl">Все</h1>
                    <ProblemsList callback={get} reload={reload} />
                </div>
            </div>
            {log &&
                <Log name="Ошибка применения данных проблемы" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Problems