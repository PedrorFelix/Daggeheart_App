'use client'

import React, {createContext, useContext, useState, ReactNode} from "react";

type ColorContextType = { //contextType
    color: string; //the color of the logo
    setColor: (color: string) => void;  //the function that changes the logo color
};

const ColorContext =  createContext<ColorContextType | undefined> (undefined); //context creation 

export function ColorProvider({children}: {children: ReactNode}){
    const [color, setColor] = useState("#ffffff");

    return(
        <ColorContext.Provider value= {{color, setColor}}>
            {children}
        </ColorContext.Provider>
    )

}

export function useColor(){
    const context = useContext(ColorContext);
    if(context === undefined){
        throw new Error('useColor must be used within a ColorProvider')
    }
    return context
}