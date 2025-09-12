import { notFound } from "next/navigation";
import { domains } from "@/app/lib/domains";

type DomainPageProps = {
  params: {
    domain: string;
  };
};

export default async function DomainPage({ params }: DomainPageProps) {
  const { domain } = await params;
  const domainData = domains.find((d) => d.name === domain);

  if (!domainData) {
    notFound(); // shows 404 if slug doesn't exist
  }

  //Fetch data from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards?domain=${domainData.name}`,
    { cache: "no-store" }
  );

  console.log("API status:", res.status); // <--- check status
  const text = await res.text();
  console.log("API response:", text); // <--- check response

  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      {/* Icon */}
      <div
        className="w-32 h-32 mb-6"
        style={{
          mask: `url(${domainData.Icon}) no-repeat center`,
          maskSize: "contain",
          WebkitMask: `url(${domainData.Icon}) no-repeat center`,
          WebkitMaskSize: "contain",
          backgroundColor: domainData.baseColor,
        }}
      />

      {/* Name */}
      <h1 className="text-4xl font-bold mb-4" style={{ color: domainData.baseColor }}>
        {domainData.name}
      </h1>

      {/* Placeholder for extra content */}
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl">
        This is the <span style={{ color: domainData.baseColor }}>{domainData.name}</span> domain.
        You can add more details, cards, or features here.
      </p>

      {/* Domain Cards*/}
      <div style={{background: domainData.baseColor}}>
        <p>The Cards Appear Here</p>
      </div>
    </main>
  );
}
