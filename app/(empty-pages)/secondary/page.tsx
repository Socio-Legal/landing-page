import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";
import { buildMetadata } from "@/lib/seo";

const page = {
  title: "Oferta de compra o venta. Secundario (Tender offers)",
  keywords: "Oferta de compra o venta. Secundario (Tender offers)",
  description: "Oferta de compra o venta. Secundario (Tender offers)",
};

const hero = {
  title: "Oferta de compra o venta. Secundario (Tender offers)",
  description: "",
};

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/secundario",
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
