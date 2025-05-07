import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {AnswerType } from "@/types";


export type SubmitAnswerType = z.infer<typeof formSchema>;
const formSchema = z.object({
    name: z.string().min(4,"Минимальная длинна названия 4 символа!"),
    describe: z.string().min(4,"Минимальная длинна описания 16 символов!"),
    important: z.string().min(4,"Минимальная длинна названия 4 символа!"),
})




function AnswerForm (props: {
    onSubmit: (values:SubmitAnswerType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    answer:AnswerType,
    load: boolean,
    defaultValues: SubmitAnswerType
}){

    const form = useForm<SubmitAnswerType>({
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
        await props.onRemove(props.answer.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitAnswerType] !== props.defaultValues[key as keyof SubmitAnswerType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("name",props.defaultValues.name);
        form.setValue("describe",props.defaultValues.describe);
        form.setValue("important",props.defaultValues.important);
    },[props.defaultValues])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col md:items-end md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col gap-12 w-full md:w-2/3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="Удаление вирусов в windows 11" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Заголовок ответа</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="describe"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Описание</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-between gap-2">
                                                <Textarea placeholder="Для удаления вирусов, сначала включите пк..." {...field}/>
                                            </div>
                                        </FormControl>
                                        <FormDescription>Описание решения</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="important"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Основное</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-between gap-2">
                                                <Textarea placeholder="Включить пк и антивирус" {...field}/>
                                            </div>
                                        </FormControl>
                                        <FormDescription>Краткое описание решения</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                <div className="flex flex-col w-full items-center md:w-auto md:flex-row  gap-4">
                    <Button disabled={!hasChanges || props.load} variant="outline" className="w-full md:w-auto" onClick={clear}>Отменить</Button>
                    <Button disabled={!hasChanges || props.load} className="w-full md:w-auto" type="submit">
                        {props.load ? <Loader2 className="animate-spin" /> : "Сохранить"}
                    </Button>
                    {props.answer.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default AnswerForm;