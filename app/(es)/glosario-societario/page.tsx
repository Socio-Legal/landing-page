import { notFound } from "next/navigation";

import DocPage, { docMetadata } from "@/components/shared/doc-page";
import { getDoc } from "@/lib/content";

// Portada de seccion: content/glosario-societario/index.mdx
const doc = getDoc("glosario-societario", "index");

export const metadata = doc ? docMetadata(doc) : {};

export default async function Page() {
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
