"use client";
import React from "react";

import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import FeaturesSection, {
  FeatureItem,
} from "@/components/landing/features-section";
import CallToActionSection from "@/components/landing/cta-section";

import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation("product-hero-section");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const features = (t("items", { returnObjects: true }) as FeatureItem[]) || [];

  return (
    <>
      <HeroSection {...hero} />
      <FeaturesSection features={features} />
      <CallToActionSection />
    </>
  );
};

export default Page;
