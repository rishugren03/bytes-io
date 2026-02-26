import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codewave Portal | Silicon Valley SaaS for Engineers",
  description: "The official engineer-core portal for the college coding club. Competitive dashboards, project showcases, and developer registries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen selection:bg-primary/30 selection:text-primary`}
      >
        <Navbar />
        <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
