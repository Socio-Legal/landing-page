import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/testimonials/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/testimonios",
});

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
