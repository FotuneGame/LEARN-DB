import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"



export type CallbackFormType = z.infer<typeof formSchema>;
const formSchema = z.object({
    email: z.string().email(
      "Не верно введена почта!",
    ),
    callback: z.string().min(16,{
        message: "Длинна сообщения должна быть более 16 символов!"
    })
})



function CallbackForm (props: {onSubmit: (values:CallbackFormType)=>Promise<void>}){

    const form = useForm<CallbackFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            callback: ""
        },
    })

    async function submit(values:CallbackFormType) {
        form.clearErrors();
        form.reset();
        try{
            await props.onSubmit(values);
        }catch(err){
            console.error(err);
        }
    }

    
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Почта</FormLabel>
                            <FormControl>
                                <Input placeholder="some@gmail.com" {...field} />
                            </FormControl>
                            <FormDescription>Ваша электронная почта</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="callback"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Сообщение</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ваши пожелания и вопросы..."  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                        <Button className="w-full md:w-auto" type="submit">Отправить</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default CallbackForm;