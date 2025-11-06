"use client";

import Link from "next/link";
import CardButton from "@/app/components/CardButton";

const sections = [
  {name: "Species", href: "/species", color: "#FFFFFF", icon: "/aff_species.svg"},
  {name: "Backgrounds", href: "/backgrounds", color: "#FFFFFF", icon: "/Svg_DhLogo.svg"}
];

export default function Ancestry() {

  return(
    <div className="p-4 sm:p-8 lg:p-20">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
            {/* Card Buttons for all sections*/}

            {sections.map((section, index) => (
                <div key={section.name} className="relative w-full flex justify-center">
                  <CardButton
                    name={section.name}
                    href={`/ancestries${section.href}`}
                    color={section.color}
                    icon={section.icon}
                    index={index}
                  />
                </div>
            ))}
        </div>

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 lg:h-16"></div>
      </main>
    </div>
  );
}