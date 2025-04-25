import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"
import { Carousel,CarouselContent, CarouselItem, CarouselPrevious,CarouselNext } from "@/shared/ui/carousel"



interface CarouselWidgetProps extends React.HTMLAttributes<HTMLElement> {
    name:string,
    children: React.ReactElement[] | React.ReactElement,
}



function CarouselWidget({ children, name, ...props }: CarouselWidgetProps){
    
    return(
        <Screen {...props} className={"flex flex-col gap-8 justify-center relative overflow-hidden rounded-xl px-[50px] "+props.className}>

            <div className="flex flex-col gap-2">
                <h3 className="text-3xl">{name}</h3>
                <Separator />
            </div>
             <Carousel className="w-full flex items-center">
                <CarouselContent className="-ml-1">
                    {children && (Array.isArray(children) ? children.map((child, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            {child}
                        </div>
                    </CarouselItem>
                    )) : children )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <Separator />
        </Screen>
    )
}

export default CarouselWidget;