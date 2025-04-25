import { Button } from "@/shared/ui/button"
import { Form } from "@/shared/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


export type SubmitSystemType = z.infer<typeof formSchema>;
const formSchema = z.object({});



function SystemForm(props:{onSubmit: (values:SubmitSystemType)=>void}){

    const form = useForm<SubmitSystemType>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    })

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
                <h4>Удалить аккаунт, это навсегда!</h4>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Button variant="destructive" className="w-full" type="submit">Удалить аккаунт</Button>
                </div>
            </form>
        </Form>
    )
}

export default SystemForm;