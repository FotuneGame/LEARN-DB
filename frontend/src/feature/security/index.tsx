import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



export type SubmitSecurityType = z.infer<typeof formSchema>;
const formSchema = z.object({
    email: z.string().email(
        "Не верно введена почта!",
    ),
    phone: z.string().min(11, "Номер слишком короткий")
    .max(16, "Номер слишком длинный")
    .regex(/^\+?[0-9]+$/, "Только цифры и знак +"),
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



function SecurityForm (props: {
        onSubmit: (values:SubmitSecurityType)=>void,
        defaultValues: SubmitSecurityType
}){

    const [viewPassword,setViewPassword] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState(false);
    const form = useForm<SubmitSecurityType>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues
    })
    const formValues = form.watch();

    function togglePassword(e:React.MouseEvent){
        e.preventDefault(); 
        setViewPassword(!viewPassword);
    }

    function clear(e: React.MouseEvent) {
        e.preventDefault();
        form.clearErrors();
        form.reset();
    }

    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitSecurityType] !== props.defaultValues[key as keyof SubmitSecurityType]
        );
        setHasChanges(changed);
    }, [formValues, props.defaultValues]);

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
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormDescription>Почта для входа в аккаунт</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormDescription>Введине ещё раз новый пароль </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Button disabled={!hasChanges} variant="outline" className="w-full md:w-auto" onClick={clear}>Отменить</Button>
                    <Button disabled={!hasChanges} className="w-full md:w-auto" type="submit">Сохранить</Button>
                    <Button disabled={!hasChanges}  onClick={togglePassword}>{viewPassword ? "0_0" : "-_-"}</Button>
                </div>
            </form>
        </Form>
)
}

export default SecurityForm;