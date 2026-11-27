#!/usr/bin/env node
/**
 * Prueba content-migration/blog-htaccess/.htaccess sin Apache: aplica sus
 * RewriteRule como mod_rewrite en un .htaccess de la raíz (ruta sin la barra
 * inicial, ya decodificada; primera regla que casa con [L]; NC sin distinguir
 * mayúsculas) a cada URL de blog.sttok.com de content-migration/redirects.csv,
 * y exige el mismo destino que dio la web (middleware) al generar ese CSV.
 *
 * Solo cubre la lógica de las reglas. La prueba de verdad, una vez subido a
 * DreamHost, es `node scripts/check-blog-redirects.mjs` contra producción.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const htaccess = fs.readFileSync(path.join(ROOT, "content-migration/blog-htaccess/.htaccess"), "utf8");

const reglas = htaccess
  .split(/\r?\n/)
  .filter((l) => l.startsWith("RewriteRule "))
  .map((l) => {
    const [, patron, destino, flags] = /^RewriteRule (\S+) (\S+) \[([^\]]+)\]$/.exec(l);
    const f = flags.split(",");
    if (!f.includes("R=301") || !f.includes("L") || !f.includes("QSD")) throw new Error(`regla sin R=301, L o QSD: ${l}`);
    if (/\$\d/.test(destino)) throw new Error(`destino con referencias, no soportado aquí: ${l}`);
    return { re: new RegExp(patron, f.includes("NC") ? "i" : ""), destino };
  });

function apache(url) {
  const u = new URL(url);
  const ruta = decodeURIComponent(u.pathname).replace(/^\//, "");
  return reglas.find((r) => r.re.test(ruta))?.destino ?? null;
}

const filas = fs
  .readFileSync(path.join(ROOT, "content-migration/redirects.csv"), "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((l) => l.split(","))
  .filter(([origen]) => new URL(origen).host === "blog.sttok.com");

let errores = 0;
for (const [origen, esperado] of filas) {
  const obtenido = apache(origen);
  if (obtenido !== esperado) {
    errores++;
    console.log(`✗ ${origen}\n    web:      ${esperado}\n    htaccess: ${obtenido}`);
  }
}

// Casos que el CSV no cubre: mayúsculas, consultas, rutas de WordPress raras.
const extra = {
  "https://blog.sttok.com/RECURSOS/Que-Es-El-Cliff": "https://www.sttok.com/glosario-societario/que-es-el-cliff",
  "https://blog.sttok.com/recursos/que-es-el-cliff/amp/?x=1": "https://www.sttok.com/glosario-societario/que-es-el-cliff",
  "https://blog.sttok.com/recursos/que-es-el-cliff-2/": "https://www.sttok.com/glosario-societario",
  "https://blog.sttok.com/recursos/?p=123": "https://www.sttok.com/glosario-societario",
  "https://blog.sttok.com/recursos/wp-sitemap-posts-post-1.xml": "https://www.sttok.com/sitemap.xml",
  "https://blog.sttok.com/recursos/xmlrpc.php": "https://www.sttok.com/glosario-societario",
  "https://blog.sttok.com/.htaccess": "https://www.sttok.com/glosario-societario",
};
for (const [origen, esperado] of Object.entries(extra)) {
  const obtenido = apache(origen);
  if (obtenido !== esperado) {
    errores++;
    console.log(`✗ ${origen}: ${obtenido} (esperado ${esperado})`);
  }
}

console.log(`${filas.length + Object.keys(extra).length} URLs de blog.sttok.com, ${errores} diferencia(s) con la web.`);
process.exit(errores ? 1 : 0);
