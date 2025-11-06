'use client';

import { useEffect } from "react";
import { useBackground } from "@/app/contexts/backgroundContext";
import { species } from "@/app/lib/species";
import { useParams } from "next/navigation";

export default function SpeciesLayout({children}: {children: React.ReactNode}) {
  const { setColor, setLogo } = useBackground();
  const params = useParams();
  const speciesName = params.species as string;
  
  const speciesData = species.find((s) => s.name === speciesName);

  useEffect(() => {
    if (speciesData) {
      // Set the background to match the species when component mounts
      setColor(speciesData.color);
      setLogo(speciesData.icon);
    }

    // Reset to default when component unmounts
    return () => {
      setColor('#ffffff');
      setLogo('/Svg_DhLogo.svg');
    };
  }, [speciesData, setColor, setLogo]);

  return <>{children}</>;
}