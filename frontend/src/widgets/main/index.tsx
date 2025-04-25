import Screen from "@/shared/ui/screen"
import { Separator } from "@/shared/ui/separator"



interface MainScreenProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode,
  img: string,
}



function MainWidget({ children, img, ...props }: MainScreenProps) {
  return (
    <Screen {...props} className={"min-h-[400px] flex gap-4 relative overflow-hidden rounded-xl "+props.className}>
      <div className="w-full bg-black relative">
        <img 
          className="absolute inset-0 w-full h-full object-cover brightness-75" 
          src={img} 
          alt="Главное изображение"
          loading="lazy"
        />
      </div>
      <div className="absolute top-[5%] md:top-[25%] flex items-center gap-4 p-4">
        <div className="flex flex-col gap-2 w-full">
          {children}
        </div>
        <Separator orientation="vertical" className="min-h-[200px] hidden md:block" />
      </div>
    </Screen>
  );
}

export default MainWidget;