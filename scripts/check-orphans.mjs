#!/usr/bin/env node
/**
 * Detecta paginas huerfanas: rutas publicas que no reciben NI UN enlace
 * interno desde ninguna otra pagina del sitio.
 *
 * No analiza el codigo fuente: recorre el HTML realmente servido, que es lo
 * que ve un rastreador. Necesita el sitio levantado.
 *
 *   node scripts/check-orphans.mjs [base]        (por defecto http://localhost:3100)
 */
const BASE = process.argv[2] || "http://localhost:3100";

/** Rutas publicas: las del sitemap mas las /en, que no figuran como <loc>. */
async function rutasPublicas() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""))
    .map((p) => (p === "" ? "/" : p));
  const en = [...xml.matchAll(/hreflang="en" href="([^"]+)"/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, ""),
  );
  return [...new Set([...locs, ...en])];
}

const normalizar = (href) => {
  const limpio = href.split("#")[0].split("?")[0];
  if (limpio.length > 1 && limpio.endsWith("/")) return limpio.slice(0, -1);
  return limpio === "" ? "/" : limpio;
};

const rutas = await rutasPublicas();

// entrantes[destino] = Set(origenes)
const entrantes = new Map(rutas.map((r) => [r, new Set()]));

for (const origen of rutas) {
  const res = await fetch(BASE + origen);
  if (!res.ok) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const destino = normalizar(m[1]);
    if (destino === origen) continue; // un enlace a si misma no cuenta
    if (entrantes.has(destino)) entrantes.get(destino).add(origen);
  }
}

const huerfanas = rutas.filter((r) => r !== "/" && entrantes.get(r).size === 0);

console.log(`check-orphans: ${rutas.length} rutas publicas analizadas sobre ${BASE}\n`);
console.log("enlaces entrantes por ruta:");
for (const r of rutas.slice().sort((a, b) => entrantes.get(a).size - entrantes.get(b).size)) {
  const n = entrantes.get(r).size;
  console.log(`  ${String(n).padStart(3)}  ${r}`);
}

if (huerfanas.length > 0) {
  console.error(`\n${huerfanas.length} pagina(s) huerfana(s), sin ningun enlace entrante:`);
  for (const h of huerfanas) console.error(`  - ${h}`);
  process.exit(1);
}
console.log("\ncheck-orphans: ninguna pagina huerfana");
