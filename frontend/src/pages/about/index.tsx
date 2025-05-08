import MainWidget from "@/widgets/main"
import QuoteWidget from "@/widgets/quote"
import VideoWidget from "@/widgets/video"
import StatisitcsAllWidget from "@/widgets/statisticsAll"

import AboutImg from "/imgs/about.jpg"
import Img1 from "/imgs/1.jpg";
import Img2 from "/imgs/2.jpg";
import Img3 from "/imgs/3.jpg";
import Img4 from "/imgs/4.jpg";



function About(){
    return(
        <div className="flex flex-col gap-16 my-12">
            
            <MainWidget img={AboutImg}> 
                <h1 className="text-6xl text-white mb-6">О нас</h1>
                <p className="text-2xl text-gray-200">Давайте познакомимся поближе и расскажем вам о нашей компании...</p>
            </MainWidget>
            
            <StatisitcsAllWidget duration={3000} name="Наши показатели"/>

            <QuoteWidget name="Кто мы?">
                <h2 className="text-xl">Мы - студент о721б Титов Г.А. разработавший этот щедевр... а делее держите рыба текст: С учётом сложившейся международной обстановки, высокое качество позиционных исследований однозначно определяет каждого участника как способного принимать собственные решения касаемо приоретизации разума над эмоциями. Однозначно, независимые государства, инициированные исключительно синтетически, объявлены нарушающими общечеловеческие нормы этики и морали. В рамках спецификации современных стандартов, диаграммы связей будут ограничены исключительно образом мышления.</h2>
            </QuoteWidget>
            
            <QuoteWidget name="Немного фотографий">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[1000px]">
                    <div className="relative w-full h-full">
                        <img src={Img1} alt="имба1" className="absolute inset-0 w-full h-full object-cover rounded-xl brightness-75 hover:scale-110 hover:brightness-100 hover:z-100 transition-all" />
                    </div>
                    <div className="relative w-full h-full">
                        <img src={Img2} alt="имба1" className="absolute inset-0 w-full h-full object-cover rounded-xl brightness-75 hover:scale-110 hover:brightness-100 hover:z-100 transition-all" />
                    </div>
                    <div className="relative w-full h-full">
                        <img src={Img3} alt="имба1" className="absolute inset-0 w-full h-full object-cover rounded-xl brightness-75 hover:scale-110 hover:brightness-100 hover:z-100 transition-all" />
                    </div>
                    <div className="relative w-full h-full">
                        <img src={Img4} alt="имба1" className="absolute inset-0 w-full h-full object-cover rounded-xl brightness-75 hover:scale-110 hover:brightness-100 hover:z-100 transition-all" />
                    </div>
                </div>
            </QuoteWidget>

            <VideoWidget youtubeId="HKzurBuZMxA"  name="Растение в честь которого мы назвали наш сервис..."/>

        </div>
    )
}

export default About