import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp"
import { Loader2 } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



export type SubmitCodeType = z.infer<typeof formSchema>;
const formSchema = z.object({
    code: z.string().min(6,{
      message:"Не верный код, проверьте почту ещё раз (спам)!",
    }),
})



function CodeForm (props: {
    onSubmit: (values:SubmitCodeType)=>void,
    load: boolean,
    time: number,
    resendCode: (e:React.MouseEvent)=>void
}){
    const form = useForm<SubmitCodeType>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                code: "",
            },
    })

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Код</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>Код подтверждения из письма</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col items-center gap-4">
                    <Button  className="w-full" type="submit" disabled={props.load}>
                        {props.load ? <Loader2 className="animate-spin" /> : "Подтвердить"}
                    </Button>
                    <Button className="w-full" disabled={props.time>0} onClick={props.resendCode}>Отправить код повторно: {props.time > 0 ? props.time : 0} сек</Button>
                </div>
            </form>
        </Form>
    )
}

export default CodeForm;