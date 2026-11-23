import { notFound } from "next/navigation";

import Documento from "@/components/shared/documento";
import ProvidersEN from "@/components/providers-en";
import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { localeFromSegment, localeSegment, PREFIXED_LOCALES } from "@/lib/locale-routing";

/**
 * Layout raíz de los idiomas con prefijo (/en). El castellano tiene el suyo
 * en app/(es)/layout.tsx. El idioma sale del segmento de la URL, no de la
 * petición: las páginas se generan estáticas.
 *
 * La portada (/en) sube su hero bajo la cabecera con data-portada
 * (globals.css), igual que app/(es)/(landing)/layout.tsx en castellano.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((l) => ({ locale: localeSegment(l) }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: segmento } = await params;
  const locale = localeFromSegment(segmento);
  if (!locale) notFound();

  return (
    <Documento locale={locale}>
      {/* Hoy el único idioma con prefijo es el inglés. Uno nuevo tendrá su
          components/providers-<idioma>.tsx con sus textos. */}
      <ProvidersEN>
        <SiteBanner />
        <SiteHeader />
        <main className="mx-auto flex-1 overflow-hidden">{children}</main>
        <SiteFooter />
      </ProvidersEN>
    </Documento>
  );
}
