import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {ClientType, EmployeeType } from "@/types";
import { listOfEmployees } from "./api";


export type SubmitClientType = z.infer<typeof formSchema>;
const formSchema = z.object({
    first_name: z.string().min(1, {
        message: "Неверное имя!"
    }),
    second_name: z.string().min(1, {
        message: "Неверное фамилия!"
    }),
    middle_name: z.string().min(1, {
        message: "Неверное отчество!"
    }),
    id_employee: z.string()
})




function ClientForm (props: {
    onSubmit: (values:SubmitClientType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    client:ClientType,
    load: boolean,
    defaultValues: SubmitClientType
}){

    const form = useForm<SubmitClientType>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues
    });

    const [employees, setEmployees] = useState<Array<EmployeeType>|null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const formValues = form.watch();


    function clear(e: React.MouseEvent) {
        e.preventDefault();
        form.clearErrors();
        form.reset();
    }

    async function remove (e: React.MouseEvent){
        e.preventDefault();
        await props.onRemove(props.client.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitClientType] !== props.defaultValues[key as keyof SubmitClientType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("first_name",props.defaultValues.first_name);
        form.setValue("second_name",props.defaultValues.second_name);
        form.setValue("middle_name",props.defaultValues.middle_name);
        form.setValue("id_employee",props.defaultValues.id_employee);
        listOfEmployees().then(res=>setEmployees(res));
    },[props.defaultValues])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-center md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="Иван" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Имя персоны по паспорту</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="second_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Фамилия</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="Иванов" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Фамилия персоны по паспорту</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="middle_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Отчество</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="Иванович" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Отчество персоны по паспорту</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="id_employee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Сотрудник</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {employees && employees.map((employee)=>{
                                                        return(
                                                            <SelectItem key={"employees_list_"+employee.id} value={employee.id.toString()}>
                                                                {employee.second_name} {employee.first_name} {employee.middle_name} ({employee.post})
                                                            </SelectItem>
                                                        )
                                                    })
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Сотрудник, который обробатывает клиента</FormDescription>
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
                    {props.client.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default ClientForm;