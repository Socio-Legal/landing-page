import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Legal Notice and General Terms and Conditions",
  description: "",
  keywords: "",
  path: "/aviso-legal",
  pathEn: "/en/disclaimer",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
