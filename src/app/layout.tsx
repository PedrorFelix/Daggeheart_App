import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { BackgroundProvider } from "./contexts/backgroundContext";
import ClientLayout from "./components/BackgroundComponent";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DH Quick Guide",
    description: "A Daggerheart Quick Reference App For My Tables",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <BackgroundProvider>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </BackgroundProvider>
            </body>
        </html>
    );
}
