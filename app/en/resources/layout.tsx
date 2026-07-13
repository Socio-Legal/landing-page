import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Corporate glossary — cap table, phantom shares, vesting and more",
  description: "The terms of corporate management explained in one sentence: cap table, shareholder registry, phantom shares, stock options, vesting, meetings, quorum, dilution and more.",
  keywords: "corporate glossary, what is a cap table, phantom shares, vesting, dilution",
  path: "/recursos",
  pathEn: "/en/resources",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
