import { notFound } from "next/navigation";

import DocPage, { docMetadata } from "@/components/shared/doc-page";
import { getDoc } from "@/lib/content";

// Pagina de pais: content/jurisdicciones/colombia.mdx, servida en la raiz.
const doc = getDoc("jurisdicciones", "colombia");

export const metadata = doc ? docMetadata(doc) : {};

export default async function Page() {
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
