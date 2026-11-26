#!/usr/bin/env node
/**
 * Comprueba que las entradas de content/glosario-societario conservan el
 * texto del blog de WordPress del que salieron (content-migration/recursos):
 * mismo slug, mismo H1 y mismo texto, palabra por palabra. Lista el title y la
 * meta description nuevos con su longitud.
 *
 * Con una URL base (node scripts/check-glosario.mjs http://localhost:3100)
 * comprueba además el HTML servido: H1, <title>, description, canonical y
 * los datos estructurados Article y BreadcrumbList.
 *
 * Sale con código 1 si algo no cuadra.
 */
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const JSON_DIR = path.join(ROOT, "content-migration/recursos");
const MDX_DIR = path.join(ROOT, "content/glosario-societario");
const BASE = process.argv[2]?.replace(/\/$/, "");

const ENTIDADES = { amp: "&", lt: "<", gt: ">", quot: '"', nbsp: " ", hellip: "…", laquo: "«", raquo: "»" };
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTIDADES[n] ?? m);

/** Texto de un HTML de WordPress, sin etiquetas. */
const textoHtml = (html) => decode(html.replace(/<img\b[^>]*>/g, " ").replace(/<[^>]+>/g, " "));

/** Texto de un fragmento MDX, sin marcas de formato. */
const textoMdx = (mdx) =>
  mdx
    .replace(/<\/?Definicion>/g, " ")
    .replace(/<img\b[^>]*\/>/g, " ")
    .replace(/^\s*\* \* \*\s*$/gm, " ")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/^\s*(?:\d+\.|-)\s+/gm, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*+/g, "")
    .replace(/\\(.)/g, "$1");

/** Comparación sin espacios: detecta cualquier palabra cambiada, añadida o quitada. */
const compacto = (s) => s.replace(/\s+/g, "");

function primeraDiferencia(a, b) {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return `original «…${a.slice(Math.max(0, i - 40), i + 40)}…» / migrado «…${b.slice(Math.max(0, i - 40), i + 40)}…»`;
}

let errores = 0;
const fallo = (msg) => {
  errores++;
  console.log(`  ✗ ${msg}`);
};

const filas = [];
for (const archivo of fs.readdirSync(JSON_DIR).filter((f) => f.endsWith(".json")).sort()) {
  const orig = JSON.parse(fs.readFileSync(path.join(JSON_DIR, archivo), "utf8"));
  if (!orig.migrado) continue;
  const mdxPath = path.join(MDX_DIR, `${orig.slug}.mdx`);
  console.log(orig.slug);
  if (!fs.existsSync(mdxPath)) {
    fallo("no existe la entrada MDX");
    continue;
  }
  const { data, content } = matter(fs.readFileSync(mdxPath, "utf8").replace(/\r\n/g, "\n"));

  // Slug: el del archivo, el del frontmatter y el de la URL original.
  const slugOriginal = new URL(orig.url).pathname.split("/").filter(Boolean).pop();
  if (slugOriginal !== orig.slug) fallo(`slug original ${slugOriginal} ≠ ${orig.slug}`);
  if (data.slug !== `/glosario-societario/${orig.slug}`) fallo(`slug del frontmatter ${data.slug}`);

  // H1.
  const h1 = /^# (.+)$/m.exec(content)?.[1].replace(/\\(.)/g, "$1");
  if (h1 !== orig.h1) fallo(`H1 «${h1}» ≠ «${orig.h1}»`);
  if (data.etiqueta !== orig.h1) fallo(`etiqueta «${data.etiqueta}» ≠ H1 original`);

  // Texto.
  const m = /\{\/\* texto-original:inicio \*\/\}([\s\S]*)\{\/\* texto-original:fin \*\/\}/.exec(content);
  if (!m) {
    fallo("faltan las marcas de texto original");
  } else {
    const a = compacto(textoHtml(orig.html));
    const b = compacto(textoMdx(m[1]));
    if (a !== b) fallo(`el texto difiere: ${primeraDiferencia(a, b)}`);
    else console.log(`  ✓ slug, H1 y texto idénticos (${a.length} caracteres sin espacios)`);
  }

  if (data.publicado !== orig.publicado || data.modificado !== orig.modificado) fallo("fechas distintas de las originales");
  if (data.description.length < 140 || data.description.length > 155)
    fallo(`description de ${data.description.length} caracteres`);

  filas.push({ slug: orig.slug, h1: orig.h1, titleAntes: orig.titleOriginal, title: data.title, description: data.description });
}

console.log("\nTitle y meta description");
for (const f of filas) {
  console.log(`\n${f.slug}\n  antes   (${f.titleAntes.length}) ${f.titleAntes}\n  title   (${f.title.length}) ${f.title}\n  desc    (${f.description.length}) ${f.description}`);
}

if (BASE) {
  console.log(`\nHTML servido en ${BASE}`);
  const indice = matter(fs.readFileSync(path.join(MDX_DIR, "index.mdx"), "utf8"));
  const paginas = [{ slug: "", h1: "Glosario societario", data: indice.data }, ...filas.map((f) => ({ slug: f.slug, h1: f.h1, data: { title: f.title, description: f.description } }))];
  for (const p of paginas) {
    const ruta = `/glosario-societario${p.slug ? `/${p.slug}` : ""}`;
    const res = await fetch(`${BASE}${ruta}`, { redirect: "manual" });
    const html = await res.text();
    const problemas = [];
    if (res.status !== 200) problemas.push(`HTTP ${res.status}`);
    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1];
    if (decode((h1 ?? "").replace(/<[^>]+>/g, "")) !== p.h1) problemas.push(`H1 «${h1}»`);
    if (decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "") !== p.data.title) problemas.push("title");
    if (decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "") !== p.data.description) problemas.push("description");
    if (!html.includes(`<link rel="canonical" href="https://www.sttok.com${ruta}"/>`)) problemas.push("canonical");
    if (!html.includes('"@type":"BreadcrumbList"')) problemas.push("BreadcrumbList");
    if (p.slug && !html.includes('"@type":"Article"')) problemas.push("Article");
    if (/blog\.sttok\.com/.test(html.replace(/"original"[^,]*/g, ""))) problemas.push("enlaza a blog.sttok.com");
    if (problemas.length) fallo(`${ruta}: ${problemas.join(", ")}`);
    else console.log(`  ✓ ${ruta}`);
  }
}

console.log(errores ? `\n${errores} problema(s).` : "\nTodo cuadra.");
process.exit(errores ? 1 : 0);
