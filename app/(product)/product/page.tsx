import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection from "@/components/product/testimonials-section";
import FeaturesSection from "@/components/landing/features-section";
import ClientsSection from "@/components/product/clients-section";
import HeroSection from "@/components/product/hero-section";
import TopFeatures from "@/components/product/top-features";

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
      <FeaturesSection {...features} />
      <CallToActionSection />
    </>
  );
};

export default Page;
