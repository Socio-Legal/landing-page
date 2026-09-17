import React from "react";

import JsonLd from "@/components/shared/json-ld";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

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

export default function EnPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Datos estructurados de producto y planes (SEO/GEO) — version inglesa */}
      <JsonLd data={softwareApplicationJsonLd("en")} />
      {children}
    </>
  );
}
