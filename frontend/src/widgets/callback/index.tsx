import type { CallbackFormType } from "@/components/form/callback";
import CallbackForm from "@/components/form/callback";
import Screen from "@/components/screen";
import CallbackAPI from "@/api/callback";
import {Card, CardContent} from "@/components/ui/card"



interface CallbackWidgetProps extends React.HTMLAttributes<HTMLElement> {
    img: string,
}



function CallbackWidget({img,...props}:CallbackWidgetProps){

    async function onSubmit(values:CallbackFormType){
        try{
            const res = await CallbackAPI.send(values);
            if(!res) return;
        }catch(err){
            console.error(err);
        }
    }

    return(
        <Screen 
            {...props} 
            className={`flex flex-col-reverse justify-center md:flex-row md:justify-between gap-8 relative overflow-hidden rounded-xl ${props.className}`}
        >
            <div className="md:w-1/3 flex flex-col justify-around gap-4">
                <h3 className="text-3xl">Обратная связь</h3>
                <CallbackForm onSubmit={onSubmit}/>
            </div>
            <img 
                className="md:w-2/3 max-h-[400px] object-cover brightness-75 rounded-xl" 
                src={img} 
                alt="Изображение для обратно связи"
                loading="lazy"
            />
        </Screen>
    )
}

export default CallbackWidget;