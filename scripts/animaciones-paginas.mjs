#!/usr/bin/env node
/**
 * lib/animaciones-paginas.json: para cada animación de public/animaciones, la
 * página que mejor la contiene. Lo usa el middleware para responder 301 a
 * /animaciones/<nombre> sin extensión (rutas base que Googlebot rastreó y
 * Search Console da como 404, nov-2026).
 *
 * Prioridad, de más a menos parecida en contenido:
 *  1. La ficha de funcionalidad con el mismo nombre (/funcionalidades/<nombre>).
 *  2. La página de producto o de solución que la lleva en su hero.
 *  3. Cualquier otra página MDX que la muestre en una Captura.
 *  4. /producto (inglés: /en/product).
 *
 * Va dentro de `pnpm build`; versiona el JSON si cambia.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const leer = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

/** Páginas con animación en el hero: namespace de su JSON → URL castellana. */
const HEROES = {
  "product-partner-book-page": "/libro-de-socios",
  "product-shareholder-meetings-page": "/juntas-consejos",
  "product-communications-signatures-page": "/comunicaciones-y-firma",
  "product-incentive-plans-page": "/planes-de-incentivos",
  "product-operation-drafts-page": "/simulador",
  "product-secondary-market-page": "/mercado-secundario",
  "solutions-companies-page": "/empresas",
  "solutions-lawyers-page": "/abogados",
  "solutions-startups-page": "/startups",
  "solutions-investors-page": "/inversores",
  "solutions-investors-dashboard-page": "/portal-del-inversor",
  "product-hero-section": "/producto",
};

// ROUTE_MAP (castellano → inglés), leído del fuente para no duplicarlo.
const ROUTE_MAP = Object.fromEntries(
  [...leer("lib/localized-href.ts").matchAll(/^\s*"(\/[^"]*)":\s*"(\/en[^"]*)",/gm)].map((m) => [m[1], m[2]]),
);

const nombres = [
  ...new Set(
    fs.readdirSync(path.join(ROOT, "public", "animaciones"))
      .filter((f) => /-(light|dark)\.webm$/.test(f))
      .map((f) => f.replace(/-(light|dark)\.webm$/, "")),
  ),
].sort();
const nombresEn = [
  ...new Set(
    fs.readdirSync(path.join(ROOT, "public", "animaciones", "en"))
      .filter((f) => /-(light|dark)\.webm$/.test(f))
      .map((f) => f.replace(/-(light|dark)\.webm$/, "")),
  ),
].sort();

/** Animaciones de los MDX de una carpeta: nombre → [URL…]. */
function mdx(dir, url) {
  const out = {};
  const recorrer = (rel) => {
    for (const e of fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })) {
      const r = path.posix.join(rel, e.name);
      if (e.isDirectory()) { if (!(rel === "content" && e.name === "en")) recorrer(r); continue; }
      if (!e.name.endsWith(".mdx")) continue;
      for (const m of leer(r).matchAll(/video="([a-z0-9-]+)"/g)) (out[m[1]] ||= []).push(url(r));
    }
  };
  recorrer(dir);
  return out;
}
const urlEs = (rel) => "/" + rel.replace(/^content\//, "").replace(/\.mdx$/, "").replace(/\/index$/, "");
const urlEn = (rel) => "/en/solutions" + ("/" + path.posix.basename(rel, ".mdx")).replace(/\/index$/, "");
const mdxEs = mdx("content", urlEs);
const mdxEn = fs.existsSync(path.join(ROOT, "content/en")) ? mdx("content/en", urlEn) : {};

function heroes(idioma) {
  const out = {};
  // La de la home va en hero.video.nombre.
  const home = JSON.parse(leer(`public/locales/${idioma}/home-hero-section.json`))?.hero?.video?.nombre;
  if (home) out[home] = idioma === "es" ? "/" : ROUTE_MAP["/"];
  for (const [ns, es] of Object.entries(HEROES)) {
    const p = path.join(ROOT, "public", "locales", idioma, ns + ".json");
    if (!fs.existsSync(p)) continue;
    const v = JSON.parse(fs.readFileSync(p, "utf8"))?.hero?.video;
    const url = idioma === "es" ? es : ROUTE_MAP[es];
    if (v && url && !out[v]) out[v] = url;
  }
  return out;
}
const heroEs = heroes("es");
const heroEn = heroes("en");
const fichas = new Set(fs.readdirSync(path.join(ROOT, "content", "funcionalidades")).map((f) => f.replace(/\.mdx$/, "")));

// Animaciones que no están en ningún hero ni MDX inglés pero tienen página
// propia del mismo tema (la castellana, por su ficha, no lo necesita).
const PAGINA_EN = { "firma-electronica": "/en/communications-and-signatures" };

const es = {};
for (const n of nombres) {
  // Una página castellana con el mismo nombre (/simulador) también es la suya.
  const propia = ROUTE_MAP["/" + n] ? "/" + n : undefined;
  es[n] = fichas.has(n) ? `/funcionalidades/${n}` : heroEs[n] || propia || (mdxEs[n] || [])[0] || "/producto";
}
const en = {};
for (const n of nombresEn) {
  const propia = ROUTE_MAP["/" + n];
  en[n] = heroEn[n] || propia || PAGINA_EN[n] || (mdxEn[n] || [])[0] || "/en/product";
}

const salida = path.join(ROOT, "lib", "animaciones-paginas.json");
fs.writeFileSync(salida, JSON.stringify({ es, en }, null, 2) + "\n");
console.log(`animaciones-paginas: ${Object.keys(es).length} es, ${Object.keys(en).length} en`);
