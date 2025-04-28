import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Link } from "react-router-dom"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { paths } from "@/shared/const";



export type SubmitRegistrationType = z.infer<typeof formSchema>;
const formSchema = z.object({
    email: z.string().email(
      "Не верно введена почта!",
    ),
    password: z.string().min(4,{
        message: "Длинна пароля должна быть более 4-х символов!"
    }),
    first_name: z.string().min(1, {
        message: "Неверное имя!"
    }),
    second_name: z.string().min(1, {
        message: "Неверное фамилия!"
    }),
    middle_name: z.string().min(1, {
        message: "Неверное отчество!"
    }),
})




function RegistrationForm (props: {onSubmit: (values:SubmitRegistrationType)=>Promise<void>}){

    const [viewPassword,setViewPassword] = useState<boolean>(false);
    const form = useForm<SubmitRegistrationType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            second_name: "",
            middle_name: ""
        },
    })

    function togglePassword(e:React.MouseEvent){
        e.preventDefault(); 
        setViewPassword(!viewPassword);
    }

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="space-y-8">
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
                    </div>
                    <Separator className="hidden md:block md:min-h-[300px]" orientation="vertical" />
                    <div className="space-y-8">
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <Input type={viewPassword ? "text" : "password"} {...field} />
                                            <Button onClick={togglePassword}>{viewPassword ? "0_0" : "-_-"}</Button>
                                        </div>
                                    </FormControl>
                                    <FormDescription>Пароль для входа в аккаунт</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button className="w-full md:w-auto" type="submit">Зарегистрироваться</Button>
                    </div>
                    <div className="flex gap-2">
                        <Link to={paths.forget}>
                            <Button variant="ghost">Забыли пароль</Button>
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

export default RegistrationForm;