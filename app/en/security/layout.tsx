import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security Policy",
  description:
    "Sttok’s security policy: ISO 27001 certification, encryption, access control and incident management.",
  keywords: "",
  path: "/politica-seguridad",
  pathEn: "/en/security",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
