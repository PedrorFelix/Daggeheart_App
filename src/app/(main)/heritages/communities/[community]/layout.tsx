"use client";

import { useEffect } from "react";
import { useBackground } from "@/app/contexts/backgroundContext";
import { communities } from "@/app/lib/communities";
import { useParams } from "next/navigation";

export default function CommunityLayout( {children}: {children: React.ReactNode}){
    const { setColor, setLogo } = useBackground();
    const params = useParams();
    const communityName = params.community as string;
    const communityData = communities.find((s) => s.name === communityName);

    useEffect(()=>{
        if(communityData){
            setColor(communityData.color);
            setLogo(communityData.icon);
        }

        return ()=>{
            setColor("#ffffff");
            setLogo("/Svg_DhLogo.svg");
        }
    }, [communityData, setColor, setLogo]);

    return <>{children}</>;
}