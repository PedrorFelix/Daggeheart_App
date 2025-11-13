"use client";

import { communities } from "@/app/lib/communities";
import ReturnButton from "@/app/components/ReturnButton";
import CardButton from "@/app/components/CardButton";
import { BasicPageHeader } from "@/app/components/PageHeader";

export default function Backgrounds() {
    return(
        <div className="p-4 sm:p-8 lg:p-20">
            <main className="max-w-7xl mx-auto relative z-10">
                <BasicPageHeader/>
                <ReturnButton color="#FFFFFF" destination="/heritages" direction="Heritage Page"/>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
                    {communities.map((community, index) => (
                      <CardButton
                      key = {community.name}
                      name = {community.name}
                      href = {`communities/${community.name}`}
                      icon = {community.icon}
                      color = {community.color}
                      index = {index}
                      />
                    ))}
                </div>
                <div className="h-8 sm:h-12 lg:h-16"></div>
            </main>
        </div>
    );
}
