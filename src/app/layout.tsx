import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/next";
import { RootProviders } from "@/providers/root.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bytes.io | The Engineer Platform",
  description: "The engineer platform. Competitive dashboards, project showcases, developer registries, and mentorship.",
};

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCachedProfile = unstable_cache(
  async (userId: string) => {
    return prisma.profile.findUnique({
      where: { id: userId }
    });
  },
  ["user-profile"],
  { revalidate: 300, tags: ["profile"] }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  if (user) {
    profile = await getCachedProfile(user.id);
  }

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen selection:bg-primary/30 selection:text-primary`}
      >
        <RootProviders>
          <Navbar initialUser={user} initialProfile={profile} />
          <main className="pt-24 pb-12">
            {children}
          </main>
          <Analytics />
        </RootProviders>
      </body>
    </html>
  );
}
