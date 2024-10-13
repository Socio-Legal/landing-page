"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ClientsSection from "@/components/landing/clients-section";
import FeaturesSection, {
  FeaturesSectionProps,
} from "@/components/testimonials/features-section";

const Page = () => {
  const { t } = useTranslation("testimonials-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const features = t("features", {
    returnObjects: true,
  }) as FeaturesSectionProps;

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
