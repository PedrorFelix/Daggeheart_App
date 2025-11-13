"use client";

import { domains } from "@/app/lib/domains";
import ReturnButton from "@/app/components/ReturnButton";
import CardButton from "@/app/components/CardButton";
import { BasicPageHeader } from "@/app/components/PageHeader";

export default function Domain() {
    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <main className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <BasicPageHeader/>

                {/* Navigation Link */}
                <div className="mb-8">
                    <ReturnButton color="#FFFFFF" destination="/" direction="Main Page"/>
                </div>

                {/* Domain Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
                    {domains.map((domain, index) => (
                        <CardButton
                            key={domain.name}
                            name={domain.name}
                            href={`/domains/${domain.name}`}
                            color={domain.baseColor}
                            icon={domain.Icon}
                            index={index}
                        />
                    ))}
                </div>

                {/* Footer spacing */}
                <div className="h-8 sm:h-12 lg:h-16"></div>
            </main>
        </div>
    );
}
