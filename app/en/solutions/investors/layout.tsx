import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sttok for Investors",
  description: "Discover the solutions we offer for investors and their investees",
  keywords: "investors, investees, portfolio, captable, shareholder register, investor",
  path: "/inversores",
  pathEn: "/en/solutions/investors",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
