import { notFound } from "next/navigation";
import { domains } from "@/app/lib/domains";
import Link from "next/link";

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

export default async function DomainPage({ params }: DomainPageProps) {
  const { domain } = await params;
  const domainData = domains.find((d) => d.name === domain);

  if (!domainData) {
    notFound();
  }

  try {
    // Fetch data from API
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
      const errorText = await res.text();
      console.error("API error:", errorText);
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data: DomainResponse = await res.json();
    console.log("API response:", data);

    return (
      <main 
        className="min-h-screen p-8 flex flex-col items-center justify-start relative bg-gray-900"
      >
        {/* Domain SVG Background*/}
        <div
          className="fixed pointer-events-none z-0 opacity-15"
          style={{
            width: '150vw',
            height: '150vh',
            bottom: '-50vh',
            right: '-50vw',
            mask: `url(${domainData.Icon}) no-repeat center`,
            maskSize: "contain",
            WebkitMask: `url(${domainData.Icon}) no-repeat center`,
            WebkitMaskSize: "contain",
            backgroundColor: domainData.baseColor,
          }}
        />

        {/* Return button */}
        <Link
          className="p-1.5 mb-3 rounded"
          style={{ backgroundColor: domainData.baseColor }}
          href="/">
        Return</Link>

        {/* Name */}
        <h1 className="text-4xl font-bold mb-4 relative z-10" style={{ color: domainData.baseColor }}>
          {domainData.name}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-4xl mb-8 relative z-10">
          {data.domain.description}
        </p>

        {/* Domain Cards */}
        <div className="w-full max-w-6xl relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: domainData.baseColor }}>
            Domain Cards
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/*For each card found*/}
            {data.cards.map((card) => (
              <div
                key={card._id}
                className="p-6 rounded-lg border-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-lg transition-all duration-200"
                style={{
                  borderColor: domainData.baseColor,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold" style={{ color: domainData.baseColor }}>
                    {card.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Level {card.level}
                    </div>
                    <div className="text-sm text-gray-500">
                      {card.type}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {card.description}
                </p>
                
                <div className="text-sm font-medium" style={{ color: domainData.baseColor }}>
                  Recall Cost: {card.recall_cost}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) { //Error Handling Render
    console.error("Error fetching domain data:", error);
    
    return (
      <main className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Failed to load domain data. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check the console for more details.
          </p>
        </div>
      </main>
    );
  }
}