import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormItem, FormMessage } from "@/shared/ui/form"
import { Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserType } from "@/types"



export type SubmitAccountType = z.infer<typeof formSchema>;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const formSchema = z.object({
    first_name: z.string().min(1, {
        message: "Неверное имя!"
    }),
    second_name: z.string().min(1, {
        message: "Неверное фамилия!"
    }),
    middle_name: z.string().min(1, {
        message: "Неверное отчество!"
    }),
    file: z.union([
        z.instanceof(File)
            .refine(file => file && file.size <= MAX_FILE_SIZE, {
            message: "Максимальный размер файла - 10MB",
            })
            .refine(file => file && ACCEPTED_FILE_TYPES.includes(file.type), {
            message: "Поддерживаются только .jpg, .png и .pdf файлы",
            }),
        z.null(),
    ])
})




function AccountForm (props: {
    onSubmit: (values:SubmitAccountType)=>Promise<void>,
    user:UserType,
    load: boolean,
    defaultValues: SubmitAccountType
}){

    const form = useForm<SubmitAccountType>({
        resolver: zodResolver(formSchema),
        defaultValues: props.defaultValues
    });

    const previewUrlRef = useRef<string | null>(null);
    const [displayUrl, setDisplayUrl] = useState<string>(props.user.avatar);
    const [hasChanges, setHasChanges] = useState(false);
    const formValues = form.watch();

    const cleanupPreview = () => {
        if (previewUrlRef && previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
          setDisplayUrl(props.user.avatar);
        }
    };

    function clear(e: React.MouseEvent) {
        e.preventDefault();
        form.clearErrors();
        form.reset();
        cleanupPreview();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            cleanupPreview();
            const newUrl = URL.createObjectURL(file);
            previewUrlRef.current = newUrl;
            setDisplayUrl(newUrl);
            form.setValue("file", file);
        }
    };

    useEffect(() => {
        const changed = Object.keys(props.defaultValues).some(
            key => formValues[key as keyof SubmitAccountType] !== props.defaultValues[key as keyof SubmitAccountType]
        );
        setHasChanges(changed);
    }, [formValues, props.defaultValues]);
    
  

    return(
         <Form {...form}>
            <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="space-y-8">
                        <div className="space-y-8 flex gap-4 items-center">
                            <div className="p-0 m-0">
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Аватарка</FormLabel>
                                            <FormControl>
                                                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                                            </FormControl>
                                            <FormDescription>Фотография вашего аккаунта</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <Avatar className="w-[100px] h-[100px] p-0 m-0">
                                <AvatarImage 
                                    src={displayUrl}
                                    onError={() => {
                                        console.error("Ошибка загрузки изображения");
                                        cleanupPreview();
                                    }}
                                />
                                <AvatarFallback>А</AvatarFallback>
                            </Avatar>
                        </div>
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
                </div>
                <div className="flex flex-col items-center md:flex-row gap-4">
                    <Button disabled={!hasChanges || props.load} variant="outline" className="w-full md:w-auto" onClick={clear}>Отменить</Button>
                    <Button disabled={!hasChanges || props.load} className="w-full md:w-auto" type="submit">
                        {props.load ? <Loader2 className="animate-spin" /> : "Сохранить"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AccountForm;