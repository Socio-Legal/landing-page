import JsonLd from "@/components/shared/json-ld";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/product";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/producto",
});

interface IncentivePlansLayoutProps {
  children: React.ReactNode;
}

export default async function IncentivePlansLayout({
  children,
}: IncentivePlansLayoutProps) {
  return (
    <>
      {/* Pagina de producto general: ficha de Sttok con sus planes. */}
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
