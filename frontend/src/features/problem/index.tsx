import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { EmployeeType, ProblemType, ThemeType, AnswerType, SpecialistType } from "@/types";
import {listOfTheme , listOfFinds} from "./api";


export type SubmitProblemType = z.infer<typeof formSchema>;
const formSchema = z.object({
    name: z.string().min(4,{
        message: "Длинна названия должна быть более 4-х символов!"
    }),
    describe:  z.string().min(16,{
        message: "Длинна описания должна быть более 16 символов!"
    }),
    id_theme: z.string(),
    id_specialist: z.string(),
    id_answer: z.string(),
    id_employee: z.string(),
    email: z.string().email(
        "Не верно введена почта!",
    ),
    phone: z.string().min(11, "Номер слишком короткий")
    .max(16, "Номер слишком длинный")
    .regex(/^\+?[0-9]+$/, "Только цифры и знак +"),
})




function ProblemForm (props: {
    onSubmit: (values:SubmitProblemType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    problem:ProblemType,
    load: boolean,
    defaultValues: SubmitProblemType
}){

    const form = useForm<SubmitProblemType>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [themes, setThemes] = useState<Array<ThemeType>|null>(null);
    const [answers, setAnswers] = useState<Array<AnswerType>|null>(null);
    const [specialists, setSpecialists] = useState<Array<SpecialistType>|null>(null);
    const [employees, setEmployees] = useState<Array<EmployeeType>|null>(null);
    const formValues = form.watch();


    function clear(e: React.MouseEvent) {
        e.preventDefault();
        form.clearErrors();
        form.reset();
    }

    async function remove (e: React.MouseEvent){
        e.preventDefault();
        await props.onRemove(props.problem.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitProblemType] !== props.defaultValues[key as keyof SubmitProblemType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("name",props.defaultValues.name);
        form.setValue("describe",props.defaultValues.describe);
        form.setValue("id_theme",props.defaultValues.id_theme);
        form.setValue("id_specialist",props.defaultValues.id_specialist);
        form.setValue("id_answer",props.defaultValues.id_answer);
        form.setValue("id_employee",props.defaultValues.id_employee);
        listOfTheme().then(res=>setThemes(res));
    },[props.defaultValues])
    
    useEffect(()=>{
        if(Number(formValues.id_theme)>0){
            listOfFinds(Number(formValues.id_theme)).then(result=>{
                if(result){
                    setAnswers(result.answers);
                    setEmployees(result.employees);
                    setSpecialists(result.specialists)
                }
            })
        }
    },[formValues.id_theme])
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-center md:items-end md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col w-2/3 gap-12">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="Поломка мотора" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Название проблемы</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="describe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Описание</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Textarea placeholder="У клиента сломалась головка цилиндра мотора..." {...field}/>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Краткое описание проблемы клиента</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="id_theme"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Тема</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className="min-h-24 min-w-12 rounded-md">
                                                        {themes && themes.map((theme)=>{
                                                            return(
                                                                <SelectItem key={"theme_list_"+theme.id} value={theme.id.toString()}>{theme.name}</SelectItem>
                                                            )
                                                        })
                                                        }
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h3 className="text-xl">Решение задачи:</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="id_answer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={themes && themes.length > 0 ? (!answers?.length ? "text-gray-400" : "") : ""}>Ответ</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-between gap-2">
                                                <Select onValueChange={field.onChange} value={field.value} disabled={themes && themes.length > 0 ? (!answers?.length) : true}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <ScrollArea className="min-h-24 min-w-12 rounded-md">
                                                            {answers && answers.map((answer:any)=>{
                                                                return(
                                                                    <SelectItem key={"answers_list_"+answer.id_answer} value={answer.id_answer+""}>{answer.answer_name}</SelectItem>
                                                                )
                                                            })
                                                            }
                                                        </ScrollArea>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="id_employee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={themes && themes.length > 0 ? (!employees?.length ? "text-gray-400" : "") : ""}>Сотрудник</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-between gap-2">
                                                <Select onValueChange={field.onChange} value={field.value} disabled={themes && themes.length > 0 ? (!employees?.length) : true}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <ScrollArea className="min-h-24 min-w-12 rounded-md">
                                                            {employees && employees.map((employee:any)=>{
                                                                return(
                                                                    <SelectItem key={"employees_list_"+employee.id_employee} value={employee.id_employee+""}>
                                                                        {employee.second_name} {employee.first_name} {employee.second_name} ({employee.post})
                                                                    </SelectItem>
                                                                )
                                                            })
                                                            }
                                                        </ScrollArea>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="id_specialist"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={themes && themes.length > 0 ? (!specialists?.length ? "text-gray-400" : "") : ""}>Специалист</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-between gap-2">
                                                <Select onValueChange={field.onChange} value={field.value} disabled={themes && themes.length > 0 ? (!specialists?.length) : true}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <ScrollArea className="min-h-24 min-w-12 rounded-md">
                                                            {specialists && specialists.map((specialist:any)=>{
                                                                return(
                                                                    <SelectItem key={"specialists_list_"+specialist.id_specialist} value={specialist.id_specialist+""}>
                                                                        {specialist.second_name} {specialist.first_name} {specialist.second_name} ({specialist.profession})
                                                                    </SelectItem>
                                                                )
                                                            })
                                                            }
                                                        </ScrollArea>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <h3 className="text-xl">Обратная связь:</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                             <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Почта</FormLabel>
                                            <FormControl>
                                                <Input placeholder="some@gmail.com" {...field} />
                                            </FormControl>
                                            <FormDescription>Электронная почта привязанная к аккаунту</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Телефон</FormLabel>
                                        <FormControl>
                                            <Input type="phone" {...field} />
                                        </FormControl>
                                        <FormDescription>Номер мобильного телефона</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                <div className="flex flex-col w-full items-center md:w-auto md:flex-row gap-4">
                    <Button disabled={!hasChanges || props.load} variant="outline" className="w-full md:w-auto" onClick={clear}>Отменить</Button>
                    <Button disabled={!hasChanges || props.load} className="w-full md:w-auto" type="submit">
                        {props.load ? <Loader2 className="animate-spin" /> : "Сохранить"}
                    </Button>
                    {props.problem.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default ProblemForm;