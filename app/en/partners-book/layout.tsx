import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shareholder Register",
  description: "Official Shareholder Register, updated and error-free. Stop using inefficient Excel sheets. A single shareholder register ready to submit to the Registry and to easily calculate operations.",
  keywords: "Shareholder Register, Shareholders, Registry, Operations, Excel",
  path: "/libro-de-socios",
  pathEn: "/en/partners-book",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
