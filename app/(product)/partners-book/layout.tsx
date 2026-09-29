import RelatedPages from "@/components/shared/related-pages";
import JsonLd from "@/components/shared/json-ld";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/partner-book-page";
import { buildMetadata } from "@/lib/seo";
import {
  productModuleJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/libro-de-socios",
});

interface PartnerBookLayoutProps {
  children: React.ReactNode;
}

export default async function PartnerBookLayout({
  children,
}: PartnerBookLayoutProps) {
  return (
    <>
      {/* Ficha del producto y del modulo, atado a el con isPartOf. */}
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <JsonLd
        data={productModuleJsonLd({
          locale: "es",
          path: "/libro-de-socios",
          title: page.title,
          description: page.description,
        })}
      />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">
        {children}
        <RelatedPages path="/libro-de-socios" />
      </main>
      <SiteFooter />
    </>
  );
}
