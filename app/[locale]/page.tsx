import { notFound } from "next/navigation";

import JsonLd from "@/components/shared/json-ld";
import {
  localeFromSegment,
  localeSegment,
  PREFIXED_LOCALES,
} from "@/lib/locale-routing";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { buildMetadata } from "@/lib/seo";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

// Portada de cada idioma con prefijo: /en, y mañana /co y /mx.
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((l) => ({ locale: localeSegment(l) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: segmento } = await params;
  const locale = localeFromSegment(segmento);
  const meta = locale ? PAGE_REGISTRY["/"]?.meta[locale] : undefined;
  if (!locale || !meta) return {};
  return buildMetadata({ ...meta, path: "/", locale });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: segmento } = await params;
  const locale = localeFromSegment(segmento);
  const entrada = locale ? PAGE_REGISTRY["/"] : undefined;
  if (!locale || !entrada || !entrada.meta[locale]) notFound();

  const { Component } = entrada;
  return (
    <>
      {entrada.softwareApplication && (
        <JsonLd data={softwareApplicationJsonLd(locale)} />
      )}
      <Component />
    </>
  );
}
