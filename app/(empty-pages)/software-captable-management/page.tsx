import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Software de Gestión de Captable",
  keywords: "Software de Gestión de Captable",
  description: "Software de Gestión de Captable",
};

const hero = {
  title: "Software de Gestión de Captable",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/software-de-gestion-de-captable",
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
