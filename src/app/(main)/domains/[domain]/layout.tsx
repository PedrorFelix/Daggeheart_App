'use client';

import { useEffect, Suspense } from "react";
import { useBackground } from "@/app/contexts/backgroundContext";
import { domains } from "@/app/lib/domains";
import { useParams } from "next/navigation";
import LoadingAnimation from "@/app/components/LoadingAnimation";

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setColor, setLogo } = useBackground();
  const params = useParams();
  const domain = params.domain as string;
  
  const domainData = domains.find((d) => d.name === domain);

  useEffect(() => {
    if (domainData) {
      // Set the background to match the domain when component mounts
      setColor(domainData.baseColor);
      setLogo(domainData.Icon);
    }

    // Reset to default when component unmounts
    return () => {
      setColor('#ffffff');
      setLogo('/Svg_DhLogo.svg');
    };
  }, [domainData, setColor, setLogo]);

  return (
    <Suspense fallback={<LoadingAnimation message="Loading Domain Cards ..."/>}>
      {children}
    </Suspense>
  );
}