import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {EmployeeType } from "@/types";


export type SubmitEmployeeType = z.infer<typeof formSchema>;
const formSchema = z.object({
    email: z.string().email(
        "Не верно введена почта!",
    ),
    post: z.union([ 
        // PostType
        z.literal("Руководитель"),
        z.literal("Менеджер"),
        z.literal("Бухгалтер"),
        z.literal("Сис. админ"),
        z.literal("Сотрудник"),
        z.literal("Админ"),
    ]),
})




function EmployeeForm (props: {
    onSubmit: (values:SubmitEmployeeType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    employee:EmployeeType,
    load: boolean,
    defaultValues: SubmitEmployeeType
}){

    const form = useForm<SubmitEmployeeType>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues
    });

    const [hasChanges, setHasChanges] = useState(false);
    const formValues = form.watch();


    function clear(e: React.MouseEvent) {
        e.preventDefault();
        form.clearErrors();
        form.reset();
    }

    async function remove (e: React.MouseEvent){
        e.preventDefault();
        await props.onRemove(props.employee.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitEmployeeType] !== props.defaultValues[key as keyof SubmitEmployeeType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("email",props.defaultValues.email);
        form.setValue("post",props.defaultValues.post);
    },[props.defaultValues])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-center md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Почта</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="some@gamil.com" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Почта сотрудника через которую он заходит в сервис</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="post"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Должность</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Руководитель">Руководитель</SelectItem>
                                                    <SelectItem value="Менеджер">Менеджер</SelectItem>
                                                    <SelectItem value="Бухгалтер">Бухгалтер</SelectItem>
                                                    <SelectItem value="Сис. админ">Сис. админ</SelectItem>
                                                    <SelectItem value="Сотрудник">Сотрудник</SelectItem>
                                                    <SelectItem value="Админ">Админ</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Должность сотрудника в компании</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                <div className="flex flex-col w-full items-center md:w-auto md:flex-row gap-4">
                    <Button disabled={!hasChanges || props.load} variant="outline" className="w-full md:w-auto" onClick={clear}>Отменить</Button>
                    <Button disabled={!hasChanges || props.load} className="w-full md:w-auto" type="submit">
                        {props.load ? <Loader2 className="animate-spin" /> : "Сохранить"}
                    </Button>
                    {props.employee.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default EmployeeForm;