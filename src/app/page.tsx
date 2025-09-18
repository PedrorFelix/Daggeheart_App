"use client";

import Link from "next/link";

export default function App() {

  return (
    <div className="min-h-screen p-4 sm:p-8 lg:p-20 bg-gray-900">
      {/* DH Logo Background */}
      <div
        className="fixed pointer-events-none z-0 opacity-15 transition-colors duration-300"
        style={{
          width: "150vw",
          height: "150vh",
          bottom: "-50vh",
          right: "-50vw",
          mask: `url(/Svg_DhLogo.svg) no-repeat center`,
          maskSize: "contain",
          WebkitMask: `url(/Svg_DhLogo.svg) no-repeat center`,
          WebkitMaskSize: "contain",
          backgroundColor: '#ffffff',
        }}
      />

      <main className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white">
            Daggerheart Quick Guide
          </h1>
        </div>

        <Link
        href="/domains">Domains</Link>
        {/*Add Species, Backgrounds and Classes*/}

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 lg:h-16"></div>
      </main>
    </div>
  );

}