import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {ThemeType } from "@/types";


export type SubmitThemeType = z.infer<typeof formSchema>;
const formSchema = z.object({
    name: z.string().min(4,{
        message: "Длинна темы не менее 4-ч символов!"
    })
})



function ThemeForm (props: {
    onSubmit: (values:SubmitThemeType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    theme: ThemeType,
    load: boolean,
    defaultValues: SubmitThemeType
}){

    const form = useForm<SubmitThemeType>({
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
        await props.onRemove(props.theme.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitThemeType] !== props.defaultValues[key as keyof SubmitThemeType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("name",props.defaultValues.name);
    },[props.defaultValues])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-center md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input placeholder="Компьютеры" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Название темы</FormDescription>
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
                    {props.theme.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default ThemeForm;