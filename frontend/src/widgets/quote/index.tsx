import Screen from "@/components/screen"
import { Separator } from "@/components/ui/separator"



interface QuoteWidgetProps extends React.HTMLAttributes<HTMLElement> {
    name:string,
    text: string
    children: React.ReactElement,
}



function QuoteWidget({ children, name, text, ...props }: QuoteWidgetProps){
    return(
        <Screen {...props} className={"min-h-[100px] flex flex-col gap-8 justify-center relative overflow-hidden rounded-xl "+props.className}>
            <h3 className="text-3xl">{name}</h3>
            {children}
            <Separator />
        </Screen>
    );
}

export default QuoteWidget;