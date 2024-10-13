import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { metadata as page } from "@/config/product/shareholder-meetings-page";

export const metadata = {
  title: page.title,
  keywords: page.keywords,
  description: page.description,
};

interface ShareholderMeetingsLayoutProps {
  children: React.ReactNode;
}

export default async function ShareholderMeetingsLayout({
  children,
}: ShareholderMeetingsLayoutProps) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
