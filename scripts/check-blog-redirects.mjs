#!/usr/bin/env node
/**
 * Comprueba las redirecciones del antiguo blog de WordPress.
 *
 *   node scripts/check-blog-redirects.mjs http://localhost:3100   # local
 *   node scripts/check-blog-redirects.mjs                         # producción
 *
 * En local pide cada ruta con la cabecera Host: blog.sttok.com; en producción
 * pide la URL real de blog.sttok.com. Para cada URL del inventario
 * (content-migration/inventory.csv), las variantes con errata que registra
 * Google, cinco URLs inventadas y las antiguas www.sttok.com/recursos/<slug>,
 * exige un único 301 a https://www.sttok.com/... y que el destino responda 200
 * sin más redirecciones.
 *
 * Escribe content-migration/redirects.csv (origen, destino, motivo).
 */
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const BASE = process.argv[2]?.replace(/\/$/, "");
const MAPA = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/blog-redirecciones.json"), "utf8"));
const WWW = "https://www.sttok.com";

/** Una petición sin seguir redirecciones. */
function pedir(url, host) {
  const u = new URL(url);
  const mod = u.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = mod.request(
      u,
      { method: "GET", headers: { ...(host ? { Host: host } : {}), "User-Agent": "check-blog-redirects" } },
      (res) => {
        res.resume();
        res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location }));
      },
    );
    req.on("error", reject);
    req.end();
  });
}

/** Petición a una URL de blog.sttok.com o de www, en local o en producción. */
function pedirUrl(url) {
  const u = new URL(url);
  if (!BASE) return pedir(url);
  return pedir(`${BASE}${u.pathname}${u.search}`, u.host);
}

function motivo(url) {
  const u = new URL(url);
  const s = u.pathname.toLowerCase().split("/").filter(Boolean);
  const slug = s[0] === "recursos" ? s[1] : s[0];
  const www = u.host === "www.sttok.com" ? " (antigua URL de www.sttok.com/recursos)" : "";
  if (MAPA.migradas.includes(slug)) return `entrada migrada al glosario${www}`;
  if (MAPA.variantes[slug]) return "variante con errata registrada por Google";
  if (MAPA.otras[slug]) return `entrada no migrada: página más afín${www}`;
  if (/robots\.txt$/.test(u.pathname)) return "robots.txt de www";
  if (/sitemap.*\.xml$/.test(u.pathname)) return "sitemap de www";
  return "sin equivalente: portada del glosario";
}

const inventario = fs
  .readFileSync(path.join(ROOT, "content-migration/inventory.csv"), "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((l) => l.split(",")[0])
  // Los medios se listan con el host que les dio WordPress; se piden en el blog.
  .map((u) => u.replace(/^https?:\/\/(www\.)?sttok\.com\/recursos\//, "https://blog.sttok.com/recursos/"));

const slugsPost = [...MAPA.migradas, ...Object.keys(MAPA.otras)];
const urls = [
  ...inventario,
  // Las entradas sin barra final.
  ...slugsPost.map((s) => `https://blog.sttok.com/recursos/${s}`),
  // Variantes con errata.
  "https://blog.sttok.com/recursos/que-es-como-se-calcula-el-derecho-de-adquisicion-preferente",
  "https://blog.sttok.com/recursos/que-es-y-como-esc-calcula-el-derecho-de-adquisicion-preferente/",
  "https://blog.sttok.com/recursos/que-es-y-como-se-calcula-derecho-de-adquisicion-preferente",
  // Paginación y consultas.
  "https://blog.sttok.com/recursos",
  "https://blog.sttok.com/recursos/?query-0-page=2",
  "https://blog.sttok.com/recursos/page/7/",
  // Rutas de WordPress.
  "https://blog.sttok.com/recursos/wp-admin/",
  "https://blog.sttok.com/recursos/wp-login.php",
  "https://blog.sttok.com/wp-admin/",
  "https://blog.sttok.com/robots.txt",
  "https://blog.sttok.com/recursos/que-es-el-cliff/feed/",
  // Cinco inventadas.
  "https://blog.sttok.com/no-existe",
  "https://blog.sttok.com/recursos/articulo-que-nunca-existio/",
  "https://blog.sttok.com/recursos/2023/07/06/algo/",
  "https://blog.sttok.com/privacidad.html",
  "https://blog.sttok.com/RECURSOS/QUE-ES-EL-CLIFF/",
  // Donde vivieron antes: www.sttok.com/recursos/<slug>, con y sin barra.
  ...slugsPost.flatMap((s) => [`${WWW}/recursos/${s}`, `${WWW}/recursos/${s}/`]),
];
const unicas = [...new Set(urls)];

let errores = 0;
const filas = [["origen", "destino", "motivo"]];
const destinos = new Map();
for (const url of unicas) {
  const r = await pedirUrl(url);
  const destino = r.location;
  let problema = "";
  if (r.status !== 301) problema = `HTTP ${r.status}`;
  else if (!destino?.startsWith(`${WWW}/`) && !(new URL(url).host === "www.sttok.com" && destino?.startsWith("/")))
    problema = `destino fuera de www: ${destino}`;
  if (!problema) {
    const final = destino.startsWith("/") ? `${WWW}${destino}` : destino;
    if (!destinos.has(final)) destinos.set(final, await pedirUrl(final));
    const d = destinos.get(final);
    if (d.status !== 200) problema = `el destino ${final} da ${d.status}${d.location ? ` → ${d.location}` : ""}`;
    filas.push([url, final, motivo(url)]);
  }
  if (problema) {
    errores++;
    console.log(`✗ ${url}: ${problema}`);
  }
}

const csv = (r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(",");
if (!errores) fs.writeFileSync(path.join(ROOT, "content-migration/redirects.csv"), filas.map(csv).join("\n") + "\n");
console.log(`${unicas.length} URLs, ${destinos.size} destinos distintos, ${errores} problema(s).`);
process.exit(errores ? 1 : 0);
