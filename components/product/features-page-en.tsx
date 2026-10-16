import Link from "next/link";

import CatalogoFuncionalidades from "@/components/shared/catalogo-funcionalidades";

const linkClass =
  "font-medium text-foreground underline underline-offset-4";

/**
 * /en/features: el catálogo de content/funcionalidades/index.mdx en inglés.
 * Las fichas de cada funcionalidad siguen solo en castellano, así que aquí
 * solo va el catálogo, con los módulos enlazados a sus páginas inglesas.
 *
 * Mismas medidas que la portada castellana (DocPage): artículo de 64rem y
 * texto en su columna de lectura. El padding superior suma los 56 px que
 * app/[locale]/layout.tsx resta a todas las rutas inglesas.
 */
export default function FeaturesPageEn() {
  return (
    <article className="container mx-auto max-w-5xl px-4 pb-16 pt-[120px] md:pt-[152px]">
      <h1 className="mb-6 max-w-[22ch] font-serif text-4xl font-normal leading-tight text-balance text-foreground sm:text-5xl">
        Sttok features
      </h1>
      <p className="mb-5 max-w-[70ch] text-base leading-relaxed text-muted-foreground">
        Everything Sttok does, module by module and in order of importance. It
        starts with the shareholder register, the record that everything else
        works on: the general meeting, the board, certificates, the group and
        incentive plans. The overview, with the most common cases, is on the{" "}
        <Link href="/en/product" className={linkClass}>
          product
        </Link>{" "}
        page.
      </p>

      <CatalogoFuncionalidades en />

      <p className="mb-5 mt-10 max-w-[70ch] text-base leading-relaxed text-muted-foreground">
        <a href="https://calendly.com/sttok/30min" className={linkClass}>
          Book a demo
        </a>{" "}
        or see{" "}
        <Link href="/en/pricing" className={linkClass}>
          pricing
        </Link>
        .
      </p>
    </article>
  );
}
