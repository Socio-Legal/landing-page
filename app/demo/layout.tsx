import React from "react";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";

// Página de destino de los botones «Reservar demo» de las fichas en PDF: una
// URL nuestra y corta en lugar de la de Calendly. No se indexa: es una página
// de paso, sin contenido propio.
export const metadata = {
  ...buildMetadata({
    title: "Solicitar una demo de Sttok",
    description:
      "Reserva una demo de 30 minutos con un experto societario: libro de socios, juntas y consejos, comunicaciones y firma, planes de incentivos y simulador de operaciones.",
    path: "/demo",
  }),
  robots: { index: false, follow: true },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
