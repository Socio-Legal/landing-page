import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Estilos del contenido MDX. Siguen el mismo lenguaje visual que
 * components/shared/seo-landing.tsx: titular serif, cuerpo en muted, medidas
 * de linea cortas y separadores por borde.
 *
 * Se mapea etiqueta por etiqueta en lugar de usar un plugin de tipografia
 * para no meter una dependencia mas y para que el resultado sea identico al
 * del resto del sitio.
 */
export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mx-auto mb-6 max-w-[22ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mb-4 mt-14 font-serif text-3xl font-normal tracking-tight text-balance text-foreground sm:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-1.5 mt-8 text-base font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-5 max-w-[70ch] text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-6 max-w-[70ch] list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-6 max-w-[70ch] list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  a: ({ href, ...props }) => {
    const target = href ?? "#";
    // Los enlaces internos pasan por next/link; los externos abren fuera.
    if (target.startsWith("/")) {
      return (
        <Link
          href={target}
          className="font-medium text-foreground underline underline-offset-4"
          {...props}
        />
      );
    }
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline underline-offset-4"
        {...props}
      />
    );
  },
  table: (props) => (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="border-b border-border" {...props} />,
  th: (props) => (
    <th
      className="px-3 py-2.5 align-top text-xs font-semibold uppercase tracking-wider text-foreground"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-t border-border px-3 py-2.5 align-top leading-relaxed text-muted-foreground"
      {...props}
    />
  ),
};
