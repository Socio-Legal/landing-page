import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Software de Juntas de Accionistas",
  keywords: "Software de Juntas de Accionistas",
  description: "Software de Juntas de Accionistas",
};

const hero = {
  title: "Software de Juntas de Accionistas",
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
