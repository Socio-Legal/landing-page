import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Migas from "@/components/shared/migas";

interface ResourcesLayoutProps {
  children: React.ReactNode;
}

export default async function ResourcesLayout({
  children,
}: ResourcesLayoutProps) {
  return (
    <>
      <Migas ruta="/recursos" />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
