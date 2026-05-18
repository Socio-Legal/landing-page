"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection from "@/components/landing/hero-section";
import ClientsSection from "@/components/landing/clients-section";
import FeaturesSection, {
  FeatureItem,
} from "@/components/landing/features-section";
import WhoUsesSttokSection from "@/components/landing/who-uses-sttok-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ProductsSection from "@/components/landing/products-section";
import AiSection from "@/components/landing/ai-section";
import CallToActionSection from "@/components/landing/cta-section";

export default function Page() {
  const { t } = useTranslation([
    "common",
    "home-clients-section",
    "home-cta-section",
    "home-features-section",
    "home-hero-section",
    "home-pricing-section",
    "home-products-section",
    "home-testimonials-section",
    "home-uses-section",
  ]);

  const features = t("home-features-section:items", {
    returnObjects: true,
  }) as FeatureItem[];

  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ProductsSection />
      <AiSection />
      <FeaturesSection features={features} />
      <WhoUsesSttokSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
