import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/shared/ui/alert-dialog"
import { Terminal, AlertCircle  } from "lucide-react"
import { useState } from "react"


interface LogProps extends React.HTMLAttributes<HTMLElement> {
    type: "info" | "error",
    message: string,
    name: string,
    callback: ()=>void
}

function Log({type, message, name, callback}:LogProps){
    const [view,setView] = useState<boolean>(true);

    const close = () =>{
        setView(false);
        callback();
    }

    switch(type){
        case "info":
            return(
                <AlertDialog open={view}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Terminal />
                            <AlertDialogTitle>{name}</AlertDialogTitle>
                            <AlertDialogDescription>{message}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={close}>Закрыть</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        case "error":
            return(
                <AlertDialog open={view}>
                    <AlertDialogContent >
                        <AlertDialogHeader>
                            <AlertCircle color="red"/>
                            <AlertDialogTitle>{name}</AlertDialogTitle>
                            <AlertDialogDescription  className="text-gray-400">{message}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={close}>Закрыть</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
    }
}

export default Log; 