"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HeroSection, { HeroSectionProps } from "@/components/legal/hero-section";
import TextContentSection, {
  TextSectionProps,
} from "@/components/legal/text-content";
import CallToActionSection from "@/components/landing/cta-section";
import { GetStaticProps } from "next";

const Page = () => {
  const { t } = useTranslation("legal-disclaimer-page");

  const hero = t("hero", { returnObjects: true }) as HeroSectionProps;
  const content = t("content", { returnObjects: true }) as TextSectionProps[];
  console.log("🚀 cclog  ~ Page:", { hero, content });

  return (
    <>
      {hero && <HeroSection {...hero} />}
      {content && <TextContentSection content={content} hideTopSpace />}
      <CallToActionSection />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", [
      "common",
      "legal-disclaimer-page",
    ])),
  },
});

export default Page;
