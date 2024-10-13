"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection, { HeroSectionProps } from "@/components/legal/hero-section";
import TextContentSection, {
  TextSectionProps,
} from "@/components/legal/text-content";
import CallToActionSection from "@/components/landing/cta-section";

const Page = () => {
  const { t } = useTranslation();

  const hero = t("legal.disclaimer.hero", {
    returnObjects: true,
  }) as HeroSectionProps;

  const content = t("legal.disclaimer.content", {
    returnObjects: true,
  }) as TextSectionProps[];

  return (
    <>
      {hero && <HeroSection {...hero} />}
      {content && <TextContentSection content={content} hideTopSpace />}
      <CallToActionSection />
    </>
  );
};

export default Page;
