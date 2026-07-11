import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/partner-book-page";
import { buildMetadata } from "@/lib/seo";

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
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
