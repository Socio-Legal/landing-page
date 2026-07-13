"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import CallToActionSection from "@/components/landing/cta-section";
import FaqSection, { FaqItem } from "@/components/shared/faq-section";
import FeaturesSection, {
  FeaturesSectionProps,
} from "@/components/product/features-section";
import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";

const Page = () => {
  const { t } = useTranslation("product-secondary-market-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const features = t("features", {
    returnObjects: true,
  }) as FeaturesSectionProps;

  return (
    <>
      <HeroSection {...hero} />
      <FeaturesSection {...features} />
      <FaqSection
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        items={t("faq.items", { returnObjects: true }) as FaqItem[]}
      />
      <CallToActionSection />
    </>
  );
};

export default Page;
