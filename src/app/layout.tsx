import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { ColorProvider } from "./contexts/logoColor";
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
        <ColorProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ColorProvider>
      </body>
    </html>
  );
}
