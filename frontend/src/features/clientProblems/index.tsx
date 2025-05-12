import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import React, { useState, useLayoutEffect } from "react"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { ClientType, ClientProblemType } from "@/types";
import {listAllOfProblems , listOfProblemsClient} from "./api";
import { ScrollArea } from "@/shared/ui/scroll-area"


export type SubmitClientProblemsType = z.infer<typeof formSchema>;
const formSchema = z.object({
    arr_problems: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          is_solve: z.boolean().optional()
        })
    )
})



function ClientProblemsForm (props: {
    onSubmit: (values:SubmitClientProblemsType)=>Promise<void>,
    client: ClientType,
    load: boolean,
}){

    const form = useForm<SubmitClientProblemsType>({
        defaultValues: {
            arr_problems: []
        }
    });

    const [problems, setProblems] = useState<Array<ClientProblemType>|null>(null);

    //для перерендера при изменение данных формы
    const watch = form.watch();
    useLayoutEffect(()=>{},[watch, problems])


    function removeProblem(index:number){
        problems?.push({...form.getValues("arr_problems")[index], is_solve: form.getValues("arr_problems")[index].is_solve ?? false});
        const arr = form.getValues("arr_problems").filter((_,i) => i !== index );
        form.setValue("arr_problems",arr);
    }
    function addProblem(problem:ClientProblemType, index: number){
        const arr = form.getValues("arr_problems");
        arr.push(problem);
        form.setValue("arr_problems",arr);
        if(problems)
            setProblems(problems.filter((_,i)=> i!==index));
    }


    useLayoutEffect(()=>{
        form.clearErrors();
        form.reset();

        const getData = async () =>{
            if(props.client.id){
                const forClient = await listOfProblemsClient(props.client.id);
                form.setValue("arr_problems",forClient);

                const res = [];
                const all = await listAllOfProblems();
                for(let i in all){
                    let have = false;
                    for(let j in forClient){
                        if(forClient[j].id===all[i].id){
                            have = true;
                            break;
                        }
                    }
                    if(!have)
                        res.push(all[i]);
                }
                if(!forClient.length) setProblems(all);
                else setProblems(res);
            }
        }
        
        getData();
    },[props.client])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-center md:items-end md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col justify-between gap-2">
                            <h4 className="text-md">Выбранные проблемы</h4>
                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                {form.getValues("arr_problems").map((problem,index)=>{
                                    return(
                                        <Button
                                         className="m-2" variant="outline"
                                         key={"problem_add_list_"+problem.id} onClick={(e:React.MouseEvent)=>{e.preventDefault(); removeProblem(index)}}
                                        >
                                            {problem.name} ({problem.is_solve ? "Решена" : "Не решена"})
                                        </Button>
                                    )
                                })
                                }
                                {form.getValues("arr_problems").length===0 && 
                                    <h4 className="text-md"> Не выбрано</h4>
                                }
                            </ScrollArea>
                        </div>
                        <FormField
                            control={form.control}
                            name="arr_problems"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Все проблемы</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                                {problems && problems.map((problem,i)=>{
                                                    return(
                                                        <Button 
                                                         className="m-2" variant="outline"
                                                         key={"problems_list_"+problem.id} onClick={(e:React.MouseEvent)=>{e.preventDefault(); addProblem(problem,i)}}
                                                        >
                                                            {problem.name} ({problem.is_solve ? "Решена" : "Не решена"})
                                                        </Button>
                                                    )
                                                })
                                                }
                                                {problems && problems.length===0 && 
                                                    <h4 className="text-md">Пусто</h4>
                                                }
                                            </ScrollArea>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Решения на данную тему</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full items-center md:w-auto md:flex-row gap-4">
                    <Button disabled={props.load} className="w-full md:w-auto" type="submit">
                        {props.load ? <Loader2 className="animate-spin" /> : "Связать"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ClientProblemsForm;