import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Lumalima - Illumination Atelier",
  description: "Professional illumination solutions for private, commercial, public and urban spaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/housing_main.jpg" />
        <link rel="preload" as="image" href="/assets/comercial_main.jpg" />
        <link rel="preload" as="image" href="/assets/public_main.png" />
        <link rel="preload" as="image" href="/assets/urban_main.jpg" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
