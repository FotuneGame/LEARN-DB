import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Link } from "react-router-dom"
import { useState } from "react"
import { paths } from "@/pages";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import GoogleSVG from "/icons/google.svg"
import GitHubSVG from "/icons/github.svg"



export type SubmitLoginType = z.infer<typeof formSchema>;
const formSchema = z.object({
    email: z.string().email(
      "Не верно введена почта!",
    ),
    password: z.string().min(4,{
        message: "Длинна пароля должна быть более 4-х символов!"
    })
})



function LoginForm (props: {onSubmit: (values:SubmitLoginType)=>void}){

    const [viewPassword,setViewPassword] = useState<boolean>(false);
    const form = useForm<SubmitLoginType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
        
    function togglePassword(e:React.MouseEvent){
        e.preventDefault(); 
        setViewPassword(!viewPassword);
    }

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
                <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                        <Button className="w-full md:w-auto" type="submit">Войти</Button>
                        <div className="flex gap-2">
                            <Link to={paths.auth_google} className="w-[50%]">
                                <Button className="w-full">
                                    <img src={GoogleSVG} width={24} height={24} alt="google"/>
                                </Button>
                            </Link>
                            <Link to={paths.auth_github} className="w-[50%]">
                                <Button className="w-full">
                                    <img src={GitHubSVG} alt="github"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link to={paths.forget}>
                            <Button variant="ghost">Забыли пароль</Button>
                        </Link>
                        <Link to={paths.registration}>
                            <Button variant="ghost">Зарегистрироваться</Button>
                        </Link>
                        
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default LoginForm;