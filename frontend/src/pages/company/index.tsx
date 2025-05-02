import { Separator } from "@/shared/ui/separator"
import StatisitcsWidget from "@/widgets/statistics";

function Company(){
    return(
        <div className="flex flex-col items-center md:items-start gap-4 mb-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-center md:text-start">Компания и статистика</h1>
                <Separator className="min-w-[200px] md:min-w-[400px]"/>
            </div>
            <StatisitcsWidget />
        </div>
    )
}

export default Company