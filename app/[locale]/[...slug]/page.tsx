import { notFound } from "next/navigation";

import DocPage, { docMetadata } from "@/components/shared/doc-page";
import JsonLd from "@/components/shared/json-ld";
import { getEnDoc } from "@/lib/content";
import {
  esPathFor,
  localeFromSegment,
  localeSlugParams,
} from "@/lib/locale-routing";
import { LOCALE_PREFIX } from "@/lib/locales";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { buildMetadata } from "@/lib/seo";
import { localizedHref } from "@/lib/localized-href";
import {
  productModuleJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

// Todas las subrutas de los idiomas con prefijo. Un solo archivo sustituye a
// las 19 carpetas de re-export que habia bajo app/en/**.
export const dynamicParams = false;

export function generateStaticParams() {
  return localeSlugParams();
}

/**
 * Resuelve locale + slug a la entrada del registro o, si no la hay, al
 * documento ingles de content/en/ (secciones de lib/content EN_SECTIONS).
 */
async function resolver(params: Promise<{ locale: string; slug: string[] }>) {
  const { locale: segmento, slug } = await params;
  const locale = localeFromSegment(segmento);
  if (!locale) return null;
  const ruta = `${LOCALE_PREFIX[locale]}/${slug.join("/")}`;
  const esPath = esPathFor(ruta);
  if (!esPath) return null;
  const entrada = PAGE_REGISTRY[esPath];
  if (entrada && entrada.meta[locale]) return { locale, esPath, entrada, doc: undefined };
  const doc = locale === "en" ? getEnDoc(ruta) : undefined;
  if (doc) return { locale, esPath, entrada: undefined, doc };
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const r = await resolver(params);
  if (!r) return {};
  if (r.doc) return docMetadata(r.doc);
  return buildMetadata({
    ...r.entrada!.meta[r.locale]!,
    path: r.esPath,
    locale: r.locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const r = await resolver(params);
  if (!r) notFound();
  if (r.doc) return <DocPage doc={r.doc} />;

  const entrada = r.entrada!;
  const { Component } = entrada;
  const meta = entrada.meta[r.locale]!;
  return (
    <>
      {entrada.softwareApplication && (
        <JsonLd data={softwareApplicationJsonLd(r.locale)} />
      )}
      {entrada.productModule && (
        <JsonLd
          data={productModuleJsonLd({
            locale: r.locale,
            path: localizedHref(r.esPath, r.locale),
            title: meta.title,
            description: meta.description,
          })}
        />
      )}
      <Component />
    </>
  );
}
