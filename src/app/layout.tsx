import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileAlert from "../components/MobileAlert";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sistema de Triagem e Classificação de Risco - UBS",
  description: "Sistema de classificação de risco ambulatorial para UBS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script defer src="https://umami.pinuslab.dev/script.js" data-website-id="d8bf0cd9-d27c-412f-98d3-c808ec32d3ac"/>
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <MobileAlert />
        {children}
      </body>
    </html>
  );
}
