"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection, {
  HeroSectionProps,
} from "@/components/product/hero-section";
import PricingSection from "@/components/landing/pricing-section";

import CallToActionSection from "@/components/landing/cta-section";

const Page = () => {
  const { t } = useTranslation("pricing-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;

  return (
    <>
      <HeroSection {...hero} />
      <PricingSection />
      <CallToActionSection />
    </>
  );
};

export default Page;
