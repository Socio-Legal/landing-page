import React from "react";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre nosotros — el equipo detrás de Sttok",
  description:
    "Sttok nace de un equipo con trayectoria técnica y jurídica. Hoy es la plataforma líder del mercado hispano en gestión de sociedades: más de 250 empresas y 20.000M€ en equity gestionado.",
  keywords: "sobre Sttok, equipo Sttok, empresa gestión societaria, quiénes somos",
  path: "/sobre-nosotros",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre Sttok",
  url: "https://www.sttok.com/sobre-nosotros",
  about: {
    "@type": "Organization",
    name: "Sttok",
    url: "https://www.sttok.com",
    description:
      "Plataforma líder del mercado hispano en gestión de sociedades: captable, libro de socios, planes de incentivos, juntas y consejos.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <SiteBanner />
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
