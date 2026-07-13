import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sttok for Startups",
  description: "Cap table solutions, incentive plans, and much more for your startup",
  keywords: "startup, sttok, captable, phantoms, incentives, beneficiaries",
  path: "/startups",
  pathEn: "/en/solutions/startups",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
