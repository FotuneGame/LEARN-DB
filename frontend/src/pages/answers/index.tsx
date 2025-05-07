import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

import AnswersList from "@/features/answersList";
import AnswerForm, {SubmitAnswerType} from "@/features/answer";
import { AnswerType } from "@/types";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import Log from "@/entities/log";
import AnswerAPI from "@/shared/api/answer";






function Answers(){

    const employee = useSelector((state:RootState)=>state.employee);
    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [answer,setAnswer] = useState<AnswerType | null>(null);
    const [defaultValues,setDefaultValues] = useState<SubmitAnswerType>({name: "", describe: "", important: ""});

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);
    const [reload,setReload] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setAnswer({...defaultValues ,id:-1});
            setDefaultValues({name: "", describe: "", important: ""});
            return;
        }
        try{
            const newAnswer = await AnswerAPI.getById(id);
            if(newAnswer){
                setDefaultValues({ 
                    name: newAnswer.name,
                    describe: newAnswer.describe,
                    important: newAnswer.important
                });
            }else{
                setDefaultValues({name: "", describe: "", important: ""});
            }
            setAnswer(newAnswer);
        }catch(err){
            setLog(true);
            setAnswer(null);
        }
    }


    async function onSubmit(value:SubmitAnswerType) {
        if(!access || !answer) return;
        setLoad(true);
        try{
            let newAnswer = null;
            if(answer.id > 0){
                newAnswer = await AnswerAPI.update(access, {
                    id: answer.id,
                    ...value
                });
            }else{
                newAnswer = await AnswerAPI.add(access, {
                    id: -1,
                    ...value
                });
            }
            if(!newAnswer)
                setLog(true);
            setAnswer(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({name: "", describe: "", important: ""})
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            const res = await AnswerAPI.delete(access, id);
            if(!res)
                setLog(true);
            setAnswer(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({name: "", describe: "", important: ""})
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
            <div className="flex flex-col gap-4 my-12">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        <h1 className="text-2xl">Ответы</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить новый ответа</Button>
                    </div>
                    <Separator />
                </div>
                {answer &&
                    <AnswerForm onSubmit={onSubmit} onRemove={onRemove} answer={answer} load={load} defaultValues={defaultValues}/>
                }
            </div>
            <AnswersList callback={get} reload={reload}/>
            {log &&
                <Log name="Ошибка применения данных ответа" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Answers