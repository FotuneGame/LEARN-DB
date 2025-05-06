import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import {Switch} from "@/shared/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {CallType, ClientType } from "@/types";
import { listOfClients } from "./api";


export type SubmitCallType = z.infer<typeof formSchema>;
const formSchema = z.object({
    phone: z.string().min(11, "Номер слишком короткий")
    .max(16, "Номер слишком длинный")
    .regex(/^\+?[0-9]+$/, "Только цифры и знак +"),
    date: z.string()
    .min(1, "Дата не введена")
    .refine((val) => !isNaN(new Date(val).getTime()), {
        message: "Некорректная дата"
    }),
    time: z.string().min(1, "Время не введено"),
    id_client: z.string(),
    is_spam: z.boolean()
})




function CallForm (props: {
    onSubmit: (values:SubmitCallType)=>Promise<void>,
    onRemove: (id: number) => Promise<void>,
    call:CallType,
    load: boolean,
    defaultValues: SubmitCallType
}){

    const form = useForm<SubmitCallType>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues
    });

    const [clients, setClients] = useState<Array<ClientType>|null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const formValues = form.watch();


    function clear(e: React.MouseEvent) {
        e.preventDefault();
        form.clearErrors();
        form.reset();
    }

    async function remove (e: React.MouseEvent){
        e.preventDefault();
        await props.onRemove(props.call.id);
    }


    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitCallType] !== props.defaultValues[key as keyof SubmitCallType]
        );
        setHasChanges(changed);
    }, [formValues]);

    useEffect(()=>{
        form.clearErrors();
        form.reset();
        form.setValue("phone",props.defaultValues.phone);
        form.setValue("date",props.defaultValues.date);
        form.setValue("time",props.defaultValues.time);
        form.setValue("is_spam",props.defaultValues.is_spam);
        form.setValue("id_client",props.defaultValues.id_client);
        listOfClients().then(res=>setClients(res));
    },[props.defaultValues])
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="flex flex-col items-center md:justify-between md:flex-row gap-4 space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
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
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Дата</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input type="date" value={field.value.toString()} onChange={field.onChange}  />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Дата звонка сотруднику</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Время</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input type="time"  value={field.value} onChange={field.onChange} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Время разговора с клиентом</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="id_client"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Клиент</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea className="min-h-24 min-w-12 rounded-md">
                                                        {clients && clients.map((client)=>{
                                                            return(
                                                                <SelectItem key={"clients_list_"+client.id} value={client.id.toString()}>
                                                                    {client.second_name} {client.first_name} {client.middle_name}
                                                                </SelectItem>
                                                            )
                                                        })
                                                        }
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Клиент, который звонил с этого номера</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_spam"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Спам</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Если это спам-звонок, то его нельзя будет изменить!</FormDescription>
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
                    {props.call.id > 0 &&
                        <Button disabled={props.load} variant="destructive" className="w-full md:w-auto" onClick={remove}>Удалить</Button>
                    }
                </div>
            </form>
        </Form>
    )
}

export default CallForm;