import { notFound } from "next/navigation";

import JsonLd from "@/components/shared/json-ld";
import {
  esPathFor,
  localeFromSegment,
  localeSlugParams,
} from "@/lib/locale-routing";
import { LOCALE_PREFIX } from "@/lib/locales";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

// Todas las subrutas de los idiomas con prefijo. Un solo archivo sustituye a
// las 19 carpetas de re-export que habia bajo app/en/**.
export const dynamicParams = false;

export function generateStaticParams() {
  return localeSlugParams();
}

/** Resuelve locale + slug a la entrada del registro. */
async function resolver(params: Promise<{ locale: string; slug: string[] }>) {
  const { locale: segmento, slug } = await params;
  const locale = localeFromSegment(segmento);
  if (!locale) return null;
  const esPath = esPathFor(`${LOCALE_PREFIX[locale]}/${slug.join("/")}`);
  if (!esPath) return null;
  const entrada = PAGE_REGISTRY[esPath];
  if (!entrada || !entrada.meta[locale]) return null;
  return { locale, esPath, entrada };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const r = await resolver(params);
  if (!r) return {};
  return buildMetadata({
    ...r.entrada.meta[r.locale]!,
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

  const { Component } = r.entrada;
  return (
    <>
      {r.entrada.softwareApplication && (
        <JsonLd data={softwareApplicationJsonLd(r.locale)} />
      )}
      <Component />
    </>
  );
}
