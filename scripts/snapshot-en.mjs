#!/usr/bin/env node
/**
 * Foto de las rutas inglesas: lo que sirve el sitio HOY. Sirve de red para
 * comprobar que migrar app/en/** a app/[locale]/** no cambia nada.
 *   node scripts/snapshot-en.mjs > antes.json
 */
import crypto from "node:crypto";
const BASE = process.argv[2] || "http://localhost:3100";

const RUTAS = ["/en","/en/product","/en/partners-book","/en/incentive-plans",
  "/en/shareholder-meetings","/en/operation-drafts","/en/secondary-market",
  "/en/solutions/companies","/en/solutions/lawyers","/en/solutions/startups",
  "/en/solutions/investors","/en/solutions/investors-dashboard",
  "/en/testimonials","/en/pricing","/en/resources","/en/about",
  "/en/sttok-vs-excel","/en/disclaimer","/en/privacy","/en/security"];

const uno = (html, re) => html.match(re)?.[1] ?? null;

const salida = {};
for (const ruta of RUTAS) {
  const res = await fetch(BASE + ruta);
  const html = await res.text();
  // Texto visible: se quitan scripts y etiquetas para comparar contenido.
  const texto = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  salida[ruta] = {
    status: res.status,
    lang: uno(html, /<html lang="([^"]+)"/),
    title: uno(html, /<title>([^<]*)<\/title>/),
    description: uno(html, /<meta name="description" content="([^"]*)"/),
    canonical: uno(html, /<link rel="canonical" href="([^"]+)"/),
    hreflang: [...html.matchAll(/hrefLang="([^"]+)" href="([^"]+)"/g)]
      .map((m) => `${m[1]}=${m[2]}`).sort(),
    h1: uno(html, /<h1[^>]*>([^<]*)/),
    jsonLd: [...html.matchAll(/"@type":"([A-Za-z]+)"/g)]
      .map((m) => m[1]).filter((t, i, a) => a.indexOf(t) === i).sort(),
    textoHash: crypto.createHash("sha1").update(texto).digest("hex").slice(0, 12),
    textoLen: texto.length,
  };
}
console.log(JSON.stringify(salida, null, 2));
