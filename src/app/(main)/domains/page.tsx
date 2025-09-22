"use client";

import Link from "next/link";
import { domains } from "@/app/lib/domains";
import { useState } from "react";

export default function Home() {
  const [logoColor, setLogoColor] = useState('#ffffff');

  return (
    <div>
      <main className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white">
            Daggerheart Quick Guide
          </h1>
        </div>

        {/* Navigation Link */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg"
          >
          Back
          </Link>
        </div>

        {/* Domain Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
          {domains.map((domain) => (
            <Link
              key={domain.name}
              href={`/domains/${domain.name}`}
              className="group relative rounded-4xl border border-solid 
                         transition-all duration-200 ease-in-out
                         flex flex-col items-center justify-center
                         bg-gradient-to-br backdrop-blur-sm
                         hover:shadow-xl hover:shadow-black/15 dark:hover:shadow-white/15
                         hover:scale-105 active:scale-95
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         w-full max-w-[180px] h-[240px] sm:h-[280px] lg:h-[320px]
                         hover:bg-white dark:hover:bg-white
                         hover:border-opacity-75"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${domain.baseColor}20, ${domain.baseColor}20)`,
                borderColor: domain.baseColor,
              }}
              onMouseEnter={() => setLogoColor(domain.baseColor)}
              onMouseLeave={() => setLogoColor('#ffffff')}
              aria-label={`Explore ${domain.name} domain`}
            >
              <div className="p-4 sm:p-6 lg:p-8 w-full h-full flex flex-col items-center justify-center">
                {/* SVG Container */}
                <div className="flex-1 flex items-center justify-center mb-4 sm:mb-6 relative">
                  {/* Default state SVG (white) */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 transition-all duration-200 group-hover:scale-125 group-hover:drop-shadow-lg group-hover:opacity-0 z-0"
                    style={{
                      mask: `url(${domain.Icon}) no-repeat center`,
                      maskSize: "contain",
                      WebkitMask: `url(${domain.Icon}) no-repeat center`,
                      WebkitMaskSize: "contain",
                      backgroundColor: "#ffffff",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                  {/* Hover state SVG with domain color */}
                  <div
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-175 group-hover:drop-shadow-lg z-5"
                    style={{
                      mask: `url(${domain.Icon}) no-repeat center`,
                      maskSize: "contain",
                      WebkitMask: `url(${domain.Icon}) no-repeat center`,
                      WebkitMaskSize: "contain",
                      backgroundColor: domain.baseColor,
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                </div>

                {/* Domain Name */}
                <h2
                  className="font-bold text-lg sm:text-xl lg:text-2xl text-center
                             group-hover:text-gray-900 dark:group-hover:text-gray-900 
                             transition-colors"
                  style={{ color: domain.baseColor }}
                >
                  {domain.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 lg:h-16"></div>
      </main>
    </div>
  );
}