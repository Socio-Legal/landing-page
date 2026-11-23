import RelatedPages from "@/components/shared/related-pages";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Migas from "@/components/shared/migas";

import { metadata as page } from "@/config/solutions/companies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/empresas",
});

interface SolutionsLayoutProps {
  children: React.ReactNode;
}

export default async function SolutionsLayout({
  children,
}: SolutionsLayoutProps) {
  return (
    <>
      <Migas ruta="/empresas" />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">
        {children}
        <RelatedPages path="/empresas" />
      </main>
      <SiteFooter />
    </>
  );
}
