import JsonLd from "@/components/shared/json-ld";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/incentive-plans-page";
import { buildMetadata } from "@/lib/seo";
import {
  productModuleJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/planes-de-incentivos",
});

interface IncentivePlansLayoutProps {
  children: React.ReactNode;
}

export default async function IncentivePlansLayout({
  children,
}: IncentivePlansLayoutProps) {
  return (
    <>
      {/* Ficha del producto y del modulo, atado a el con isPartOf. */}
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <JsonLd
        data={productModuleJsonLd({
          locale: "es",
          path: "/planes-de-incentivos",
          title: page.title,
          description: page.description,
        })}
      />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
