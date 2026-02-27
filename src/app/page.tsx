"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { ManifestoSection } from "@/components/home/manifesto-section";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <ManifestoSection />
      <CTASection />
      <Footer />
    </div>
  );
}
