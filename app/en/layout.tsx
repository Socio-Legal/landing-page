import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";

interface EnLayoutProps {
  children: React.ReactNode;
}

// Metadata de la home inglesa (las subrutas la sobreescriben con la suya).
export const metadata = buildMetadata({
  title: "Sttok — Corporate management software: cap table, meetings & incentives",
  description:
    "Corporate management software: shareholder registry (cap table), incentive plans, meetings, boards and operations simulator. ISO 27001 and GDPR. 250+ companies trust Sttok.",
  keywords:
    "corporate management software, shareholder registry, cap table, incentive plans, shareholder meetings, corporate governance, equity management",
  path: "/",
  pathEn: "/en",
  locale: "en",
});

export default async function EnLayout({ children }: EnLayoutProps) {
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
