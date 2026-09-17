import React from "react";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import JsonLd from "@/components/shared/json-ld";
import { metadata as page } from "@/config/pricing";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/precios",
  pathEn: "/en/pricing",
});

interface ResourcesLayoutProps {
  children: React.ReactNode;
}

export default async function ResourcesLayout({
  children,
}: ResourcesLayoutProps) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
