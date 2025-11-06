import { notFound } from "next/navigation";
import { species } from "@/app/lib/species";
import type { SpeciesResponse } from "@/app/types/database";
import { Suspense } from "react";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import Link from "next/link";

type SpeciesPageProps = {
  params: Promise<{
    species: string;
  }>;
};

async function fetchSpeciesData(speciesName: string): Promise<SpeciesResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/species?species=${speciesName}`,
    { 
      next: {
        revalidate: 3600 //caches for 1h
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch species data: ${res.status}`);
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
        href="/ancestries/species"
        className='inline-block px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity'
        style={{ backgroundColor: color, color: textColor }}
      >
        ← Back to Species
      </Link>
    </div>
  );
}

function SpeciesHeader({ name, description, color }: { 
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
  index 
}: { 
  feature: { name: string; description: string }; 
  color: string; 
  index: number;
}) {
  return (
    <article
      className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
      style={{
        borderColor: color,
        animation: `fadeUp 0.5s ${index * 0.1}s both`
      }}
    >
      <h3 
        className="text-xl font-bold mb-3"
        style={{ color }}
      >
        {feature.name}
      </h3>
      
      <p className="text-gray-300 leading-relaxed">
        {feature.description}
      </p>
    </article>
  );
}

function FeaturesSection({ features, color }: { 
  features: { name: string; description: string }[]; 
  color: string;
}) {
  return (
    <section className="mb-8">
      <h2 
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        style={{ color }}
      >
        Species Features
      </h2>
      
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.name}
            feature={feature}
            color={color}
            index={index}
          />
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
        Failed to load species data. Please try again later.
      </p>
    </div>
  );
}

export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const { species: speciesName } = await params;
  const speciesData = species.find((s) => s.name === speciesName);

  if (!speciesData) {
    notFound();
  }

  let data: SpeciesResponse;
  
  try {
    data = await fetchSpeciesData(speciesData.name);
  } catch (error) {
    console.error("Error fetching species data:", error);
    
    return (
      <div className="p-4 sm:p-8 lg:p-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <BackButton color={speciesData.color} />
          <ErrorMessage />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <SpeciesHeader 
          name={speciesData.name}
          description={data.species.description}
          color={speciesData.color}
        />

        <BackButton color={speciesData.color} />

        <Suspense fallback={<LoadingAnimation message="Loading species data..." />}>
          <FeaturesSection 
            features={data.species.Features}
            color={speciesData.color}
          />
        </Suspense>

        <div className="h-8 sm:h-12 lg:h-16" />
      </div>
    </div>
  );
}