import type { FaqItem } from "@/components/shared/faq-section";

/**
 * Extrae las preguntas frecuentes del cuerpo MDX para poder emitir el
 * FAQPage de datos estructurados.
 *
 * Reconoce el formato que usan los documentos de content/:
 *
 *   ## Preguntas frecuentes
 *
 *   **¿Pregunta?**
 *   Respuesta, que puede ocupar varias lineas.
 *
 * Termina en el siguiente encabezado de nivel 2. Si no encuentra el apartado,
 * devuelve una lista vacia y la pagina simplemente no emite FAQPage.
 */
export function extractFaq(body: string): FaqItem[] {
  const lines = body.split(/\r?\n/);

  const start = lines.findIndex((l) => /^##\s+Preguntas frecuentes\s*$/i.test(l));
  if (start === -1) return [];

  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => /^##\s+/.test(l));
  const block = end === -1 ? rest : rest.slice(0, end);

  const items: FaqItem[] = [];
  let current: { q: string; a: string[] } | null = null;

  const push = () => {
    if (!current) return;
    const a = current.a.join(" ").replace(/\s+/g, " ").trim();
    if (current.q && a) items.push({ q: current.q, a });
    current = null;
  };

  for (const line of block) {
    const question = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (question) {
      push();
      current = { q: question[1].trim(), a: [] };
    } else if (current) {
      // Linea en blanco tras la respuesta: cierra la pareja en curso.
      if (line.trim() === "") push();
      else current.a.push(line.trim());
    }
  }
  push();

  return items;
}
