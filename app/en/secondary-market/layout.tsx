import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Secondary Market — share transfers between partners",
  description: "Organize share transfers between partners and tender offers with automatic recording in the shareholder registry.",
  keywords: "secondary market, share transfers, tender offer, liquidity",
  path: "/mercado-secundario",
  pathEn: "/en/secondary-market",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
