import Link from "next/link";
import CardButton from "@/app/components/StaticCardButton";

export default function HomePage() {
  
  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white">
            Daggerheart Quick Guide
          </h1>
        </div>

        {/* Navigation Link */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
          {CardButton("Domains", "/domains", "#40454e", "/Svg_DhLogo.svg")}
          {CardButton("Ancestry", "/domains", "#40454e", "/Svg_Dhlogo.svg")}
          {CardButton("Classes", "/domains", "#40454e", "/Svg_DhLogo.svg")}
          {CardButton("Equipment", "/domains", "#40454e", "/Svg_DhLogo.svg")}
          {CardButton("Random Gen.", "/domains", "#40454e", "/Svg_DhLogo.svg")}
        </div>

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 lg:h-16"></div>
      </div>
    </div>
  );
}