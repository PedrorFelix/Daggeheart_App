"use client";

import { useEffect } from "react";
import { useBackground } from "@/app/contexts/backgroundContext";
import { ancestries } from "@/app/lib/ancestries";
import { useParams } from "next/navigation";

export default function AncestryLayout({children,}: {children: React.ReactNode;}) {
    const { setColor, setLogo } = useBackground();
    const params = useParams();
    const ancestryName = params.ancestry as string;

    const ancestryData = ancestries.find((s) => s.name === ancestryName);

    useEffect(() => {
        if (ancestryData) {
            // Set the background to match the species when component mounts
            setColor(ancestryData.color);
            setLogo(ancestryData.icon);
        }

        // Reset to default when component unmounts
        return () => {
            setColor("#ffffff");
            setLogo("/Svg_DhLogo.svg");
        };
    }, [ancestryData, setColor, setLogo]);

    return <>{children}</>;
}
