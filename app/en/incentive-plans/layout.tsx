import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Incentive Plans",
  description: "Manage incentive plans (phantom share plan, stock option plans, etc.) for your company efficiently and professionally.",
  keywords: "incentive plans, phantoms, stock options, flexible compensation, incentive management, vesting",
  path: "/planes-de-incentivos",
  pathEn: "/en/incentive-plans",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
