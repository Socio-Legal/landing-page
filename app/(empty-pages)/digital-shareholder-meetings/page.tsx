import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Junta de Accionistas Digital",
  keywords: "Junta de Accionistas Digital",
  description: "Junta de Accionistas Digital",
};

const hero = {
  title: "Junta de Accionistas Digital",
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
