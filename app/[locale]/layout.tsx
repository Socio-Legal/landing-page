import { SiteBanner } from "@/components/site-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Chrome comun de los idiomas con prefijo. Sustituye a app/en/layout.tsx.
 *
 * El marginTop negativo se conserva tal cual estaba: lo aplicaba
 * app/en/layout.tsx a TODAS las rutas inglesas, no solo a la portada. Es una
 * incoherencia con el castellano —donde solo lo lleva la landing— pero se
 * mantiene para que esta migracion no cambie nada visible.
 */
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteBanner />
      <SiteHeader />
      <main
        className="mx-auto flex-1 overflow-hidden"
        style={{ marginTop: "-56px" }}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
