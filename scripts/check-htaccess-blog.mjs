#!/usr/bin/env node
/**
 * Prueba content-migration/blog-htaccess/.htaccess sin Apache: aplica sus
 * RewriteCond/RewriteRule como mod_rewrite en un .htaccess de la raíz (ruta
 * sin la barra inicial, ya decodificada; primera regla que casa con [L]; NC
 * sin distinguir mayúsculas; «-» = sin redirección) a cada URL de
 * blog.sttok.com de content-migration/redirects.csv y exige el mismo destino
 * que dio la web (middleware) al generar ese CSV. Prueba además casos de
 * seguridad: redirección abierta, rutas de ataque habituales, ACME.
 *
 * Solo cubre la lógica de las reglas. La prueba de verdad, una vez subido a
 * DreamHost, es `node scripts/check-blog-redirects.mjs` contra producción.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const htaccess = fs.readFileSync(path.join(ROOT, "content-migration/blog-htaccess/.htaccess"), "utf8");
const MAPA = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/blog-redirecciones.json"), "utf8"));
const WWW = "https://www.sttok.com";
const DEFECTO = `${WWW}${MAPA.porDefecto}`;

const reglas = [];
let conds = [];
for (const l of htaccess.split(/\r?\n/)) {
  const c = /^RewriteCond %\{QUERY_STRING\} (\S+)$/.exec(l);
  if (c) {
    conds.push(new RegExp(c[1]));
    continue;
  }
  if (!l.startsWith("RewriteRule ")) continue;
  const [, patron, destino, flags] = /^RewriteRule (\S+) (\S+) \[([^\]]+)\]$/.exec(l);
  const f = flags.split(",");
  if (destino !== "-" && (!f.includes("R=301") || !f.includes("L") || !f.includes("QSD")))
    throw new Error(`regla sin R=301, L o QSD: ${l}`);
  if (/[$%]/.test(destino)) throw new Error(`el destino copia algo de la petición: ${l}`);
  if (destino !== "-" && !destino.startsWith(`${WWW}/`)) throw new Error(`destino fuera de www: ${l}`);
  reglas.push({ re: new RegExp(patron, f.includes("NC") ? "i" : ""), destino, conds });
  conds = [];
}

/** Destino de una URL, o null si no redirige. */
function apache(url) {
  const u = new URL(url);
  const ruta = decodeURIComponent(u.pathname).replace(/^\//, "");
  const qs = u.search.replace(/^\?/, "");
  const r = reglas.find((x) => x.re.test(ruta) && x.conds.every((c) => c.test(qs)));
  return !r || r.destino === "-" ? null : r.destino;
}

let errores = 0;
const comprobar = (origen, esperado) => {
  const obtenido = apache(origen);
  if (obtenido !== esperado) {
    errores++;
    console.log(`✗ ${origen}\n    esperado: ${esperado}\n    htaccess: ${obtenido}`);
  }
};

// 1. Las URLs del blog: el mismo destino que la web.
const filas = fs
  .readFileSync(path.join(ROOT, "content-migration/redirects.csv"), "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((l) => l.split(","))
  .filter(([origen]) => new URL(origen).host === "blog.sttok.com");
for (const [origen, esperado] of filas) comprobar(origen, esperado);

// 2. Enlaces cortos ?p=<id> de WordPress: cada uno al destino de su entrada.
const destinoSlug = (s) => (MAPA.migradas.includes(s) ? `${WWW}/glosario-societario/${s}` : `${WWW}${MAPA.otras[s]}`);
const ids = Object.entries(MAPA.idsWordpress);
for (const [id, slug] of ids) {
  comprobar(`https://blog.sttok.com/recursos/?p=${id}`, destinoSlug(slug));
  comprobar(`https://blog.sttok.com/?p=${id}&utm_source=x`, destinoSlug(slug));
}
comprobar("https://blog.sttok.com/recursos/?p=999999", DEFECTO); // id que no existe
comprobar(`https://blog.sttok.com/recursos/?xp=${ids[0][0]}`, DEFECTO);

// 3. Casos raros, de ataque y de seguridad: nunca fuera de www ni sin redirigir.
const extra = {
  "https://blog.sttok.com/RECURSOS/Que-Es-El-Cliff": `${WWW}/glosario-societario/que-es-el-cliff`,
  "https://blog.sttok.com/recursos/que-es-el-cliff/amp/?x=1": `${WWW}/glosario-societario/que-es-el-cliff`,
  "https://blog.sttok.com/recursos/que-es-el-cliff-2/": DEFECTO,
  "https://blog.sttok.com/recursos/wp-sitemap-posts-post-1.xml": `${WWW}/sitemap.xml`,
  "https://blog.sttok.com/recursos/xmlrpc.php": DEFECTO,
  "https://blog.sttok.com/recursos/wp-login.php?redirect_to=https://evil.example": DEFECTO,
  "https://blog.sttok.com//evil.example/%2e%2e": DEFECTO,
  "https://blog.sttok.com/recursos/%2e%2e/%2e%2e/etc/passwd": DEFECTO,
  "https://blog.sttok.com/recursos/wp-config.php": DEFECTO,
  "https://blog.sttok.com/recursos-wordpress-antic/wp-config.php": DEFECTO,
  "https://blog.sttok.com/.env": DEFECTO,
  "https://blog.sttok.com/.git/config": DEFECTO,
  "https://blog.sttok.com/.htaccess": DEFECTO,
  "https://blog.sttok.com/backup.sql": DEFECTO,
  "https://blog.sttok.com/?url=https://evil.example": DEFECTO,
  "https://blog.sttok.com/.well-known/acme-challenge/../../.env": DEFECTO,
  "https://blog.sttok.com/.well-known/acme-challenge/abc_DEF-123": null,
  "https://blog.sttok.com/.well-known/security.txt": DEFECTO,
};
for (const [origen, esperado] of Object.entries(extra)) comprobar(origen, esperado);

const total = filas.length + ids.length * 2 + 2 + Object.keys(extra).length;
console.log(`${total} URLs de blog.sttok.com, ${errores} problema(s).`);
process.exit(errores ? 1 : 0);
