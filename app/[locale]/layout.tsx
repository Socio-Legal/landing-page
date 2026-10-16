import { headers } from "next/headers";

import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LOCALE_PREFIX } from "@/lib/locales";

/**
 * Chrome comun de los idiomas con prefijo. Sustituye a app/en/layout.tsx.
 *
 * El marginTop negativo sube el hero de la portada por debajo de la cabecera,
 * igual que hace app/(landing)/layout.tsx en la home castellana. Solo lo lleva
 * la portada de cada idioma (/en): el resto de rutas queda como su gemela
 * castellana. La ruta publica sale de la cabecera x-pathname del middleware.
 */
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const portada = Object.values(LOCALE_PREFIX).some(
    (prefijo) => prefijo !== "" && pathname.replace(/\/$/, "") === prefijo,
  );

  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main
        className="mx-auto flex-1 overflow-hidden"
        style={portada ? { marginTop: "-56px" } : undefined}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
