import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Consejos de Administración",
  keywords: "Consejos de Administración",
  description: "Consejos de Administración",
};

const hero = {
  title: "Consejos de Administración",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/consejos-de-administracion",
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
