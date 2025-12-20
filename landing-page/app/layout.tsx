import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scroll One SuperApp - Your Gateway to the Scroll Ecosystem",
  description: "A comprehensive super app ecosystem built on the Scroll blockchain, integrating wallet, identity, and a diverse mini-app marketplace.",
  keywords: ["Scroll", "blockchain", "crypto wallet", "DeFi", "super app", "Web3"],
  authors: [{ name: "Scroll One" }],
  openGraph: {
    title: "Scroll One SuperApp",
    description: "Your Gateway to the Scroll Ecosystem",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scroll One SuperApp",
    description: "Your Gateway to the Scroll Ecosystem",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
