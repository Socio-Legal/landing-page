import Link from "next/link";

import { breadcrumbTrail } from "@/lib/breadcrumbs";
import type { Locale } from "@/lib/locales";
import { localizedHref } from "@/lib/localized-href";

/**
 * Migas visibles de una pagina de content/. Salen del mismo breadcrumbTrail
 * que el BreadcrumbList del layout raiz, asi que el JSON-LD y lo que se ve no
 * pueden contar jerarquias distintas. Las rutas del trail son castellanas: en
 * ingles se traducen con ROUTE_MAP.
 */
export default function Breadcrumbs({ path, locale = "es" }: { path: string; locale?: Locale }) {
  const trail = breadcrumbTrail(path, locale).map((c) => ({
    ...c,
    path: localizedHref(c.path, locale),
  }));
  if (trail.length < 2) return null;

  return (
    <nav
      aria-label={locale === "en" ? "Breadcrumb" : "Migas de pan"}
      className="mb-8 text-sm text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true">›</span>}
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="underline-offset-4 hover:text-foreground hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
