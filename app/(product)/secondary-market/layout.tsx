import RelatedPages from "@/components/shared/related-pages";
import JsonLd from "@/components/shared/json-ld";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";
import {
  productModuleJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

const page = {
  title: "Mercado Secundario",
  description:
    "Mercado de acciones entre socios con gestión digital de ofertas de compra y venta.",
  keywords: "mercado secundario, acciones entre socios, compraventa de acciones",
};

export const metadata = buildMetadata({
  ...page,
  path: "/mercado-secundario",
});

interface SecondaryMarketLayoutProps {
  children: React.ReactNode;
}

export default async function SecondaryMarketLayout({
  children,
}: SecondaryMarketLayoutProps) {
  return (
    <>
      {/* Ficha del producto y del modulo, atado a el con isPartOf. */}
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <JsonLd
        data={productModuleJsonLd({
          locale: "es",
          path: "/mercado-secundario",
          title: page.title,
          description: page.description,
        })}
      />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">
        {children}
        <RelatedPages path="/mercado-secundario" />
      </main>
      <SiteFooter />
    </>
  );
}
