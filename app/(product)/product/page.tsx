import React from "react";

import HeroSection from "@/components/product/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import CallToActionSection from "@/components/landing/cta-section";

import { metadata as page, hero, features } from "@/config/product/product";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <FeaturesSection features={features} />
      <CallToActionSection />
    </>
  );
};

export default Page;
