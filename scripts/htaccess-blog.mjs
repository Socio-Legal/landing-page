#!/usr/bin/env node
/**
 * Genera content-migration/blog-htaccess/.htaccess: las redirecciones de
 * blog.sttok.com para servirlas desde DreamHost (Apache) en lugar del
 * WordPress, sin pasar el dominio a Vercel. Sale del mismo mapa que el
 * middleware (lib/blog-redirecciones.json) y repite su lógica:
 *
 *   robots.txt               -> https://www.sttok.com/robots.txt
 *   ...sitemap*.xml          -> https://www.sttok.com/sitemap.xml
 *   [recursos/]<slug>[/...]  -> su destino (migrada, otra o variante)
 *   todo lo demás            -> https://www.sttok.com/glosario-societario
 *
 * Todas 301, sin la consulta (QSD) y sin distinguir mayúsculas.
 *
 *   node scripts/htaccess-blog.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const MAPA = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/blog-redirecciones.json"), "utf8"));
const WWW = "https://www.sttok.com";

const destinos = {
  ...Object.fromEntries(MAPA.migradas.map((s) => [s, `/glosario-societario/${s}`])),
  ...MAPA.otras,
};
const reglas = [
  ...Object.entries(destinos),
  ...Object.entries(MAPA.variantes).map(([v, s]) => [v, destinos[s]]),
];

const lineas = [
  "# blog.sttok.com: redirecciones del antiguo blog de WordPress a www.sttok.com.",
  "# Generado por scripts/htaccess-blog.mjs desde lib/blog-redirecciones.json",
  "# (repositorio de la web). No editar a mano.",
  "#",
  "# Va en la raíz del sitio blog.sttok.com en DreamHost, sin el WordPress:",
  "# la carpeta recursos/ tiene que desaparecer, porque su propio .htaccess",
  "# taparía estas reglas.",
  "",
  "Options -MultiViews",
  "DirectoryIndex disabled",
  "DirectorySlash Off",
  "RewriteEngine On",
  "",
  `RewriteRule ^robots\\.txt$ ${WWW}/robots.txt [R=301,L,NC,QSD]`,
  `RewriteRule (^|/)[^/]*sitemap[^/]*\\.xml$ ${WWW}/sitemap.xml [R=301,L,NC,QSD]`,
  "",
  "# Entradas: /recursos/<slug>/ y lo que cuelgue de ella (feed/, amp/...),",
  "# también <slug> en la raíz.",
  ...reglas.map(([slug, dest]) => `RewriteRule ^(recursos/)?${slug}(/.*)?$ ${WWW}${dest} [R=301,L,NC,QSD]`),
  "",
  "# Todo lo demás: portada, categorías, etiquetas, autores, paginación,",
  "# wp-admin, wp-content, wp-json y cualquier ruta desconocida.",
  `RewriteRule ^ ${WWW}${MAPA.porDefecto} [R=301,L,QSD]`,
  "",
];

const dir = path.join(ROOT, "content-migration/blog-htaccess");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, ".htaccess"), lineas.join("\n"));
console.log(`${reglas.length + 3} reglas en content-migration/blog-htaccess/.htaccess`);
