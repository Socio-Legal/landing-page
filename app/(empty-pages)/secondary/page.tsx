import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/legal/hero-section";

const page = {
  title: "Oferta de compra o venta. Secundario (Tender offers)",
  keywords: "Oferta de compra o venta. Secundario (Tender offers)",
  description: "Oferta de compra o venta. Secundario (Tender offers)",
};

const hero = {
  title: "Oferta de compra o venta. Secundario (Tender offers)",
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
