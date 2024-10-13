import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/partner-book-page";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

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
