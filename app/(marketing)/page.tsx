import HeroSection from "@/components/landing/hero-section";
import ClientsSection from "@/components/landing/clients-section";
import FeaturesSection from "@/components/landing/features-section";
import WhoUsesSttokSection from "@/components/landing/who-uses-sttok-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ProductsSection from "@/components/landing/products-section";
import PricingSection from "@/components/landing/pricing-section";
import CallToActionSection from "@/components/landing/cta-section";

import { SphereMask } from "@/components/magicui/sphere-mask";
import Particles from "@/components/magicui/particles";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ClientsSection />

      <SphereMask />
      <ProductsSection />

      <FeaturesSection />
      <WhoUsesSttokSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
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
