import { notFound } from "next/navigation";
import { communities } from "@/app/lib/communities";
import type { CommunityResponse } from "@/app/types/database";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import Link from "next/link";

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

function BackButton({ color }: { color: string }) {
    let textColor = "#FFFFFF";
    if (color === "#FFFFFF") {
        textColor = "#101828";
    }
    return (
        <div className="mb-8">
            <Link
                href="/heritages/communities"
                className="inline-block px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: color, color: textColor }}
            >
                ← Back to Communities
            </Link>
        </div>
    );
}

function CommunityHeader({
    name,
    description,
    color,
}: {
    name: string;
    description: string;
    color: string;
}) {
    return (
        <header className="text-left mb-8 sm:mb-12 lg:mb-16">
            <h1
                className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6"
                style={{ color }}
            >
                {name}
            </h1>
            <p className="text-lg text-gray-300 max-w-4xl leading-relaxed">
                {description}
            </p>
        </header>
    );
}

function FeatureCard({
    feature,
    color,
}: {
    feature: { name: string; description: string };
    color: string;
}) {
    return (
        <article
            className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
            style={{
                borderColor: color,
            }}
        >
            <h3 className="text-xl font-bold mb-3" style={{ color }}>
                {feature.name}
            </h3>

            <p className="text-gray-300 leading-relaxed">
                {feature.description}
            </p>
        </article>
    );
}

function FeatureSection({
    feature,
    color,
}: {
    feature: { name: string; description: string }[];
    color: string;
}) {
    return (
        <section className="mb-8">
            <h2
                className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
                style={{ color }}
            >
                Community Feature
            </h2>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {feature.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} color={color} />
                ))}
            </div>
        </section>
    );
}

function ErrorMessage() {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
            <p className="text-lg text-gray-300 mb-4">
                Failed to load community data. Please try again later.
            </p>
        </div>
    );
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
                    <BackButton color={communityData.color} />
                    <ErrorMessage />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <div className="max-w-7xl mx-auto relative z-10">
                <CommunityHeader
                    name={communityData.name}
                    description={data.community.description}
                    color={communityData.color}
                />

                <BackButton color={communityData.color} />

                <Suspense
                    fallback={
                        <LoadingAnimation message="Loading community data..." />
                    }
                >
                    <FeatureSection
                        feature={data.community.feature}
                        color={communityData.color}
                    />
                </Suspense>

                <div className="h-8 sm:h-12 lg:h-16" />
            </div>
        </div>
    );
}
