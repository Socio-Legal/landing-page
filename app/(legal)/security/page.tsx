import React from "react";

import HeroSection from "@/components/legal/hero-section";
import TextContentSection from "@/components/legal/text-content";
import CallToActionSection from "@/components/landing/cta-section";

import { metadata as page, hero, content } from "@/config/legal/security";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <TextContentSection content={content} hideTopSpace />
      <CallToActionSection />
    </>
  );
};

export default Page;
