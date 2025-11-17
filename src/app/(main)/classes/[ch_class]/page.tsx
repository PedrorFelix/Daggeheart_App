import { notFound } from "next/navigation";
import { classes } from "@/app/lib/classes";
import type { ClassResponse } from "@/app/types/database";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { PageHeader } from "@/app/components/PageHeader";
import ReturnButton from "@/app/components/ReturnButton";
import ErrorMessage from "@/app/components/ErrorMessage";
import {LinkedIconSquare, InfoSquare} from "@/app/components/InfoSquares";
import { FeatureCard } from "@/app/components/FeatureCard";
import { FeaturesGrid } from "@/app/components/FeatureGrid";

type ClassPageProps = {
    params: Promise<{
        ch_class: string;
    }>;
};

async function fetchClassData(className: string): Promise<ClassResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes?class=${className}`,
        {
            next: {
                revalidate: 3600, // caches for 1h
            },
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch class data: ${res.status}`);
    }

    return res.json();
}

function ClassInfoSection({
    classData,
    colors
}: {
    classData: ClassResponse["class"];
    colors: [string, string];
}) {

    const hp = classData.hp.toString();
    return (
        <section className="mb-8">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mb-8">
                {/* Basic Stats */}
                <article
                    className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm"
                    style={{ borderColor: colors[1] }}
                >
                    <h3 className="text-xl font-bold mb-4" style={{ borderColor: colors[1] }}>
                        Base Stats
                    </h3>
                    <div className="grid grid-cols-2 justify-items-center">
                        <InfoSquare info={['HP', hp]} color="#dc2626"/>
                        <InfoSquare info={['Evasion', hp]} color="#6b7280"/>
                    </div>
                </article>

                {/* Domains */}
                <article
                    className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm"
                    style={{ borderColor: colors[1] }}
                >
                    <h3 className="text-xl font-bold mb-4" style={{ borderColor: colors[1] }}>
                        Domains
                    </h3>
                    <div className="grid grid-cols-2 justify-items-center">
                        {classData.domains.map((domain) => (
                            <LinkedIconSquare key = {domain} name= {domain}/>
                        ))}
                    </div>
                </article>

                {/* Subclasses */}
                <article
                    className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm"
                    style={{ borderColor: colors[1] }}
                >
                    <h3 className="text-xl font-bold mb-4" style={{borderColor: colors[1] }}>
                        Subclasses
                    </h3>
                    <div className="grid grid-cols-2 justify-items-center">
                        {classData.subclasses.map((sub, index) => (
                        <InfoSquare key= {sub} info={[' ', sub]} color={colors[index]}/>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default async function ClassPage({ params }: ClassPageProps) {
    const { ch_class: className } = await params;
    const classInfo = classes.find((c) => c.name === className);


    if (!classInfo) {
        notFound();
    }

    const correctedColor = classInfo.domains[1].baseColor === "#000000" ? classInfo.domains[1].baseColor ="#FFFFFF" : classInfo.domains[1].baseColor;

    let data: ClassResponse;

    try {
        data = await fetchClassData(classInfo.name);
    } catch (error) {
        console.error("Error fetching class data:", error);

        return (
            <div className="p-4 sm:p-8 lg:p-20">
                <div className="max-w-7xl mx-auto relative z-10">
                    <ReturnButton color={classInfo.domains[1].baseColor} destination="/classes" direction="Classes"/>
                    <ErrorMessage />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <div className="max-w-7xl mx-auto relative z-10">
                <PageHeader name={classInfo.name} description={data.class.description} color={correctedColor}/>

                <ReturnButton color={correctedColor} destination="/classes" direction="Classes"/>

                <Suspense fallback={<LoadingAnimation message="Loading class data..." />}>
                    <ClassInfoSection classData={data.class} colors={[classInfo.domains[0].baseColor,classInfo.domains[1].baseColor]}/>
                    <FeatureCard  feature= {data.class.hopeFeature[0]} color= {classInfo.domains[1].baseColor} />
                    <FeaturesGrid  features={data.class.classFeature} color = {classInfo.domains[1].baseColor} />
                </Suspense>

                <div className="h-8 sm:h-12 lg:h-16" />
            </div>
        </div>
    );
}
