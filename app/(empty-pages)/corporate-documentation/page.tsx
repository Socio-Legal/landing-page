import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Documentación Societaria Automatizada",
  keywords: "Documentación Societaria Automatizada",
  description: "Documentación Societaria Automatizada",
};

const hero = {
  title: "Documentación Societaria Automatizada",
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
