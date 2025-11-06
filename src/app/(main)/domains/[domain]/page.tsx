import { notFound } from "next/navigation";
import { domains } from "@/app/lib/domains";
import type { DomainResponse } from "@/app/types/database";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import SearchInput from "@/app/components/SearchInput";
import Link from "next/link";

type DomainPageProps = {
  params: Promise<{
    domain: string;
  }>;
};

async function fetchDomainData(domainName: string): Promise<DomainResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/domains?domain=${domainName}`,
    { 
      next: {
        revalidate: 3600 //caches for 1h
      },
      headers: {
        'Content-Type': 'application/json', //tells api the request is a json
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch domain data: ${res.status}`);
  }

  return res.json(); //return response as json
}

function BackButton({ color }: { color: string }) {
  let textColor = "#FFFFFF";
  if(color === "#FFFFFF"){ //if pure white
    textColor="#101828";
  }
  return (
    <div className="mb-8">
      <Link 
        href="/domains"
        className='inline-block px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity'
        style={{ backgroundColor: color,  color: textColor}}
      >
        ← Back to Domains
      </Link>
    </div>
  );
}

function DomainHeader({ name, description, color }: { 
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

function DomainCardGrid({ domain, cards, color }: { 
  domain: string;
  cards: DomainResponse['cards']; 
  color: string;
}) {
  return (
    <section className="mb-8">
      <h2 
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        style={{ color }}
      >
        Domain Cards
      </h2>
      
      <SearchInput searchName={domain} color={color} placeholderText="Search "/>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <DomainCard 
            key={card._id}
            card={card}
            color={color}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function DomainCard({ 
  card, 
  color, 
  index 
}: { 
  card: DomainResponse['cards'][0]; 
  color: string; 
  index: number;
}) {
  return (
    <article
      className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
      style={{
        borderColor: color,
        animation: `fadeUp 0.5s ${index * 0.05}s both`
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 
          className="text-xl font-bold"
          style={{ color }}
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
        style={{ color }}
      >
        Recall Cost: {card.recall_cost}
      </div>
    </article>
  );
}

function ErrorMessage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
      <p className="text-lg text-gray-300 mb-4">
        Failed to load domain data. Please try again later.
      </p>
    </div>
  );
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { domain } = await params;
  const domainData = domains.find((d) => d.name === domain);

  if (!domainData) {
    notFound();
  }

  let data: DomainResponse;
  
  try {
    data = await fetchDomainData(domainData.name);
  } catch (error) {
    console.error("Error fetching domain data:", error);
    
    return (
      <div className="p-4 sm:p-8 lg:p-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <BackButton color={domainData.baseColor} />
          <ErrorMessage />
        </div>
      </div>
    );
  }

  if(domainData.baseColor === "#000000"){
    domainData.baseColor = "#FFFFFF"
  }

  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <DomainHeader 
          name={domainData.name}
          description={data.domain.description}
          color={domainData.baseColor}
        />

        <BackButton color={domainData.baseColor} />

        <Suspense fallback={<LoadingAnimation message="Loading domain data..." />}>
          <DomainCardGrid 
            domain={domainData.name}
            cards={data.cards}
            color={domainData.baseColor}
          />
        </Suspense>

        <div className="h-8 sm:h-12 lg:h-16" />
      </div>
    </div>
  );
}