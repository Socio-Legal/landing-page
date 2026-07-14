"use client";

import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

type GlossaryTerm = {
  term: string;
  def: string;
  /** Ruta del producto de Sttok que resuelve este término, si aplica. */
  href?: string;
};

/**
 * Glosario societario: definiciones de una frase, autocontenidas y en HTML
 * plano — el formato que buscadores y motores de IA citan mejor. Emite
 * datos estructurados DefinedTermSet en el HTML del servidor.
 */
const Glossary: FC = () => {
  const { t } = useTranslation("resources-glossary");

  const termsData = t("terms", { returnObjects: true }) as GlossaryTerm[];
  const terms: GlossaryTerm[] = Array.isArray(termsData) ? termsData : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: t("header.title"),
    url: "https://www.sttok.com/recursos",
    hasDefinedTerm: terms.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.def,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section id="glossary-hero">
        <div className="container mx-auto px-4 pb-4 pt-16 text-center md:pt-24">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("header.slogan")}
          </p>
          <h1 className="mx-auto mt-4 max-w-[20ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
            {t("header.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("header.description")}
          </p>
        </div>
      </section>

      <section id="glossary-terms">
        <div className="container mx-auto max-w-4xl px-4 py-14 md:py-16">
          <dl className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {terms.map((item, i) => (
              <div key={i} className="border-t border-border py-5">
                <dt className="mb-1.5 text-base font-semibold text-foreground">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                    >
                      {item.term}
                      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    item.term
                  )}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {item.def}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
};

export default Glossary;
