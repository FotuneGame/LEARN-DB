import MainWidget from "@/widgets/main"
import CarouselWidget from "@/widgets/carousel"
import ServiceCard from "@/entities/service"
import QuoteWidget from "@/widgets/quote"
import VideoWidget from "@/widgets/video"
import CallEmployeeWidget from "@/widgets/callEmployee"

import MainImg from "/imgs/main2.jpg"

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion"

import {paths} from "@/shared/const"



function Main(){
    return(
        <div className="flex flex-col gap-16 my-12">
            
            <MainWidget img={MainImg}> 
                <h1 className="text-6xl text-white">Лучший Call-центр мира</h1>
                <p className="text-2xl text-gray-200">Все что необходимо для комфортной работы B2B предприятий</p>
            </MainWidget>
            
            <CallEmployeeWidget name="Обратиться к нам:" delay={5000}/>


            
            <QuoteWidget name="Почему мы?">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-md">Быстро и качественно предоставляем услуги</AccordionTrigger>
                        <AccordionContent>
                            Лишь некоторые особенности внутренней политики будут превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Современные технологии достигли такого уровня, что разбавленное изрядной долей эмпатии, рациональное мышление играет важную роль в формировании прогресса профессионального сообщества.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-md">Быстрые и бесперебойные серверы для работы</AccordionTrigger>
                        <AccordionContent>
                            Являясь всего лишь частью общей картины, реплицированные с зарубежных источников, современные исследования лишь добавляют фракционных разногласий и объективно рассмотрены соответствующими инстанциями. Являясь всего лишь частью общей картины, сторонники тоталитаризма в науке объединены в целые кластеры себе подобных. В целом, конечно, разбавленное изрядной долей эмпатии, рациональное мышление обеспечивает актуальность соответствующих условий активизации.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-md">У нас есть то, чего нет у других...</AccordionTrigger>
                        <AccordionContent>
                            Лишь акционеры крупнейших компаний представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть объединены в целые кластеры себе подобных. Приятно, граждане, наблюдать, как некоторые особенности внутренней политики, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут функционально разнесены на независимые элементы.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </QuoteWidget>

            <VideoWidget youtubeId="4X_FpCgpjck"  name="Преимущества организации горячей линии в аутсорсинговом колл-центре"/>

            <CarouselWidget name="Основные услуги">
                <ServiceCard header="Грамотная ERP" description="Удобная для работы система B2B" url={paths.auth}/>
                <ServiceCard header="Автоматизация" description="Настройте и автоматизируйте работу вашей компании" url={paths.auth}/>
                <ServiceCard header="Работа с клиентами" description="Реагируйте на все вопросы пользователей вовремя" url={paths.auth}/>
                <ServiceCard header="Учёт работы" description="Контролируйте процесс работы ваших сотрудников" url={paths.auth}/>
                <ServiceCard header="Простое освоение" description="Наличие понятной документации" url={paths.auth}/>
            </CarouselWidget>

        </div>
    )
}

export default Main