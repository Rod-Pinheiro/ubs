import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileAlert from "../components/MobileAlert";

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
      <body
        className={`${inter.variable} antialiased`}
      >
        <MobileAlert />
        {children}
      </body>
    </html>
  );
}
