import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing — Sttok corporate management software",
  description:
    "Plans from €450 per company per year. Shareholder registry, incentive plans, meetings and boards. No implementation cost, onboarding in one week.",
  keywords:
    "corporate management pricing, cap table software pricing, shareholder registry software",
  path: "/precios",
  pathEn: "/en/pricing",
  locale: "en",
});

/* Datos estructurados de producto y planes (SEO/GEO) — versión inglesa */
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sttok",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.sttok.com/en/pricing",
  description:
    "Corporate management software: shareholder registry (cap table), incentive plans, shareholder and board meetings.",
  offers: [
    { name: "Basic", price: "450" },
    { name: "Advanced", price: "650" },
    { name: "Pro", price: "850" },
  ].map((plan) => ({
    "@type": "Offer",
    name: `Sttok ${plan.name}`,
    price: plan.price,
    priceCurrency: "EUR",
    url: "https://www.sttok.com/en/pricing",
  })),
};

export default function EnPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {children}
    </>
  );
}
