import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/product/hero-section";
import { metadata as page, hero, content } from "@/config/legal/disclaimer";
import TextContentSection from "@/components/legal/text-content";

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
