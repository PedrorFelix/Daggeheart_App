"use client";

import { domains } from "../lib/domains";
import Link from "next/link";

type DomainSquareProps = {
    name: string;
}

export function IconSquare(domain : DomainSquareProps) {
    
    const domainData = domains.find((d) => d.name === domain.name);

    return(
        <div className="group relative rounded-3xl border border-solid flex flex-col items-center justify-center bg-gradient-to-br backdrop-blur-sm w-full max-w-[100px] h-[100px] sm:h-[100px] lg:h-[100px]"
            style={{backgroundImage: `linear-gradient(to bottom right, ${domainData?.baseColor}50, ${domainData?.baseColor}20)`, borderColor: domainData?.baseColor}}>
            <div 
                className="w-8 h-8 sm:w-10 sm:h-10"
                style={{
                    mask: `url(${domainData?.Icon}) no-repeat center`,
                    maskSize: "contain",
                    WebkitMask: `url(${domainData?.Icon}) no-repeat center`,
                    WebkitMaskSize: "contain",
                    backgroundColor: "#FFFFFF"
                }}
            />
            <p style = {{color: "#FFFFFF"}}>{domainData?.name}</p>
        </div>
    )
    
}

export function LinkedIconSquare(domain : DomainSquareProps) {
    
    const domainData = domains.find((d) => d.name === domain.name);

    return(
        <Link
            href={`/domains/${domain.name}`}
            className="group relative rounded-3xl border border-solid flex flex-col items-center justify-center bg-gradient-to-br backdrop-blur-sm w-full max-w-[100px] h-[100px] sm:h-[100px] lg:h-[100px]"
            style={{backgroundImage: `linear-gradient(to bottom right, ${domainData?.baseColor}50, ${domainData?.baseColor}20)`, borderColor: domainData?.baseColor}}>
                <div 
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    style={{
                        mask: `url(${domainData?.Icon}) no-repeat center`,
                        maskSize: "contain",
                        WebkitMask: `url(${domainData?.Icon}) no-repeat center`,
                        WebkitMaskSize: "contain",
                        backgroundColor: "#FFFFFF"
                    }}
                />
                <p style = {{color: "#FFFFFF"}}>{domainData?.name}</p>
        </Link>
    )
    
}


export function InfoSquare({info, color}:{info: [title: string, value: string]; color: string;}){
    return(
        <div className="group relative rounded-3xl border border-solid flex flex-col items-center justify-center bg-gradient-to-br backdrop-blur-sm w-full max-w-[100px] h-[100px] sm:h-[100px] lg:h-[100px]"
            style={{backgroundImage: `linear-gradient(to bottom right, ${color}50, ${color}20)`, borderColor: color}}>
            <p className="font-bold text-center" style = {{color: "#FFFFFF"}}>{info[1]}</p>
            <h3 className="font-bold text-center" style = {{color: "#FFFFFF"}}>{info[0]}</h3>
        </div>
    )
}

export function LinkedInfoSquare({info, color, destination}:{info: [title: string, value: string]; color: string; destination: string;}){

    return(
        <Link
            href={destination}
            className="group relative rounded-3xl border border-solid flex flex-col items-center justify-center bg-gradient-to-br backdrop-blur-sm w-full max-w-[100px] h-[100px] sm:h-[100px] lg:h-[100px]"
                style={{backgroundImage: `linear-gradient(to bottom right, ${color}50, ${color}20)`, borderColor: color}}>
                <p className="font-bold text-center" style = {{color: "#FFFFFF"}}>{info[1]}</p>
                <h3 className="font-bold text-center" style = {{color: "#FFFFFF"}}>{info[0]}</h3>
        </Link>
    )
}