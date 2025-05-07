import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {SpecialistType} from "@/types";


export type SubmitSpecialistType = z.infer<typeof formSchema>;
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
    adress: z.string().min(4, {
        message: "Неверный адрес!"
    }),
    profession: z.string().min(4, {
        message: "Неверная профессия!"
    }),
    phone: z.string().min(11, "Номер слишком короткий")
    .max(16, "Номер слишком длинный")
    .regex(/^\+?[0-9]+$/, "Только цифры и знак +"),
    email: z.string().email(
        "Не верно введена почта!",
    ),
})




function SpecialistForm (props: {
    onSubmit: (values:SubmitSpecialistType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    specialist:SpecialistType,
    load: boolean,
    defaultValues: SubmitSpecialistType
}){

    const form = useForm<SubmitSpecialistType>({
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
        await props.onRemove(props.specialist.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitSpecialistType] !== props.defaultValues[key as keyof SubmitSpecialistType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("first_name",props.defaultValues.first_name);
        form.setValue("second_name",props.defaultValues.second_name);
        form.setValue("middle_name",props.defaultValues.middle_name);
        form.setValue("adress",props.defaultValues.adress);
        form.setValue("profession",props.defaultValues.profession);
        form.setValue("phone",props.defaultValues.phone);
        form.setValue("email",props.defaultValues.email);
    },[props.defaultValues])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-end md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col gap-12 w-full md:w-2/3">
                    <div className="flex flex-col md:flex-row gap-4 ">
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
                                    <FormDescription>Имя спеца по паспорту</FormDescription>
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
                                    <FormDescription>Фамилия спеца по паспорту</FormDescription>
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
                                    <FormDescription>Отчество спеца по паспорту</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Почта</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="some@gmail.com" {...field} />
                                            </FormControl>
                                            <FormDescription>Почта для входа в аккаунт</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Телефон</FormLabel>
                                            <FormControl>
                                                <Input type="phone" placeholder="89533496109" {...field} />
                                            </FormControl>
                                            <FormDescription>Номер мобильного телефона</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                    </div>
                    <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="adress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Адресс</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Лен. обл., Кировский р-н, г. Кировск, ул. Набережная, дом 13" {...field} />
                                        </FormControl>
                                        <FormDescription>Место работы специалиста</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="profession"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Профессия</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Разнорабочий"  {...field} />
                                        </FormControl>
                                        <FormDescription>Квалификация специалиста</FormDescription>
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
                    {props.specialist.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default SpecialistForm;