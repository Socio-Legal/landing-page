import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Mercado Secundario",
  keywords: "mercado secundario, acciones entre socios, compraventa de acciones",
  description: "Mercado de acciones entre socios con gestión digital de ofertas de compra y venta.",
};

interface SecondaryMarketLayoutProps {
  children: React.ReactNode;
}

export default async function SecondaryMarketLayout({
  children,
}: SecondaryMarketLayoutProps) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
