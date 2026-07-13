import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Investor Portal",
  description: "Discover the solutions we offer for investors and companies to give access to their shareholders",
  keywords: "investors, investees, portfolio, captable, document management, operations simulator, investor portal",
  path: "/portal-del-inversor",
  pathEn: "/en/solutions/investors-dashboard",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
