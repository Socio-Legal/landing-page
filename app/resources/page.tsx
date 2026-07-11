import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection from "@/components/product/testimonials-section";
import FeaturesSection from "@/components/product/features-section";
import ClientsSection from "@/components/product/clients-section";
import HeroSection from "@/components/product/hero-section";
import TopFeatures from "@/components/product/top-features";
import { metadata as page, hero } from "@/config/resources";
import ResourcesIcons from "@/components/resources/resources-icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/recursos",
});

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />

      <ResourcesIcons />
    </>
  );
};

export default Page;
