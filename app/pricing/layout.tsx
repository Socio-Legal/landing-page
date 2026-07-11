import React from "react";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/precios",
});

/* Datos estructurados de producto y planes (SEO/GEO) */
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sttok",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.sttok.com/pricing",
  description:
    "Software de gestión de sociedades: libro de socios (captable), planes de incentivos, juntas y consejos de administración.",
  offers: [
    { name: "Básico", price: "450" },
    { name: "Avanzado", price: "650" },
    { name: "Pro", price: "850" },
  ].map((plan) => ({
    "@type": "Offer",
    name: `Sttok ${plan.name}`,
    price: plan.price,
    priceCurrency: "EUR",
    url: "https://www.sttok.com/pricing",
  })),
};

interface ResourcesLayoutProps {
  children: React.ReactNode;
}

export default async function ResourcesLayout({
  children,
}: ResourcesLayoutProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
