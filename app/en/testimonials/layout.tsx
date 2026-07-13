import React from "react";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Testimonials and Success Stories",
  description: "Here you will find testimonials and success stories from our clients",
  keywords: "testimonials, success stories, clients, companies, businesses, success, satisfaction, recommendation",
  path: "/testimonios",
  pathEn: "/en/testimonials",
  locale: "en",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
