'use client';

import { useColor } from "../contexts/logoColor";

export default function ClientLayout({children}: {children: React.ReactNode}) {

    const {color} = useColor();

    return(
        <div className="min-h-screen bg-gray-900">
            <div
                className="fixed pointer-events-none z-0 opacity-15 transition-colors duration-300"
                style={{
                    width: '150vw',
                    height: '150vh',
                    bottom: '-50vh',
                    right: '-50vw',
                    mask: 'url(/Svg_DhLogo.svg) no-repeat center',
                    maskSize: 'contain',
                    WebkitMask: 'url(/Svg_DhLogo.svg) no-repeat center',
                    WebkitMaskSize: 'contain',
                    backgroundColor: color
                }}
            />

            <main className="relative z-10">
                {children}
            </main>
        </div>
    )
}