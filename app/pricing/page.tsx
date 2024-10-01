import React from "react";

import HeroSection from "@/components/product/hero-section";
import PricingSection from "@/components/landing/pricing-section";

import { metadata as page, hero } from "@/config/pricing";
import CallToActionSection from "@/components/landing/cta-section";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <PricingSection />
      <CallToActionSection />
    </>
  );
};

export default Page;
