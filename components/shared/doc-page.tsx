import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import JsonLd from "@/components/shared/json-ld";
import { mdxComponents } from "@/components/shared/mdx-components";
import type { Doc } from "@/lib/content";
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

  return (
    <>
      {faq.length > 0 && <JsonLd data={faqPageJsonLd(faq)} />}
      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-16 md:pt-24">
        {content}
      </article>
    </>
  );
}
