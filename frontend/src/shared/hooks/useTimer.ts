import { useState, useEffect } from "react";


export function useTimer(start=60, step=1000){
    const [time,setTime] = useState<number>(start);
    
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(prevTime => prevTime - 1);
        },step);

        return ()=>clearInterval(timer);
    }, []);

    return [time, ()=>{setTime(start)}] as [number,()=>void]
}