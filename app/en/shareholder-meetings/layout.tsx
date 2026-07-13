import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Meetings and Boards",
  description: "Efficiently manage shareholder meetings and board meetings with Sttok, including convocations, delegations, votes, and minutes.",
  keywords: "shareholder meetings, board meetings, digital meeting management, convocations, vote delegations, digital minutes",
  path: "/juntas-consejos",
  pathEn: "/en/shareholder-meetings",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
