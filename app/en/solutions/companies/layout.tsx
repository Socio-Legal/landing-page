import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Companies and Corporate Groups - Sttok",
  description: "Corporate management software for companies and corporate groups. Shareholder Register, Shareholder Meetings, etc.",
  keywords: "Shareholder Register, Company, corporate group, shareholder meeting, incentive plans, board of directors",
  path: "/empresas",
  pathEn: "/en/solutions/companies",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
