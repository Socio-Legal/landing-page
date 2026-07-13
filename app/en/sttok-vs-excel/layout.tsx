import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sttok versus Excel — comparison for managing your cap table",
  description: "Shareholder registry in Excel or in corporate management software? An honest comparison: errors, versions, certificates, meetings, security, due diligence and cost.",
  keywords: "cap table excel, shareholder registry excel, excel alternative cap table",
  path: "/sttok-vs-excel",
  pathEn: "/en/sttok-vs-excel",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
