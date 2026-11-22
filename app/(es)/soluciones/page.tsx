import { notFound } from "next/navigation";

import DocPage, { docMetadata } from "@/components/shared/doc-page";
import { getDoc } from "@/lib/content";

// Portada de seccion: content/soluciones/index.mdx
const doc = getDoc("soluciones", "index");

export const metadata = doc ? docMetadata(doc) : {};

export default async function Page() {
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
