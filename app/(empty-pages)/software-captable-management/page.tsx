import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Software de Gestión de Captable",
  keywords: "Software de Gestión de Captable",
  description: "Software de Gestión de Captable",
};

const hero = {
  title: "Software de Gestión de Captable",
  description: "",
};

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <CallToActionSection />
    </>
  );
};

export default Page;
