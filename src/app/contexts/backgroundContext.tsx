'use client'

import React, { createContext, useContext, useState, ReactNode} from "react";

type BackgroundContextType = {
    logo: string;
    color: string;
    setLogo: (logo: string) => void;
    setColor: (color: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined> (undefined);

export function BackgroundProvider( {children}: {children: ReactNode}){
    const [color, setColor] = useState('#ffffff');
    const [logo, setLogo] = useState("@/Svg_DhLogo.svg")

    return(
        <BackgroundContext.Provider value ={{color, logo, setColor, setLogo}}>
             {children}
        </BackgroundContext.Provider>
    )
}

export function useBackground(){
    const context = useContext(BackgroundContext);
    if(context === undefined) {
        throw new Error('useBackground must be used inside a BackgroundProvider');
    }
    return context;
}