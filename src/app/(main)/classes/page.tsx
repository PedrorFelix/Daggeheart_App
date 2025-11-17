"use client";

import { classes } from "@/app/lib/classes";
import { Class_CardButton } from "@/app/components/CardButton";
import { BasicPageHeader } from "@/app/components/PageHeader";
import ReturnButton from "@/app/components/ReturnButton";

export default function Class(){
    return(
        <div className="p-4 sm:p-8 lg:p-20">
            <main className="max-w-7xl mx-auto relative z-10">
                <BasicPageHeader/>
                <ReturnButton color="#FFFFFF" destination="/" direction="Main Page"/>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
                    {classes.map((domain, index) => (
                        <Class_CardButton
                            key={domain.name}
                            name={domain.name}
                            href={`/classes/${domain.name}`}
                            color= {domain.domains[1].baseColor}
                            colorSecondary = {domain.domains[0].baseColor}
                            icon= {domain.domains[1].Icon}
                            iconSecondary= {domain.domains[0].Icon}
                            index={index}
                        />
                    ))}
                </div>
                <div className="h-8 sm:h-12 lg:h-16"></div>
            </main>
        </div>
    )
}