import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About us — the team behind Sttok",
  description: "Sttok is built by a team with technical and legal backgrounds. Today it is the leading corporate management platform in the Spanish-speaking market: 250+ companies and €20bn in equity managed.",
  keywords: "about Sttok, Sttok team, corporate management company",
  path: "/sobre-nosotros",
  pathEn: "/en/about",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
