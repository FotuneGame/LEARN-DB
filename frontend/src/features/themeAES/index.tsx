import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import React, { useState, useLayoutEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {ThemeType, EmployeeType, AnswerType, SpecialistType, PostType  } from "@/types";
import {listOfFindTheme , listOfAnswers, listOfEmployees, listOfSpecialists} from "./api";
import { ScrollArea } from "@/shared/ui/scroll-area"


export type SubmitThemeAESType = z.infer<typeof formSchema>;
const formSchema = z.object({
    arr_answers: z.array(
        z.object({
          id_answer: z.number(),
          answer_name: z.string(),
          describe: z.string(),
          important: z.string()
        })
      ),
      arr_employees: z.array(
        z.object({
          id_employee: z.number(),
          first_name: z.string(),
          second_name: z.string(),
          middle_name: z.string(),
          post: z.string()
        })
      ),
      arr_specialists: z.array(
        z.object({
          id_specialist: z.number(),
          first_name: z.string(),
          second_name: z.string(),
          middle_name: z.string(),
          phone: z.string(),
          email: z.string(),
          adress: z.string(),
          profession: z.string()
        })
      )
})



function ThemeAESForm (props: {
    onSubmit: (values:SubmitThemeAESType)=>Promise<void>,
    theme: ThemeType,
    load: boolean,
}){

    const form = useForm<SubmitThemeAESType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            arr_employees: [],
            arr_answers: [],
            arr_specialists: []
        }
    });

    const [answers, setAnswers] = useState<Array<AnswerType>|null>(null);
    const [specialists, setSpecialists] = useState<Array<SpecialistType>|null>(null);
    const [employees, setEmployees] = useState<Array<EmployeeType>|null>(null);

    //для перерендера при изменение данных формы
    const watch = form.watch();
    useLayoutEffect(()=>{},[watch,answers,specialists,employees])



    function removeAnswer(index:number){
        answers?.push({
            id:form.getValues("arr_answers")[index].id_answer,
            name:form.getValues("arr_answers")[index].answer_name,
            describe:form.getValues("arr_answers")[index].describe,
            important:form.getValues("arr_answers")[index].important
        });
        const arr = form.getValues("arr_answers").filter((_,i) => i !== index );
        form.setValue("arr_answers",arr);
    }
    function addAnswer(answer:AnswerType, index: number){
        const arr = form.getValues("arr_answers");
        arr.push({
            id_answer: answer.id,
            answer_name: answer.name,
            describe: answer.describe,
            important: answer.important
        });
        form.setValue("arr_answers",arr);
        if(answers)
            setAnswers(answers.filter((_,i)=> i!==index));
    }
    function removeSpecialist(index:number){
        specialists?.push({
            id: form.getValues("arr_specialists")[index].id_specialist,
            phone: form.getValues("arr_specialists")[index].phone,
            email: form.getValues("arr_specialists")[index].email,
            profession: form.getValues("arr_specialists")[index].profession,
            adress: form.getValues("arr_specialists")[index].adress,
            first_name: form.getValues("arr_specialists")[index].first_name,
            second_name: form.getValues("arr_specialists")[index].second_name,
            middle_name: form.getValues("arr_specialists")[index].middle_name,
        });
        const arr = form.getValues("arr_specialists").filter((_,i) => i !== index );
        form.setValue("arr_specialists",arr);
    }
    function addSpecialist(specialist:SpecialistType, index: number){
        const arr = form.getValues("arr_specialists");
        arr.push({
            id_specialist: specialist.id,
            phone: specialist.phone,
            email: specialist.email,
            profession: specialist.profession,
            adress: specialist.adress,
            first_name: specialist.first_name,
            second_name: specialist.second_name,
            middle_name: specialist.middle_name,
        });
        form.setValue("arr_specialists",arr);
        if(specialists)
            setSpecialists(specialists.filter((_,i)=> i!==index));
    }
    function removeEmployee(index:number){
        employees?.push({
            id:  form.getValues("arr_employees")[index].id_employee,
            post:  form.getValues("arr_employees")[index].post as PostType,
            first_name:  form.getValues("arr_employees")[index].first_name,
            second_name:  form.getValues("arr_employees")[index].second_name,
            middle_name:  form.getValues("arr_employees")[index].middle_name
        });
        const arr = form.getValues("arr_employees").filter((_,i) => i !== index );
        form.setValue("arr_employees",arr);
    }
    function addEmployee(employee:EmployeeType, index: number){
        const arr = form.getValues("arr_employees");
        arr.push({
            id_employee: employee.id,
            post:  employee.post,
            first_name: employee.first_name || "",
            second_name: employee.second_name || "",
            middle_name:  employee.middle_name || ""
        });
        form.setValue("arr_employees",arr);
        if(employees)
            setEmployees(employees.filter((_,i)=> i!==index));
    }

    useLayoutEffect(()=>{
        form.clearErrors();
        form.reset();

        const getDate = async () =>{
            if(props.theme.id>0){
                const find = await listOfFindTheme(props.theme.id);
                if(find){
                    form.setValue("arr_answers",find.answers);
                    form.setValue("arr_employees",find.employees);
                    form.setValue("arr_specialists",find.specialists);
                }


                const answers_res = [];
                const answers = await listOfAnswers();
                for(let i in answers){
                    for(let j in find?.answers){
                        if((find?.answers[j] as any).id_answer!==answers[i].id)
                            answers_res.push(answers[i]);
                    }
                }
                if(!find?.answers.length) setAnswers(answers);
                else setAnswers(answers_res);


                const employees_res = [];
                const employees = await listOfEmployees();
                for(let i in employees){
                    for(let j in find?.employees){
                        if((find?.employees[j] as any).id_employee!==employees[i].id)
                            employees_res.push(employees[i]);
                    }
                }
                if(!find?.employees.length) setEmployees(employees);
                else setEmployees(employees_res);

                
                const specialists_res = [];
                const specialists = await listOfSpecialists();
                for(let i in specialists){
                    for(let j in find?.specialists){
                        if((find?.specialists[j] as any).id_specialist!==specialists[i].id)
                            specialists_res.push(employees[i]);
                    }
                }
                if(!find?.specialists.length) setSpecialists(specialists);
                else setSpecialists(specialists_res);

            }
        }

        getDate();
    },[props.theme])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-end md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col 2xl:flex-row gap-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col justify-between gap-2">
                            <h4 className="text-md">Выбранные ответы</h4>
                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                {form.getValues("arr_answers").map((answer,index)=>{
                                    return(
                                        <Button
                                         className="m-2" variant="outline"
                                         key={"answer_add_list_"+answer.id_answer} onClick={(e:React.MouseEvent)=>{e.preventDefault(); removeAnswer(index)}}
                                        >
                                            {answer.answer_name}
                                        </Button>
                                    )
                                })
                                }
                                {form.getValues("arr_answers").length===0 && 
                                    <h4 className="text-md"> Не выбрано</h4>
                                }
                            </ScrollArea>
                        </div>
                        <FormField
                            control={form.control}
                            name="arr_answers"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Все ответы</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                                {answers && answers.map((answer,i)=>{
                                                    return(
                                                        <Button 
                                                         className="m-2" variant="outline"
                                                         key={"answer_list_"+answer.id} onClick={(e:React.MouseEvent)=>{e.preventDefault(); addAnswer(answer,i)}}
                                                        >
                                                            {answer.name}
                                                        </Button>
                                                    )
                                                })
                                                }
                                                {answers && answers.length===0 && 
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
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col justify-between gap-2">
                            <h4 className="text-md">Выбранные сотрудники</h4>
                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                {form.getValues("arr_employees").map((employee,index)=>{
                                    return(
                                        <Button 
                                         className="m-2" variant="outline"
                                         key={"employee_add_list_"+employee.id_employee} onClick={(e:React.MouseEvent)=>{e.preventDefault(); removeEmployee(index)}}
                                        >
                                            {employee.second_name} {employee.first_name} {employee.middle_name} ({employee.post})
                                        </Button>
                                    )
                                })
                                }
                                {form.getValues("arr_employees").length===0 && 
                                    <h4 className="text-md"> Не выбрано</h4>
                                }
                            </ScrollArea>
                        </div>
                        <FormField
                            control={form.control}
                            name="arr_employees"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Все сотрудники</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                                {employees && employees.map((employee,i)=>{
                                                    return(
                                                        <Button 
                                                         className="m-2" variant="outline"
                                                         key={"employee_list_"+employee.id} onClick={(e:React.MouseEvent)=>{e.preventDefault(); addEmployee(employee,i)}}
                                                        >
                                                            {employee.second_name} {employee.first_name} {employee.middle_name} ({employee.post})
                                                        </Button>
                                                    )
                                                })
                                                }
                                                {employees && employees.length===0 && 
                                                    <h4 className="text-md">Пусто</h4>
                                                }
                                            </ScrollArea>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Сорудники на данную тему</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col justify-between gap-2">
                            <h4 className="text-md">Выбранные специалисты</h4>
                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                {form && form.getValues("arr_specialists").map((specialist,index)=>{
                                    return(
                                        <Button 
                                         className="m-2" variant="outline"
                                         key={"specialist_add_list_"+specialist.id_specialist} onClick={(e:React.MouseEvent)=>{e.preventDefault(); removeSpecialist(index)}}
                                        >
                                            {specialist.second_name} {specialist.first_name} {specialist.middle_name} ({specialist.profession})
                                        </Button>
                                    )
                                })
                                }
                                {form.getValues("arr_specialists").length===0 && 
                                    <h4 className="text-md"> Не выбрано</h4>
                                }
                            </ScrollArea>
                        </div>
                        <FormField
                            control={form.control}
                            name="arr_specialists"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Все специалисты</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <ScrollArea className="rounded-md p-2 border w-full max-h-50">
                                                {specialists && specialists.map((specialist,i)=>{
                                                    return(
                                                        <Button  
                                                         className="m-2" variant="outline"
                                                         key={"specialist_all_list_"+specialist.id} onClick={(e:React.MouseEvent)=>{e.preventDefault(); addSpecialist(specialist,i)}}
                                                        >
                                                            {specialist.second_name} {specialist.first_name} {specialist.middle_name} ({specialist.profession})
                                                        </Button>
                                                    )
                                                })}
                                                {specialists && specialists.length===0 && 
                                                    <h4 className="text-md">Пусто</h4>
                                                }
                                            </ScrollArea>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Специалисты на данную тему</FormDescription>
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

export default ThemeAESForm;