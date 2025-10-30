import { notFound } from "next/navigation";
import { domains } from "@/app/lib/domains";
import Link from "next/link";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";

type DomainPageProps = {
  params: {
    domain: string;
  };
};

type DomainResponse = {
  domain: {
    _id: string;
    title: string;
    description: string;
  };
  cards: Array<{
    _id: string;
    title: string;
    description: string;
    level: number;
    type: string;
    recall_cost: number;
  }>;
};

// Separate component for data fetching
async function DomainContent({ domain }: { domain: string }) {
  const domainData = domains.find((d) => d.name === domain);

  if (!domainData) {
    notFound();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards?domain=${domainData.name}`,
      { 
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data: DomainResponse = await res.json();

    return (
      <>
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 
            className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6"
            style={{ color: domainData.baseColor }}
          >
            {domainData.name}
          </h1>
          <p className="text-lg text-gray-300 max-w-4xl leading-relaxed">
            {data.domain.description}
          </p>
        </div>

        {/* Domain Cards Section */}
        <div className="mb-8">
          <h2 
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
            style={{ color: domainData.baseColor }}
          >
            Domain Cards
          </h2>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.cards.map((card) => (
              <div
                key={card._id}
                className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
                style={{
                  borderColor: domainData.baseColor,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: domainData.baseColor }}
                  >
                    {card.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-300">
                      Level {card.level}
                    </div>
                    <div className="text-sm text-gray-400">
                      {card.type}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-3 leading-relaxed">
                  {card.description}
                </p>
                
                <div 
                  className="text-sm font-medium"
                  style={{ color: domainData.baseColor }}
                >
                  Recall Cost: {card.recall_cost}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching domain data:", error);
    
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-lg text-gray-300 mb-4">
          Failed to load domain data. Please try again later.
        </p>
      </div>
    );
  }
}

// Main page component
export default async function DomainPage({ params }: DomainPageProps) {
  const { domain } = await params;
  const domainData = domains.find((d) => d.name === domain);

  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Link - Always visible */}
        <div className="mb-8">
          <Link 
            href="/domains"
            className="inline-block px-6 py-3 text-white font-semibold rounded-lg"
            style={{ backgroundColor: domainData?.baseColor || '#6b7280' }}
          >
            Back to Domains
          </Link>
        </div>

        {/* Suspense boundary around async content */}
        <Suspense fallback={<LoadingAnimation message="Loading domain data..." />}>
          <DomainContent domain={domain} />
        </Suspense>

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 lg:h-16"></div>
      </div>
    </div>
  );
}