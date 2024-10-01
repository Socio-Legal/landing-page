import React from "react";

import HeroSection from "@/components/product/hero-section";
import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ClientsSection from "@/components/landing/clients-section";
import FeaturesSection from "@/components/testimonials/features-section";

import {
  metadata as page,
  hero,
  features,
} from "@/config/testimonials/testimonials";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <FeaturesSection {...features} />
      <ClientsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
};

export default Page;
