"use client";

import { useEffect } from "react";
import { useBackground } from "@/app/contexts/backgroundContext";
import { classes } from "@/app/lib/classes";
import { useParams } from "next/navigation";

export default function ClassesLayout({children,}: {children: React.ReactNode;}) {
    const { setColor, setLogo } = useBackground();
    const params = useParams();
    const className = params.class as string;

    const classData = classes.find((s) => s.name === className);

    useEffect(() => {
        if (classData) {
            setColor(classData.domains[0].baseColor);
            setLogo(classData.domains[0].Icon);
        }

        // Reset to default when component unmounts
        return () => {
            setColor("#ffffff");
            setLogo("/Svg_DhLogo.svg");
        };
    }, [classData, setColor, setLogo]);

    return <>{children}</>;
}
