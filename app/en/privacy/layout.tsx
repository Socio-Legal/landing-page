import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy and Cookies",
  description: "",
  keywords: "",
  path: "/privacidad",
  pathEn: "/en/privacy",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
