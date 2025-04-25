import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"


import { paths } from "@/shared/const";
import { Link } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



export type SubmitForgetType = z.infer<typeof formSchema>;
const formSchema = z.object({
    email: z.string().email(
      "Не верно введена почта!",
    ),
})



function ForgetForm (props: {onSubmit: (values:SubmitForgetType)=>void}){

    const form = useForm<SubmitForgetType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })


    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
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
                <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
                    <Button className="w-full md:w-auto" type="submit">Отправить код</Button>
                    <div className="flex gap-2">
                        <Link to={paths.registration}>
                            <Button variant="ghost">Зарегистрироваться</Button>
                        </Link>
                        <Link to={paths.auth}>
                            <Button variant="ghost">Авторизация</Button>
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default ForgetForm;