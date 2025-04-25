import Screen from "@/shared/ui/screen"


interface VideoWidgetProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  youtubeId: string
}



function VideoWidget({ name, youtubeId, ...props }: VideoWidgetProps) {
  const videoId = youtubeId.includes('youtu.be/') 
    ? youtubeId.split('youtu.be/')[1] 
    : youtubeId

  return (
    <Screen 
      {...props} 
      className={`flex flex-col gap-8 justify-center relative overflow-hidden rounded-xl ${props.className}`}
    >
      <h3 className="text-3xl">{name}</h3>
      <div className="relative aspect-video w-full lg:w-max-[1000px] lg:flex lg:justify-center">
        <iframe
          className="w-full min-h-full md:min-h-[720px] rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`YouTube video: ${name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Screen>
  )
}

export default VideoWidget