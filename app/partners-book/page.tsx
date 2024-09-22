import TestimonialsSection from "@/components/product/testimonials-section";
import ClientsSection from "@/components/product/clients-section";
import FeaturesSection from "@/components/product/features-section";
import HeroSection from "@/components/product/hero-section";
import TopFeatures from "@/components/product/top-features";
import {
  clients,
  topFeatures,
  hero,
  features,
  testimonials,
} from "@/config/product/partner-book-page";

import React from "react";
import CallToActionSection from "@/components/landing/cta-section";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <HeroSection hero={hero} />
      <TopFeatures {...topFeatures} />
      <ClientsSection {...clients} />
      <FeaturesSection {...features} />
      <TestimonialsSection {...testimonials} />
      <CallToActionSection />
    </>
  );
};

export default Page;
