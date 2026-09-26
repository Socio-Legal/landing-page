import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import JsonLd from "@/components/shared/json-ld";
import { mdxComponents } from "@/components/shared/mdx-components";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { getSectionDocs, SECTIONS, type Doc } from "@/lib/content";
import { extractFaq } from "@/lib/faq-from-mdx";
import { buildMetadata } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/structured-data";

/**
 * Metadata de un documento de content/. Sin `pathEn`: estas paginas solo
 * existen en castellano, asi que buildMetadata no emite hreflang. El canonical
 * sale de la ruta del archivo, no del frontmatter (lib/content lo valida).
 */
export function docMetadata(doc: Doc): Metadata {
  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    path: doc.url,
  });
}

/**
 * Renderiza un documento MDX como Server Component. El FAQPage se emite a
 * partir del apartado "Preguntas frecuentes" del propio cuerpo, que se deja
 * tal cual lo escribio el autor en vez de reordenarlo en un acordeon.
 */
export default async function DocPage({ doc }: { doc: Doc }) {
  const { content } = await compileMDX({
    source: doc.body,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      // Sin remark-gfm las tablas de los documentos salen como texto plano
      // con barras verticales: MDX no trae la sintaxis GFM de serie.
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  const faq = extractFaq(doc.body);

  // Hermanas de la misma seccion. Se emiten aqui, no en el cuerpo, para que
  // ninguna pagina de content/ pueda quedarse sin enlaces entrantes por un
  // olvido de redaccion: cada documento nuevo queda enlazado desde el resto.
  const hermanas = getSectionDocs(doc.section).filter((d) => d.url !== doc.url);

  return (
    <>
      {faq.length > 0 && <JsonLd data={faqPageJsonLd(faq)} />}
      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-16 md:pt-24">
        {content}
      </article>

      {hermanas.length > 0 && (
        <section id="related" className="border-t border-border">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Más en {SECTIONS[doc.section].label}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {hermanas.map((d) => (
                <Link
                  key={d.url}
                  href={d.url}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {d.frontmatter.title.split(":")[0].trim()}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
