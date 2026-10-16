import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { CATALOGO, enIngles } from "@/lib/funcionalidades-catalogo";

const linkClass =
  "group/link inline-flex items-center gap-1.5 rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";

const Arrow = () => (
  <ArrowRightIcon
    aria-hidden
    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5"
  />
);

/**
 * Catálogo completo de funcionalidades, por módulos y en orden de
 * importancia. Misma retícula que los módulos de /producto: el módulo ocupa
 * 4 de 12 columnas y sus funcionalidades, 8. Lleva la clase `catalogo` para
 * que el artículo no lo limite a la columna de lectura.
 *
 * En inglés (/en/features) los módulos enlazan a su página inglesa y las
 * funcionalidades van sin enlace: las fichas solo existen en castellano.
 */
export default function CatalogoFuncionalidades({ en = false }: { en?: boolean }) {
  const modulos = CATALOGO.map((m) => ({ id: m.id, nota: m.nota, ...enIngles(m, en) }));
  const total = modulos.reduce((n, m) => n + m.total, 0);
  // Fichas distintas: varias funcionalidades pueden compartir la misma.
  const conFicha = new Set(
    modulos.flatMap((m) => m.funcionalidades.map((f) => f.href)).filter(
      (h) => h?.startsWith("/funcionalidades/"),
    ),
  ).size;

  return (
    <section className="catalogo not-prose mt-10">
      {/* Índice del catálogo: salto directo a cada módulo */}
      <nav
        aria-label={en ? "Modules" : "Módulos"}
        className="mb-12 border-y border-border py-5"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {en
            ? `${total} features in ${modulos.length} modules`
            : `${total} funcionalidades en ${modulos.length} módulos`}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {modulos.map((m) => (
            <li key={m.id}>
              <a
                href={`#${m.id}`}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {m.titulo}
                <span className="ml-1.5 tabular-nums text-muted-foreground">
                  {m.total}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border">
        {modulos.map((m) => (
          <div
            key={m.id}
            id={m.id}
            className="grid scroll-mt-24 grid-cols-1 gap-y-6 border-b border-border py-10 md:grid-cols-12 md:gap-x-12 md:py-12"
          >
            <div className="md:col-span-4">
              <h2 className="font-serif text-2xl font-normal leading-7 text-foreground">
                {m.href ? (
                  <Link href={m.href} className={linkClass}>
                    {m.titulo}
                    <Arrow />
                  </Link>
                ) : (
                  m.titulo
                )}
              </h2>
              <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                {m.resumen}
              </p>
              {m.nota && (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {en ? "Add-on module at extra cost" : m.nota}
                </p>
              )}
            </div>

            <dl className="grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2 md:col-span-8">
              {m.funcionalidades.map((f) => (
                <div key={f.titulo}>
                  <dt className="text-[0.9375rem] font-semibold leading-7 text-foreground">
                    {f.href ? (
                      <Link href={f.href} className={linkClass}>
                        {f.titulo}
                        <Arrow />
                      </Link>
                    ) : (
                      f.titulo
                    )}
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {f.descripcion}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {!en && (
        <p className="mt-6 text-sm text-muted-foreground">
          Las funcionalidades con flecha tienen página propia, con capturas de la
          aplicación: {conFicha} fichas en total.
        </p>
      )}
    </section>
  );
}
