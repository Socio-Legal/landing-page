import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Simulador de Ampliación de Capital",
  keywords: "Simulador de Ampliación de Capital",
  description: "Simulador de Ampliación de Capital",
};

const hero = {
  title: "Simulador de Ampliación de Capital",
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
