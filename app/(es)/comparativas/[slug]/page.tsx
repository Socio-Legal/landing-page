import { notFound } from "next/navigation";

import DocPage, { docMetadata } from "@/components/shared/doc-page";
import { getDoc, getSectionSlugs } from "@/lib/content";

const SECTION = "comparativas" as const;

// Solo existen los slugs que hay en content/comparativas. Cualquier otro es un 404,
// no una plantilla vacia servida con 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return getSectionSlugs(SECTION).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(SECTION, slug);
  return doc ? docMetadata(doc) : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(SECTION, slug);
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
