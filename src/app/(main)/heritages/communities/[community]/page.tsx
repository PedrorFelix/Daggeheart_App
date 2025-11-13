import { notFound } from "next/navigation";
import { communities } from "@/app/lib/communities";
import type { CommunityResponse } from "@/app/types/database";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { PageHeader } from "@/app/components/PageHeader";
import ReturnButton from "@/app/components/ReturnButton";
import ErrorMessage from "@/app/components/ErrorMessage";
import FeaturesGrid from "@/app/components/FeatureGrid";


type CommunityPageProps = {
    params: Promise<{
        community: string;
    }>;
};

async function fetchCommunityData(communityName: string): Promise<CommunityResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/communities?community=${communityName}`,
        {
            next: {
                revalidate: 3600,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch community data: ${res.status}`);
    }

    return res.json();
}

export default async function CommunityPage({ params }: CommunityPageProps) {
    const { community: communityName } = await params;
    const communityData = communities.find((s) => s.name === communityName);

    if (!communityData) {
        notFound();
    }

    let data: CommunityResponse;

    try {
        data = await fetchCommunityData(communityData.name);
    } catch (error) {
        console.error("Error fetching species data:", error);

        return (
            <div className="p-4 sm:p-8 lg:p-20">
                <div className="max-w-7xl mx-auto relative z-10">
                    <ReturnButton color={communityData.color} destination="/heritages/communities" direction="Communities"/>
                    <ErrorMessage />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <div className="max-w-7xl mx-auto relative z-10">
                <PageHeader
                    name={communityData.name}
                    description={data.community.description}
                    color={communityData.color}
                />

                <ReturnButton color={communityData.color} destination="/heritages/communities" direction="Communities"/>

                <Suspense
                    fallback={
                        <LoadingAnimation message="Loading community data..." />
                    }
                >
                    <FeaturesGrid features={data.community.feature} color={communityData.color}/>
                </Suspense>

                <div className="h-8 sm:h-12 lg:h-16" />
            </div>
        </div>
    );
}
