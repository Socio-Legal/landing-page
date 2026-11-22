import { notFound } from "next/navigation";

import DocPage, { docMetadata } from "@/components/shared/doc-page";
import { getDoc } from "@/lib/content";

// Portada de seccion: content/jurisdicciones/index.mdx. Sus paginas de pais
// viven en la raiz (/colombia, /mexico, /chile), cada una con su carpeta.
const doc = getDoc("jurisdicciones", "index");

export const metadata = doc ? docMetadata(doc) : {};

export default async function Page() {
  if (!doc) notFound();
  return <DocPage doc={doc} />;
}
