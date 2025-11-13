"use client";

import ReturnButton from "@/app/components/ReturnButton";
import CardButton from "@/app/components/CardButton";
import { BasicPageHeader } from "@/app/components/PageHeader";

const sections = [
    {name: "Ancestries", href: "/ancestries", color: "#FFFFFF", icon: "/aff_species.svg"},
    {name: "Communities", href: "/communities", color: "#FFFFFF", icon: "/Svg_DhLogo.svg"},
];

export default function Ancestry() {
    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <main className="max-w-7xl mx-auto relative z-10">
                <BasicPageHeader/>
                <ReturnButton color="#FFFFFF" destination="/" direction="Main Page"/>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
                    {sections.map((section, index) => (
                        <div key={section.name} className="relative w-full flex justify-center">
                            <CardButton
                                name={section.name}
                                href={`/heritages${section.href}`}
                                color={section.color}
                                icon={section.icon}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
                <div className="h-8 sm:h-12 lg:h-16"></div>
            </main>
        </div>
    );
}
