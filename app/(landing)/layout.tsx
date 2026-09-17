import JsonLd from "@/components/shared/json-ld";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const metadata = buildMetadata({
  title: "Sttok — Software de gestión de sociedades: captable, juntas e incentivos",
  description:
    "Software de gestión de sociedades: libro de socios (captable), planes de incentivos, juntas, consejos y simulador de operaciones. ISO 27001 y RGPD. Más de 250 empresas confían en Sttok.",
  keywords:
    "gestión sociedades, libro de socios, captable, juntas de accionistas, planes de incentivos, corporate governance, software empresarial, cumplimiento normativo",
  path: "/",
  pathEn: "/en",
});

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      {/* Ficha de producto y planes (SEO/GEO). Este layout envuelve solo la
          home castellana; la inglesa la emite app/en/page.tsx. */}
      <JsonLd data={softwareApplicationJsonLd("es")} />
      <SiteBanner />
      <SiteHeader />
      <main
        className="mx-auto flex-1 overflow-hidden"
        style={{ marginTop: "-56px" }}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
