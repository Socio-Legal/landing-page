import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Sttok",
  keywords:
    "gestión sociedades, libro de socios, captable, juntas de accionistas, corporate governance, software empresarial, administración empresas, gestión documental, cumplimiento normativo, software gestión",
  description:
    "Sttok - Software integral de gestión de sociedades. Simplifica la administración, cumplimiento normativo y gestión documental de tu empresa.",
  author: "Sttok",
};

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
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
