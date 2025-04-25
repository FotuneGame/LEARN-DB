import { Button } from "@/shared/ui/button"
import { useState, useEffect } from "react";

function UpButton(props:{offset:number}){

    const [Y,setY] = useState<number>(0);
    const [clName,setClName] = useState<string>("hidden");

    const up = () =>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const handleVisibleButton = () => {
        const position = window.pageYOffset;
        setY(position);
    
        if (Y > props.offset) {
          return setClName("");
        } else{
          return setClName("hidden");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
    });

    if(Y<props.offset)return;
    return(
        <>
            <Button onClick={up} className={clName + " fixed end-4 bottom-4 z-10"}>
                Наверх
            </Button>
        </>
    )
}

export default UpButton;