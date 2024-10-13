"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import CallToActionSection from "@/components/landing/cta-section";
import TestimonialsSection, {
  TestimonialsSectionProps,
} from "@/components/product/testimonials-section";
import FeaturesSection, {
  FeaturesSectionProps,
} from "@/components/product/features-section";
import ClientsSection, {
  ClientsSectionProps,
} from "@/components/product/clients-section";
import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";

const Page = () => {
  const { t } = useTranslation("solutions-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const clients = t("clients", { returnObjects: true }) as ClientsSectionProps;
  const features = t("features", {
    returnObjects: true,
  }) as FeaturesSectionProps;
  const testimonials = t("testimonials", {
    returnObjects: true,
  }) as TestimonialsSectionProps;

  return (
    <>
      <HeroSection {...hero} />
      <ClientsSection {...clients} />
      <FeaturesSection {...features} />
      <TestimonialsSection {...testimonials} />
      <CallToActionSection />
    </>
  );
};

export default Page;
