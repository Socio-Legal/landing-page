import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product",
  description: "All updated corporate data and documentation in one place. Manage partners, investors, incentive plans, operation simulation, shareholder meetings, boards, minutes and deeds in minutes.",
  keywords: "incentive plans, phantoms, stock options, flexible compensation, incentive management, vesting",
  path: "/producto",
  pathEn: "/en/product",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
