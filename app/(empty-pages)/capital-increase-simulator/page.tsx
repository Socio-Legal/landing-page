import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Simulador de Ampliación de Capital",
  keywords: "Simulador de Ampliación de Capital",
  description: "Simulador de Ampliación de Capital",
};

const hero = {
  title: "Simulador de Ampliación de Capital",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/simulador-de-ampliacion-de-capital",
});

const Page = () => {
  return (
    <>
      <HeroSection {...hero} />
      <CallToActionSection />
    </>
  );
};

export default Page;
