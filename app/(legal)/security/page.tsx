"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import HeroSection, { HeroSectionProps } from "@/components/legal/hero-section";
import TextContentSection, {
  TextSectionProps,
} from "@/components/legal/text-content";
import CallToActionSection from "@/components/landing/cta-section";
import FaqSection, { FaqItem } from "@/components/shared/faq-section";

const Page = () => {
  const { t } = useTranslation(["common", "legal-security-page"]);

  const hero = t("legal-security-page:hero", {
    returnObjects: true,
  }) as HeroSectionProps;

  const content = t("legal-security-page:content", {
    returnObjects: true,
  }) as TextSectionProps[];

  const faq = t("legal-security-page:faq.items", {
    returnObjects: true,
  }) as FaqItem[];

  return (
    <>
      <HeroSection {...hero} />
      <TextContentSection content={content} hideTopSpace />
      <FaqSection
        eyebrow={t("legal-security-page:faq.eyebrow")}
        title={t("legal-security-page:faq.title")}
        items={faq}
      />
      <CallToActionSection />
    </>
  );
};

export default Page;
