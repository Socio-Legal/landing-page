import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Software de Juntas de Accionistas",
  keywords: "Software de Juntas de Accionistas",
  description: "Software de Juntas de Accionistas",
};

const hero = {
  title: "Software de Juntas de Accionistas",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/software-de-juntas-de-accionistas",
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
