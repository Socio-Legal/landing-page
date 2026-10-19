#!/usr/bin/env node
/**
 * Valida en build los enlaces internos de content/.
 *
 * Falla si un documento enlaza a una ruta interna que no existe. Es la red
 * que evita repetir el problema de las 10 landings SEO: paginas publicadas
 * con enlaces a 404 que nadie detecta hasta que se rastrean.
 *
 * Se ejecuta desde el script `build` de package.json, antes de `next build`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");

/* --------------------------------------------------------------- rutas ---- */

/** Slugs publicos castellanos que sirve la app (rewrites de next.config). */
async function rutasDeLaApp() {
  const cfg = (await import(pathToFileURL(path.join(ROOT, "next.config.mjs")).href)).default;
  const rewrites = await cfg.rewrites();
  const redirects = await cfg.redirects();

  const rutas = new Set(["/"]);
  // Cada rewrite declara un slug publico castellano.
  for (const r of rewrites) if (!r.source.includes(":")) rutas.add(r.source);
  // Los origenes de redireccion tambien resuelven (con un salto).
  for (const r of redirects) if (!r.source.includes(":")) rutas.add(r.source);
  return { rutas, redirects };
}

/** Rutas servidas por carpetas reales de app/, sin rewrite detras. */
function rutasDeCarpetas() {
  const rutas = new Set();
  const appDir = path.join(ROOT, "app");

  const recorrer = (dir, url) => {
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entrada.isDirectory()) continue;
      const nombre = entrada.name;
      // Los grupos (xxx) no añaden segmento; los dinamicos se validan aparte.
      if (nombre.startsWith("(")) {
        recorrer(path.join(dir, nombre), url);
        continue;
      }
      if (nombre.startsWith("[") || nombre === "en") continue;
      const sub = `${url}/${nombre}`;
      if (fs.existsSync(path.join(dir, nombre, "page.tsx"))) rutas.add(sub);
      recorrer(path.join(dir, nombre), sub);
    }
  };
  recorrer(appDir, "");
  return rutas;
}

/**
 * Rutas inglesas: los destinos de ROUTE_MAP (lib/localized-href.ts), que es la
 * lista de paginas que existen bajo /en. Se leen del fuente porque este script
 * no compila TypeScript.
 */
function rutasInglesas() {
  const fuente = fs.readFileSync(path.join(ROOT, "lib", "localized-href.ts"), "utf8");
  const mapa = fuente.slice(fuente.indexOf("ROUTE_MAP"), fuente.indexOf("};"));
  return new Set([...mapa.matchAll(/"[^"]+":\s*"(\/en[^"]*)"/g)].map((m) => m[1]));
}

/** Rutas generadas por los archivos de content/. */
function rutasDeContenido() {
  const rutas = new Set();
  if (!fs.existsSync(CONTENT_DIR)) return rutas;
  for (const seccion of fs.readdirSync(CONTENT_DIR)) {
    if (seccion === "en") continue;
    const dir = path.join(CONTENT_DIR, seccion);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const archivo of fs.readdirSync(dir)) {
      if (!archivo.endsWith(".mdx")) continue;
      const nombre = archivo.replace(/\.mdx$/, "");
      rutas.add(nombre === "index" ? `/${seccion}` : `/${seccion}/${nombre}`);
    }
  }
  return rutas;
}

/* ------------------------------------------------------------ enlaces ----- */

/** Enlaces markdown [texto](destino) de un documento. */
function enlacesDe(texto) {
  return [...texto.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);
}

/* -------------------------------------------------------------- main ------ */

const { rutas: rutasRewrite } = await rutasDeLaApp();
const validas = new Set([
  ...rutasRewrite,
  ...rutasDeCarpetas(),
  ...rutasDeContenido(),
  ...rutasInglesas(),
]);

/** Carpetas de secciones: las castellanas y, dentro de content/en, las inglesas. */
const carpetas = [];
if (fs.existsSync(CONTENT_DIR)) {
  for (const seccion of fs.readdirSync(CONTENT_DIR)) {
    if (seccion === "en") {
      const enDir = path.join(CONTENT_DIR, "en");
      for (const s of fs.readdirSync(enDir)) carpetas.push([`en/${s}`, path.join(enDir, s)]);
    } else carpetas.push([seccion, path.join(CONTENT_DIR, seccion)]);
  }
}

const errores = [];
let documentos = 0;
let comprobados = 0;

{
  for (const [seccion, dir] of carpetas) {
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const archivo of fs.readdirSync(dir)) {
      if (!archivo.endsWith(".mdx")) continue;
      documentos++;
      const ruta = `content/${seccion}/${archivo}`;
      const texto = fs.readFileSync(path.join(dir, archivo), "utf8");

      for (const destino of enlacesDe(texto)) {
        // Externos y anclas no se validan aqui.
        if (!destino.startsWith("/")) continue;
        comprobados++;
        const limpio = destino.split("#")[0].split("?")[0];
        if (!validas.has(limpio)) {
          errores.push(`${ruta}: enlace interno a "${destino}", que no existe`);
        }
      }
    }
  }
}

console.log(
  `check-content-links: ${documentos} documentos, ${comprobados} enlaces internos, ${validas.size} rutas conocidas`,
);

if (errores.length > 0) {
  console.error(`\n${errores.length} enlace(s) roto(s):`);
  for (const e of errores) console.error(`  - ${e}`);
  console.error("\nBuild detenido.");
  process.exit(1);
}

console.log("check-content-links: todos los enlaces internos resuelven");
