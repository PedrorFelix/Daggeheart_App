"use client";

import { useEffect } from "react";
import { useBackground } from "@/app/contexts/backgroundContext";
import { backgrounds } from "@/app/lib/backgrounds";
import { useParams } from "next/navigation";

export default function BackgroundLayout( {children}: {children: React.ReactNode}){
    const { setColor, setLogo } = useBackground();
    const params = useParams();
    const backgroundName = params.background as string;
    const backgroundData = backgrounds.find((s) => s.name === backgroundName);

    useEffect(()=>{
        if(backgroundData){
            setColor(backgroundData.color);
            setLogo(backgroundData.icon);
        }

        return ()=>{
            setColor("#ffffff");
            setLogo("/Svg_DhLogo.svg");
        }
    }, [backgroundData, setColor, setLogo]);

    return <>{children}</>;
}