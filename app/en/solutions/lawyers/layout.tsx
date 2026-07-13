import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sttok for Lawyers",
  description: "Corporate management software for Lawyers. Sttok allows you to manage the shareholder register, incentive plans, shareholder meetings, board of directors, etc.",
  keywords: "corporate management, lawyers, captable, shareholder register, incentive plans, shareholder meetings, boards, testimonials",
  path: "/abogados",
  pathEn: "/en/solutions/lawyers",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
