import React from "react";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface TestimonialsLayoutProps {
  children: React.ReactNode;
}

export default async function TestimonialsLayout({
  children,
}: TestimonialsLayoutProps) {
  return (
    <>
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
    </>
  );
}
