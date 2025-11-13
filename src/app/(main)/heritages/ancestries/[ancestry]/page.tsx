import { notFound } from "next/navigation";
import { ancestries } from "@/app/lib/ancestries";
import type { AncestryResponse } from "@/app/types/database";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { PageHeader } from "@/app/components/PageHeader";
import ReturnButton from "@/app/components/ReturnButton";
import ErrorMessage from "@/app/components/ErrorMessage";
import FeaturesGrid from "@/app/components/FeatureGrid";
 
type AncestryPageProps = {
    params: Promise<{
        ancestry: string;
    }>;
};

async function fetchSpeciesData(ancestryName: string): Promise<AncestryResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ancestries?ancestry=${ancestryName}`,
        {
            next: {
                revalidate: 3600, //caches for 1h
            },
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch ancestry data: ${res.status}`);
    }

    return res.json();
}

export default async function AncestryPage({ params }: AncestryPageProps) {
    const { ancestry: ancestryName } = await params;
    const ancestryData = ancestries.find((s) => s.name === ancestryName);

    if (!ancestryData) {
        notFound();
    }

    let data: AncestryResponse;

    try {
        data = await fetchSpeciesData(ancestryData.name);
    } catch (error) {
        console.error("Error fetching ancestry data:", error);

        return (
            <div className="p-4 sm:p-8 lg:p-20">
                <div className="max-w-7xl mx-auto relative z-10">
                    <ReturnButton color= {ancestryData.color} destination="/heritages/ancestries" direction="Ancestries"/>
                    <ErrorMessage />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <div className="max-w-7xl mx-auto relative z-10">
                <PageHeader
                    name={ancestryData.name}
                    description={data.ancestry.description}
                    color={ancestryData.color}
                />

                <ReturnButton color= {ancestryData.color} destination="/heritages/ancestries" direction="Ancestries"/>

                <Suspense fallback= {<LoadingAnimation message="Loading ancestry data..." />}>
                    <FeaturesGrid features={data.ancestry.Features} color={ancestryData.color}/>
                </Suspense>

                <div className="h-8 sm:h-12 lg:h-16" />
            </div>
        </div>
    );
}
