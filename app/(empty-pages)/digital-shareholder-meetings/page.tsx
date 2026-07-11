import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Junta de Accionistas Digital",
  keywords: "Junta de Accionistas Digital",
  description: "Junta de Accionistas Digital",
};

const hero = {
  title: "Junta de Accionistas Digital",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/junta-de-accionistas-digital",
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
