import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"




export type SubmitNewPasswordType = z.infer<typeof formSchema>;
const formSchema = z.object({
    password: z.string().min(4,{
        message: "Длинна пароля должна быть более 4-х символов!"
    }),
    passwordReapet: z.string()
}).refine(
  (data) => data.password === data.passwordReapet,
  {
    message: "Пароли не совпадают",
    path: ["passwordReapet"],
  }
);



function NewPasswordForm (props: {
        onSubmit: (values:SubmitNewPasswordType)=>void,
        load: boolean,
}){

    const [viewPassword,setViewPassword] = useState<boolean>(false);
    const form = useForm<SubmitNewPasswordType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordReapet: ""
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input type={viewPassword ? "text" : "password"} {...field} />
                            </FormControl>
                            <FormDescription>Новый пароль для входа в аккаунт</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordReapet"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Повторный пароль</FormLabel>
                            <FormControl>
                                <Input type={viewPassword ? "text" : "password"} {...field} />
                            </FormControl>
                            <FormDescription>Введине ещё пароль </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-between gap-4">
                    <Button  className="w-auto" type="submit" disabled={props.load}>
                        {props.load ? <Loader2 className="animate-spin" /> : "Войти c новым паролем"}
                    </Button>
                    <Button onClick={togglePassword}>{viewPassword ? "0_0" : "-_-"}</Button>
                </div>
            </form>
        </Form>
    );
}

export default NewPasswordForm;