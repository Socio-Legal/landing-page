import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/testimonials/testimonials";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

interface ResourcesLayoutProps {
  children: React.ReactNode;
}

export default async function ResourcesLayout({
  children,
}: ResourcesLayoutProps) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
