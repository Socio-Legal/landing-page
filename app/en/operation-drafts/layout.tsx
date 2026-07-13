import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Operations Simulator",
  description: "Simulate and calculate any corporate operation with precision in seconds, including investment rounds, capital increases, and more.",
  keywords: "operations simulator, investment rounds, capital increases, convertible notes, corporate simulations",
  path: "/simulador",
  pathEn: "/en/operation-drafts",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
