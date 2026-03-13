import { HeroSection } from "@/components/home/hero-section";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/server";

const FeaturesSection = dynamic(() => import("@/components/home/features-section").then((mod) => mod.FeaturesSection), { ssr: true });
const ManifestoSection = dynamic(() => import("@/components/home/manifesto-section").then((mod) => mod.ManifestoSection), { ssr: true });
const CTASection = dynamic(() => import("@/components/home/cta-section").then((mod) => mod.CTASection), { ssr: true });
const Footer = dynamic(() => import("@/components/home/footer").then((mod) => mod.Footer), { ssr: true });

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <HeroSection user={user} />
      <FeaturesSection />
      <ManifestoSection />
      <CTASection user={user} />
      <Footer />
    </div>
  );
}
