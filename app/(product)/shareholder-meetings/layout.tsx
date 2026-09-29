import RelatedPages from "@/components/shared/related-pages";
import JsonLd from "@/components/shared/json-ld";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/shareholder-meetings-page";
import { buildMetadata } from "@/lib/seo";
import {
  productModuleJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/juntas-consejos",
});

interface ShareholderMeetingsLayoutProps {
  children: React.ReactNode;
}

export default async function ShareholderMeetingsLayout({
  children,
}: ShareholderMeetingsLayoutProps) {
  return (
    <>
      {/* Ficha del producto y del modulo, atado a el con isPartOf. */}
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <JsonLd
        data={productModuleJsonLd({
          locale: "es",
          path: "/juntas-consejos",
          title: page.title,
          description: page.description,
        })}
      />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">
        {children}
        <RelatedPages path="/juntas-consejos" />
      </main>
      <SiteFooter />
    </>
  );
}
