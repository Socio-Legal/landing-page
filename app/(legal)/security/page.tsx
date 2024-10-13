"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection, { HeroSectionProps } from "@/components/legal/hero-section";
import TextContentSection, {
  TextSectionProps,
} from "@/components/legal/text-content";
import CallToActionSection from "@/components/landing/cta-section";

const Page = () => {
  const { t } = useTranslation(["common", "legal-security-page"]);

  const hero = t("legal-security-page:hero", {
    returnObjects: true,
  }) as HeroSectionProps;

  const content = t("legal-security-page:content", {
    returnObjects: true,
  }) as TextSectionProps[];

  return (
    <>
      <HeroSection {...hero} />
      <TextContentSection content={content} hideTopSpace />
      <CallToActionSection />
    </>
  );
};

export default Page;
