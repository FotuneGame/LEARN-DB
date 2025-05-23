import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"



interface QuoteWidgetProps extends React.HTMLAttributes<HTMLElement> {
    name:string,
    children: React.ReactElement,
}



function QuoteWidget({ children, name, ...props }: QuoteWidgetProps){
    return(
        <Screen {...props} className={"min-h-[100px] flex flex-col gap-8 justify-center relative rounded-xl "+props.className}>
            <h3 className="text-3xl">{name}</h3>
            {children}
            <Separator />
        </Screen>
    );
}

export default QuoteWidget;