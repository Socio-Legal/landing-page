"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection, { HeroSectionProps } from "@/components/legal/hero-section";
import TextContentSection, {
  TextSectionProps,
} from "@/components/legal/text-content";
import CallToActionSection from "@/components/landing/cta-section";

const Page = () => {
  const { t } = useTranslation("legal-disclaimer-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const content = t("content", { returnObjects: true }) as TextSectionProps[];

  return (
    <>
      <HeroSection {...hero} />
      <TextContentSection content={content} hideTopSpace />
      <CallToActionSection />
    </>
  );
};

export default Page;
