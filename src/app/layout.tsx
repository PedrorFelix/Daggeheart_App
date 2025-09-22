import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

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
  description: "A Daggerheart Quick Reference App For My Tabless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gray-900">
          {/* Logo Background Overlay - Shared across all pages */}
          <div
            className="fixed pointer-events-none z-0 opacity-15 transition-colors duration-300"
            style={{
              width: '150vw',
              height: '150vh',
              bottom: '-50vh',
              right: '-50vw',
              mask: `url(/Svg_DhLogo.svg) no-repeat center`,
              maskSize: "contain",
              WebkitMask: `url(/Svg_DhLogo.svg) no-repeat center`,
              WebkitMaskSize: "contain",
              backgroundColor: '#ffffff',
            }}
          />
            {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
