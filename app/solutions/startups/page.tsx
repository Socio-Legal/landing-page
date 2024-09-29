import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection from "@/components/product/testimonials-section";
import FeaturesSection from "@/components/product/features-section";
import ClientsSection from "@/components/product/clients-section";
import HeroSection from "@/components/product/hero-section";

import {
  metadata as page,
  clients,
  hero,
  features,
  testimonials,
} from "@/config/solutions/startups";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <ClientsSection {...clients} />
      {/* TODO: H1 -> Section ID Products */}
      <FeaturesSection {...features} />
      <TestimonialsSection {...testimonials} />
      <CallToActionSection />
    </>
  );
};

export default Page;
