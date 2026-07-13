import React from "react";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sttok frente a Excel — comparativa para gestionar tu libro de socios",
  description:
    "¿Libro de socios en Excel o en un software de gestión societaria? Comparativa honesta: errores, versiones, certificados, juntas, seguridad, due diligence y coste.",
  keywords:
    "captable excel, libro de socios excel, alternativa excel captable, software libro de socios",
  path: "/sttok-vs-excel",
});

export default function VsExcelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
