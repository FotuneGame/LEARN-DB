import { useEffect, useState, useRef } from "react";


interface IProps{
    value: number,
    duration: number,
    className?: string
}



function GrowNumber({value,duration,className}:IProps){

    const [numb,setNumb] = useState<number>(value);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = (timestamp: number) => {
          if (!startTimeRef.current) startTimeRef.current = timestamp;
          const progress = timestamp - startTimeRef.current;
          const progressRatio = Math.min(progress / duration, 1);
          
          setNumb(Math.floor(progressRatio * value));
    
          if (progress < duration) {
            requestRef.current = requestAnimationFrame(animate);
          }
        };
    
        requestRef.current = requestAnimationFrame(animate);
    
        return () => {
          if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
          }
        };
    }, [value, duration]);
    


    return <span className={className}>{numb}</span>;
}

export default GrowNumber;