import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Documentación Societaria Automatizada",
  keywords: "Documentación Societaria Automatizada",
  description: "Documentación Societaria Automatizada",
};

const hero = {
  title: "Documentación Societaria Automatizada",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/documentacion-societaria",
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
