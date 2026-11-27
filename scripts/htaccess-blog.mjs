#!/usr/bin/env node
/**
 * Genera content-migration/blog-htaccess/.htaccess: las redirecciones de
 * blog.sttok.com para servirlas desde DreamHost (Apache) en lugar del
 * WordPress, sin pasar el dominio a Vercel. Sale del mismo mapa que el
 * middleware (lib/blog-redirecciones.json) y repite su lógica:
 *
 *   robots.txt               -> https://www.sttok.com/robots.txt
 *   ...sitemap*.xml          -> https://www.sttok.com/sitemap.xml
 *   ?p=<id> (enlace corto)   -> el destino de esa entrada
 *   [recursos/]<slug>[/...]  -> su destino (migrada, otra o variante)
 *   todo lo demás            -> https://www.sttok.com/glosario-societario
 *
 * Todas 301 de un solo salto a https://www (también desde http), sin la
 * consulta (QSD), sin distinguir mayúsculas y con destinos fijos: ninguna
 * regla copia nada de la petición al destino, así que no hay redirección
 * abierta. Solo /.well-known/acme-challenge/ queda sin redirigir, para que
 * DreamHost pueda renovar el certificado de Let's Encrypt del subdominio.
 *
 *   node scripts/htaccess-blog.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const MAPA = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/blog-redirecciones.json"), "utf8"));
const WWW = "https://www.sttok.com";
const R = "[R=301,L,NC,QSD]";

const destinos = {
  ...Object.fromEntries(MAPA.migradas.map((s) => [s, `/glosario-societario/${s}`])),
  ...MAPA.otras,
};
const reglas = [
  ...Object.entries(destinos),
  ...Object.entries(MAPA.variantes).map(([v, s]) => [v, destinos[s]]),
];
for (const [slug, dest] of reglas) {
  if (!/^[a-z0-9-]+$/.test(slug) || !/^\/[a-z0-9/-]*$/.test(dest)) throw new Error(`regla con caracteres inesperados: ${slug} -> ${dest}`);
}
const ids = Object.entries(MAPA.idsWordpress).map(([id, slug]) => {
  if (!/^\d+$/.test(id) || !destinos[slug]) throw new Error(`id sin destino: ${id} ${slug}`);
  return [id, destinos[slug]];
});

const lineas = [
  "# blog.sttok.com: redirecciones del antiguo blog de WordPress a www.sttok.com.",
  "# Generado por scripts/htaccess-blog.mjs desde lib/blog-redirecciones.json",
  "# (repositorio de la web). No editar a mano.",
  "#",
  "# Va en la raíz del sitio blog.sttok.com en DreamHost. El WordPress sale",
  "# FUERA de la carpeta pública (no basta con cambiarle el nombre dentro).",
  "",
  "# Sin listados de carpetas ni negociación de contenido; mod_dir no añade la",
  "# barra ni busca index, para que todo llegue a las reglas de abajo.",
  "Options -Indexes -MultiViews",
  "DirectoryIndex disabled",
  "DirectorySlash Off",
  "",
  "# Si mod_rewrite faltara, nada se sirve: mejor un 403 que un archivo.",
  "<IfModule !mod_rewrite.c>",
  "  Require all denied",
  "</IfModule>",
  "",
  "<IfModule mod_headers.c>",
  '  Header always set Strict-Transport-Security "max-age=31536000"',
  "</IfModule>",
  "",
  "RewriteEngine On",
  "",
  "# Renovación del certificado de Let's Encrypt: se sirve tal cual.",
  "RewriteRule ^\\.well-known/acme-challenge/[A-Za-z0-9_-]+$ - [L]",
  "",
  `RewriteRule ^robots\\.txt$ ${WWW}/robots.txt ${R}`,
  `RewriteRule (^|/)[^/]*sitemap[^/]*\\.xml$ ${WWW}/sitemap.xml ${R}`,
  "",
  "# Enlaces cortos de WordPress: /recursos/?p=<id>.",
  ...ids.flatMap(([id, dest]) => [
    `RewriteCond %{QUERY_STRING} (^|&)p=${id}(&|$)`,
    `RewriteRule ^(recursos/?)?$ ${WWW}${dest} ${R}`,
  ]),
  "",
  "# Entradas: /recursos/<slug>/ y lo que cuelgue de ella (feed/, amp/...),",
  "# también <slug> en la raíz.",
  ...reglas.map(([slug, dest]) => `RewriteRule ^(recursos/)?${slug}(/.*)?$ ${WWW}${dest} ${R}`),
  "",
  "# Todo lo demás: portada, categorías, etiquetas, autores, paginación,",
  "# wp-admin, wp-login, xmlrpc, wp-content, wp-json y cualquier ruta.",
  `RewriteRule ^ ${WWW}${MAPA.porDefecto} [R=301,L,QSD]`,
  "",
];

const dir = path.join(ROOT, "content-migration/blog-htaccess");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, ".htaccess"), lineas.join("\n"));
console.log(`${reglas.length + ids.length + 4} reglas en content-migration/blog-htaccess/.htaccess`);
