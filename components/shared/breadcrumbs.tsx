import Link from "next/link";

import { breadcrumbTrail } from "@/lib/breadcrumbs";

/**
 * Migas visibles de una pagina de content/. Salen del mismo breadcrumbTrail
 * que el BreadcrumbList del layout raiz, asi que el JSON-LD y lo que se ve no
 * pueden contar jerarquias distintas. Solo castellano: content/ no tiene /en.
 */
export default function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path, "es");
  if (trail.length < 2) return null;

  return (
    <nav aria-label="Migas de pan" className="mb-8 text-sm text-muted-foreground">
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
