import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import CallToActionSideSection from "@/components/landing/cta-side-section";
import Features2Section from "@/components/landing/features-2-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-3-section";
import PlanetStarsSection from "@/components/landing/planet-stars-section";
import PricingSection from "@/components/landing/pricing-section";
import { MarqueeDemo } from "@/components/landing/reviews-section";
import { UsesSection } from "@/components/landing/uses-section";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <SphereMask />
      <FeaturesSection />
      <Features2Section />
      {/* <CallToActionSideSection /> */}
      <UsesSection />
      <MarqueeDemo />
      <PlanetStarsSection />
      <PricingSection />
      <CallToActionSection />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
