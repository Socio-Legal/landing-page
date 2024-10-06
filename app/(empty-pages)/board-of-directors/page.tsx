import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Consejos de Administración",
  keywords: "Consejos de Administración",
  description: "Consejos de Administración",
};

const hero = {
  title: "Consejos de Administración",
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
