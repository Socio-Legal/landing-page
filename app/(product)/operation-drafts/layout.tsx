import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/operation-drafts-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  path: "/simulador",
});
interface OperationDraftsLayoutProps {
  children: React.ReactNode;
}

export default async function OperationDraftsLayout({
  children,
}: OperationDraftsLayoutProps) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
