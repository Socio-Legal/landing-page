#!/usr/bin/env node
/**
 * Fichas descargables en PDF de las páginas de producto y de soluciones.
 *
 *   pnpm fichas                 # las once
 *   pnpm fichas libro-de-socios # solo una (el slug de su URL)
 *
 * Cada ficha sale de las MISMAS fuentes que su página, para que nunca se
 * contradigan: los textos de public/locales/es/<ns>.json, las funcionalidades
 * de lib/funcionalidades-catalogo.ts (con la selección de cada solución, que
 * se lee de su page.tsx), los planes de home-pricing-section.json, las cifras
 * de home-numbers-section.json y el logo de components/icons.tsx.
 *
 * Si cambias el texto de una de estas páginas, vuelve a generar su ficha y
 * versiona el PDF de public/fichas junto al cambio.
 *
 * Necesita Google Chrome instalado (o CHROME_PATH). No corre en Vercel: los
 * PDF se generan en local y se versionan.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SALIDA = path.join(ROOT, "public", "fichas");
const WEB = "https://www.sttok.com";

/** Las páginas con ficha: su URL pública y su page.tsx. */
const FICHAS = [
  { url: "/libro-de-socios", page: "app/(product)/partners-book/page.tsx", tipo: "producto" },
  { url: "/juntas-consejos", page: "app/(product)/shareholder-meetings/page.tsx", tipo: "producto" },
  { url: "/comunicaciones-y-firma", page: "app/(product)/communications-signatures/page.tsx", tipo: "producto" },
  { url: "/planes-de-incentivos", page: "app/(product)/incentive-plans/page.tsx", tipo: "producto" },
  { url: "/simulador", page: "app/(product)/operation-drafts/page.tsx", tipo: "producto" },
  { url: "/mercado-secundario", page: "app/(product)/secondary-market/page.tsx", tipo: "producto" },
  { url: "/empresas", page: "app/solutions/companies/page.tsx", tipo: "solucion" },
  { url: "/abogados", page: "app/solutions/lawyers/page.tsx", tipo: "solucion" },
  { url: "/startups", page: "app/solutions/startups/page.tsx", tipo: "solucion" },
  { url: "/inversores", page: "app/solutions/investors/page.tsx", tipo: "solucion" },
  { url: "/portal-del-inversor", page: "app/solutions/investors-dashboard/page.tsx", tipo: "solucion" },
];

/** Qué rótulo de home-pricing-section.json corresponde a cada módulo. */
/** Y con qué nombre corto se cita el módulo en la ficha. */
const PLAN_DE_MODULO = {
  socios: ["Libro de Socios", "Libro de socios"],
  incentivos: ["Planes Incentivos", "Planes de incentivos"],
  simulador: ["Simulador rondas", "Simulador"],
  juntas: ["Juntas de socios", "Juntas"],
  consejo: ["Consejos administración", "Consejos"],
  firma: ["Firma electrónica integrada", "Firma electrónica"],
  comunicaciones: ["*", "Comunicaciones"], // en todos los planes (FAQ de /comunicaciones-y-firma)
  secundario: ["extra", "Mercado secundario"], // coste adicional (plans.extras de pricing-page.json)
};

// --- Fuentes ---------------------------------------------------------------
const leer = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const json = (rel) => JSON.parse(leer(rel));
const cargarTs = (rel) => {
  const js = ts.transpileModule(leer(rel), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const m = { exports: {} };
  new Function("module", "exports", "require", js)(m, m.exports, require);
  return m.exports;
};
const { CATALOGO } = cargarTs("lib/funcionalidades-catalogo.ts");
const PRECIOS = json("public/locales/es/home-pricing-section.json").items;
const EXTRAS = json("public/locales/es/pricing-page.json").plans.extras;
const CIFRAS = json("public/locales/es/home-numbers-section.json").items;
const CAPTURAS = fs.readdirSync(path.join(ROOT, "public", "funcionalidades"));
const ICONS = leer("components/icons.tsx");
const LOGO_D = ICONS.slice(ICONS.indexOf("logo: (props"), ICONS.indexOf("logoMin:")).match(/d="([^"]+)"/)[1];

/** ns, módulos y selección, leídos del propio page.tsx. */
function leerPagina(rel) {
  const src = leer(rel);
  const ns = src.match(/ns="([^"]+)"/)[1];
  const sel = src.match(/const SELECCION = (\{[\s\S]*?\n\});/);
  const seleccion = sel ? JSON.parse(sel[1]) : null;
  const modulos = seleccion ? Object.keys(seleccion) : JSON.parse(src.match(/modulos=\{(\[[^\]]*\])\}/)[1]);
  return { ns, modulos, seleccion };
}

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const lista = (xs) => (xs.length > 1 ? xs.slice(0, -1).join(", ") + " y " + xs[xs.length - 1] : xs[0] ?? "");
const img = (rel) => "file:///" + path.join(ROOT, "public", rel.replace(/^\//, "")).replace(/\\/g, "/");
const existe = (rel) => fs.existsSync(path.join(ROOT, "public", rel.replace(/^\//, "")));
const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const parecido = (titulo, archivo) => sinTildes(titulo).split(/[^a-z]+/).filter((w) => w.length > 3 && sinTildes(archivo).includes(w)).length;
const primeraFrase =(t) => (t.match(/^.+?[.:](\s|$)/) || [t])[0].replace(/[:]\s*$/, ".").trim();
const logo = (alto) =>
  `<svg class="logo" style="height:${alto}" viewBox="10.2 5.3 71.2 20.6" fill="#6576ff" xmlns="http://www.w3.org/2000/svg"><path d="${LOGO_D}"/></svg>`;

/** Logo de un testimonio: el grande si existe junto al «-mini», o el de su marca. */
function logoTestimonio(t) {
  if (t.img) {
    const grande = t.img.replace("-mini", "");
    return existe(grande) ? grande : t.img;
  }
  const marcas = { MyInvestor: "/logo-myinvestor.png", Caballero: "/logo-caballero1830.png" };
  return marcas[t.logo];
}

/** Planes por módulo, agrupando los módulos que comparten planes. */
function planes(modulos) {
  const todos = PRECIOS.map((p) => p.name);
  const grupos = new Map();
  for (const id of modulos) {
    if (!PLAN_DE_MODULO[id]) continue;
    const [r, corto] = PLAN_DE_MODULO[id];
    const clave = r === "*" ? todos.join("|") : r === "extra" ? "extra" : PRECIOS.filter((p) => p.features.includes(r)).map((p) => p.name).join("|");
    if (!clave) continue;
    grupos.set(clave, [...(grupos.get(clave) || []), corto]);
  }
  return [...grupos].map(([clave, mods]) => ({
    modulos: mods,
    texto: clave === "extra" ? (EXTRAS.includes("coste extra") ? "con coste adicional sobre el plan." : EXTRAS) : "Planes " + lista(clave.split("|")) + ".",
  }));
}

// --- Una ficha ---------------------------------------------------------------
function construir(f) {
  const { ns, modulos, seleccion } = leerPagina(f.page);
  const P = json(`public/locales/es/${ns}.json`);
  const slug = f.url.slice(1);
  const nombre = P.hero.slogan;
  const etiqueta = f.tipo === "producto" ? "Ficha de producto" : "Ficha de solución";
  const MES = new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const DEMO = `${WEB}/demo?utm_source=ficha-pdf&utm_medium=pdf&utm_campaign=${slug}`;
  // Con pocas funcionalidades, «Qué incluye» y los casos van en la misma
  // página y la ficha tiene tres: una página casi vacía se ve sin terminar.
  const nTotal = (modulos.map((id) => CATALOGO.find((m) => m.id === id)).filter(Boolean)
    .reduce((n, m) => n + (seleccion?.[m.id]?.length ?? m.funcionalidades.length), 0));
  const corta = nTotal <= 6;
  const TOTAL = corta ? 3 : 4;

  const grupos = modulos
    .map((id) => CATALOGO.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => ({
      titulo: m.titulo,
      funcs: seleccion?.[m.id]
        ? seleccion[m.id].map((t) => m.funcionalidades.find((x) => x.titulo === t)).filter(Boolean)
        : m.funcionalidades,
    }))
    .filter((g) => g.funcs.length);
  const nFuncs = grupos.reduce((n, g) => n + g.funcs.length, 0);
  const subtitulo = f.tipo === "producto" ? CATALOGO.find((m) => m.id === modulos[0]).resumen : primeraFrase(P.hero.description);
  const portada = P.hero.image?.light;
  if (!portada || !existe(portada)) throw new Error(`${slug}: sin imagen de portada (${portada})`);

  // La captura de la página 2: la primera funcionalidad con captura propia.
  // Y, si a la página 3 le sobra sitio, la siguiente.
  const capturas = grupos
    .flatMap((g) => g.funcs)
    .filter((x) => x.href?.startsWith("/funcionalidades/"))
    .flatMap((x) => {
      const b = x.href.split("/").pop();
      // <ficha>-light.png primero; después sus variantes (-detalle, -compra…).
      return CAPTURAS.filter((n) => n === `${b}-light.png` || (n.startsWith(`${b}-`) && /^[a-z]+-light\.png$/.test(n.slice(b.length + 1))))
        .sort((x, y) => (x === `${b}-light.png` ? -1 : y === `${b}-light.png` ? 1 : 0))
        .map((n) => `funcionalidades/${n}`)
        .filter((src) => !portada.endsWith(src))
        .map((src) => ({ src, x, pie: `${x.titulo}: ${x.descripcion.replace(/\.$/, "")}. Datos de ejemplo.` }));
    })
    // Varias funcionalidades pueden enlazar a la misma ficha: el pie es el de
    // la que mejor nombra la pantalla (sus palabras en el nombre del archivo).
    .filter((c, i, a) => a.findIndex((d) => d.src === c.src) === i)
    .map((c) => {
      const todas = grupos.flatMap((g) => g.funcs);
      const x = todas.reduce((m, f) => (parecido(f.titulo, c.src) > parecido(m.titulo, c.src) ? f : m), c.x);
      return { src: c.src, pie: `${x.titulo}: ${x.descripcion.replace(/\.$/, "")}. Datos de ejemplo.` };
    });
  const [captura, captura2] = capturas;

  const t = P.hero.title;
  const tituloPortada = t.toLowerCase().startsWith(nombre.toLowerCase()) ? `<em>${esc(t.slice(0, nombre.length))}</em>${esc(t.slice(nombre.length))}` : esc(t);
  const testi = (P.testimonials?.items || [])[0];
  const logoT = testi && logoTestimonio(testi);
  const pasos = P.setup?.steps || [];
  const faq = (P.faq?.items || []).slice(0, 3);
  const pl = planes(modulos);

  const cabecera = `<header class="cab">${logo("6.2mm")}<span class="cab-r">${esc(nombre)} · ${etiqueta}</span></header>`;
  const pie = (n) => `<footer class="pie"><a href="${WEB}${f.url}">sttok.com${f.url}</a><span>${n} / ${TOTAL}</span></footer>`;
  const testiHtml = testi
    ? `<div class="testi" id="testi"><div><q>${esc(testi.description)}</q><div class="quien">${esc(testi.name)} · ${esc(testi.role)}</div></div>${logoT ? `<img src="${img(logoT)}">` : ""}</div>`
    : "";

  const incluye = `<div class="eyebrow">${esc(P.includes.eyebrow)}</div>
  <h2>${esc(P.includes.title)}</h2>
  <div class="incluye${nFuncs > 18 ? " compacta" : ""}">${grupos
    .map((g) => (grupos.length > 1 ? `<h4 class="grupo">${esc(g.titulo)}</h4>` : "") + g.funcs.map((x) => `<div class="func"><h3>${x.href ? `<a href="${WEB}${x.href}">${esc(x.titulo)}</a>` : esc(x.titulo)}</h3><p>${esc(x.descripcion)}</p></div>`).join(""))
    .join("")}</div>`;

  const pagina2 = pasos.length
    ? `<div class="eyebrow">${esc(P.setup.eyebrow)}</div><h2>${esc(P.setup.title)}</h2><p class="lede">${esc(P.hero.description)}</p>
       <div class="pasos">${pasos.map((s, i) => `<div class="paso"><div class="n">${i + 1}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("")}</div>`
    : `<div class="eyebrow">Qué hace Sttok</div><h2>${esc(P.faq?.title || nombre)}</h2><p class="lede">${esc(P.hero.description)}</p>
       <div class="pasos">${faq.map((q) => `<div class="paso"><h3>${esc(q.q)}</h3><p>${esc(q.a)}</p></div>`).join("")}</div>`;

  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(nombre)} · Sttok</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>
<section class="pag portada">
  <header class="cab">${logo("7mm")}<span class="cab-r">${etiqueta}</span></header>
  <h1>${tituloPortada}</h1>
  <p class="sub">${esc(subtitulo)}</p>
  <div class="brillo"></div>
  <div class="escena"><img src="${img(portada)}"></div>
  <div class="base"><span><b>Sttok</b> · ${esc(nombre)}</span><span>${TOTAL} páginas · ${esc(MES)}</span></div>
</section>
<section class="pag" id="p2">
  ${cabecera}
  ${pagina2}
  ${captura ? `<figure class="captura" id="captura"><div class="marco-img"><img src="${img(captura.src)}"></div><figcaption>${esc(captura.pie)}</figcaption></figure>` : ""}
  <div class="empuje"></div>${pie(2)}
</section>
${corta ? "" : `<section class="pag" id="p3">
  ${cabecera}
  ${incluye}
  <div class="empuje"></div>${testiHtml}
  ${captura2 ? `<figure class="captura relleno" id="captura3"><div class="marco-img"><img src="${img(captura2.src)}"></div><figcaption>${esc(captura2.pie)}</figcaption></figure>` : ""}
  ${pie(3)}
</section>`}
<section class="pag${corta ? " unida" : ""}" id="p4">
  ${cabecera}
  ${corta ? incluye + `<div class="eyebrow segunda">${esc(P.situations.eyebrow)}</div>` : `<div class="eyebrow">${esc(P.situations.eyebrow)}</div>`}
  <h2>${esc(P.situations.title)}</h2>
  <table><thead><tr><th>${esc(P.situations.columns.situation)}</th><th>${esc(P.situations.columns.action)}</th></tr></thead><tbody>
  ${P.situations.rows.map((r) => `<tr><td>${esc(r.situation)}</td><td>${esc(r.action)}</td></tr>`).join("")}
  </tbody></table>
  <div id="hueco-testi"></div>
  <div class="cifras">${CIFRAS.map((c) => `<div><b>${esc(c.value)}</b><span>${esc(c.label)}</span></div>`).join("")}</div>
  <div class="cierre">
    <div class="planes"><div class="eyebrow">Planes</div>${
      pl.length === 1 && !pl[0].texto.startsWith("con coste")
        ? `<p>Incluido en los ${esc(pl[0].texto.replace(/^Planes/, "planes"))}</p>`
        : pl.map((x) => `<p><b>${esc(lista(x.modulos))}:</b> ${esc(x.texto.replace(/^Planes/, "planes"))}</p>`).join("")
    }<p class="precios"><a href="${WEB}/precios">sttok.com/precios</a></p></div>
    <div class="demo"><div class="t">Una demo de 30 minutos con un experto societario</div><a class="boton" href="${DEMO}">Reservar demo <span>→</span></a></div>
  </div>
  <div class="empuje"></div>
  <p class="nota">Actualizado en ${esc(MES)}. Esta ficha describe el producto y no constituye asesoramiento jurídico. www.sttok.com · info@sttok.com</p>
  ${pie(TOTAL)}
</section>
</body></html>`;
  return { slug, html, nFuncs, planes: pl };
}

/**
 * Ajuste en el navegador: si una página no cabe, se compacta lo que sobra en
 * este orden, y si aun así no cabe, la ficha falla.
 */
function ajustar() {
  const sobra = (p) => p.scrollHeight - p.clientHeight;
  const p2 = document.getElementById("p2"), p4 = document.getElementById("p4");
  const p3 = document.getElementById("p3") || p4; // la ficha corta no tiene página 3
  const pasos = [];
  // Página 2: la captura ocupa el hueco que queda; si queda poco, fuera.
  const cap = document.getElementById("captura");
  if (cap && cap.getBoundingClientRect().height < 170) { cap.remove(); pasos.push("p2: sin captura"); }
  if (sobra(p2) > 0) { p2.classList.add("apretada"); pasos.push("p2 apretada"); }
  // Página 3: compactar, luego el testimonio a la 4, luego más compacto.
  const inc = p3.querySelector(".incluye"), testi = document.getElementById("testi");
  const c3 = document.getElementById("captura3");
  if (c3 && sobra(p3) > 0) { c3.remove(); pasos.push("p3 sin relleno"); }
  if (p3 === p4 && sobra(p4) > 0) { p4.classList.add("apretada"); pasos.push("unida apretada"); }
  if (p3 !== p4 && sobra(p3) > 0 && !inc.classList.contains("compacta")) { inc.classList.add("compacta"); pasos.push("p3 compacta"); }
  if (sobra(p3) > 0 && testi) { document.getElementById("hueco-testi").appendChild(testi); pasos.push("testimonio a p4"); }
  if (p3 !== p4 && sobra(p3) > 0) { inc.classList.add("muy-compacta"); pasos.push("p3 muy compacta"); }
  // Si no cabe en la 4, a la 2, sobre la captura (que encoge); si tampoco, fuera.
  if (testi && p4.contains(testi) && sobra(p4) > 0) {
    const c2 = document.getElementById("captura");
    (c2 || p2.querySelector(".empuje")).before(testi);
    pasos.push("testimonio a p2");
    if (c2 && c2.getBoundingClientRect().height < 170) { c2.remove(); pasos.push("p2: sin captura"); }
    if (sobra(p2) > 0) { testi.remove(); pasos.push("sin testimonio"); }
  }
  const c3b = document.getElementById("captura3");
  if (c3b && c3b.getBoundingClientRect().height < 230) { c3b.remove(); pasos.push("p3 sin relleno"); }
  if (sobra(p4) > 0) { p4.classList.add("apretada"); pasos.push("p4 apretada"); }
  const fallos = [...document.querySelectorAll(".pag")].map((p, i) => ({ pag: i + 1, sobra: sobra(p) })).filter((x) => x.sobra > 0);
  return { pasos, fallos };
}

const CSS = `
@page { size: A4; margin: 0; }
:root { --crema: #f1eee8; --navy: #1b2240; --navy2: #252e55; --tinta: #1b1a17; --gris: #5e5a53; --linea: #d9d4ca; --brand: #6680ff; --champan: #d6c49a; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--crema); color: var(--tinta); font: 400 10.5pt/1.5 Inter, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
.pag { width: 210mm; height: 297mm; padding: 16mm 18mm 14mm; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; }
.pag:last-child { page-break-after: auto; }
.empuje { margin-top: auto; }
.eyebrow { font-size: 7.5pt; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--gris); }
.cab { display: flex; justify-content: space-between; align-items: center; padding-bottom: 5mm; border-bottom: 1px solid var(--linea); margin-bottom: 9mm; flex-shrink: 0; }
.cab-r { font-size: 7.5pt; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--gris); }
.pie { display: flex; justify-content: space-between; font-size: 8pt; color: var(--gris); padding-top: 4mm; border-top: 1px solid var(--linea); flex-shrink: 0; }
h2 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 27pt; line-height: 1.08; letter-spacing: -0.01em; margin: 2.5mm 0 4mm; text-wrap: balance; }
.lede { color: var(--gris); font-size: 10.5pt; max-width: 160mm; }

/* Portada */
.portada { background: radial-gradient(120% 80% at 85% 0%, #2c3770 0%, #1b2240 46%, #121731 100%); color: #f3efe6; padding: 18mm 18mm 14mm; }
.portada::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .05 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>"); pointer-events: none; }
.portada .cab { border-color: rgba(214,196,154,.35); position: relative; }
.portada .cab-r { color: var(--champan); }
.portada h1 { position: relative; font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 46pt; line-height: 1.02; letter-spacing: -0.018em; margin-top: 20mm; max-width: 162mm; text-wrap: balance; }
.portada h1 em { font-style: italic; color: #fff; }
.portada .sub { position: relative; font-size: 12pt; line-height: 1.5; color: rgba(243,239,230,.72); margin-top: 7mm; max-width: 130mm; }
.portada .brillo { position: absolute; width: 230mm; height: 160mm; right: -80mm; top: 125mm; background: radial-gradient(closest-side, rgba(102,128,255,.34), rgba(102,128,255,0)); }
.portada .escena { position: absolute; left: 30mm; right: 0; top: 140mm; height: 120mm; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent 100%); mask-image: linear-gradient(to bottom, #000 62%, transparent 100%); }
.portada .escena img { width: 205mm; display: block; border-radius: 7px 0 0 0; }
.portada .base { position: absolute; left: 18mm; right: 18mm; bottom: 14mm; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; padding-top: 4mm; border-top: 1px solid rgba(214,196,154,.35); color: rgba(243,239,230,.85); }
.portada .base b { font-weight: 600; color: var(--champan); }

/* Página 2 */
.pasos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm 6mm; margin-top: 7mm; }
.paso { border-top: 2px solid var(--navy); padding-top: 3.5mm; }
.paso .n { font-family: 'Instrument Serif', serif; font-size: 20pt; line-height: 1; color: var(--brand); margin-bottom: 2mm; }
.paso h3 { font-size: 10.5pt; font-weight: 600; margin-bottom: 1.5mm; line-height: 1.35; }
.paso p { font-size: 9pt; color: var(--gris); line-height: 1.5; }
.captura { margin-top: 7mm; flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
.marco-img { flex: 1 1 auto; min-height: 0; border-radius: 6px; border: 1px solid var(--linea); overflow: hidden; background: #fff; box-shadow: 0 6px 22px rgba(27,34,64,.10); }
.marco-img img { width: 100%; height: auto; display: block; }
.captura.relleno { margin: 0 0 6mm; }
.captura figcaption { font-size: 8pt; color: var(--gris); margin-top: 2.5mm; }
#p2 .captura ~ .empuje { display: none; }
#p2 .captura + .empuje + .pie, #p2 .captura ~ .pie { margin-top: 6mm; }
.apretada .paso p, .apretada td { font-size: 8.2pt; }
.apretada h2 { font-size: 24pt; }

/* Página 3 */
.incluye { columns: 2; column-gap: 9mm; margin-top: 5mm; }
.grupo { font-size: 7.5pt; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--brand); margin: 3mm 0 1mm; break-after: avoid; }
.grupo:first-child { margin-top: 0; }
.func { break-inside: avoid; padding: 1.9mm 0 2.1mm; border-top: 1px solid var(--linea); }
.func h3 { font-size: 9.5pt; font-weight: 600; }
.func p { font-size: 8.5pt; color: var(--gris); line-height: 1.45; margin-top: .6mm; }
.compacta .func { padding: 1.4mm 0 1.6mm; }
.compacta .func h3 { font-size: 9pt; }
.compacta .func p { font-size: 8pt; line-height: 1.38; }
.muy-compacta .func p { font-size: 7.6pt; }
.muy-compacta .func { padding: 1.1mm 0 1.2mm; }
.muy-compacta { columns: 3; column-gap: 6.5mm; }
.muy-compacta .func h3 { font-size: 8.6pt; }

/* Testimonio, situaciones y cierre */
.testi { display: grid; grid-template-columns: 1fr auto; gap: 6mm; align-items: center; margin: 6mm 0; padding: 5mm 6mm; background: #fff; border-radius: 6px; flex-shrink: 0; }
.testi q { font-family: 'Instrument Serif', serif; font-size: 13.5pt; line-height: 1.25; quotes: '«' '»'; }
.testi .quien { font-size: 8.5pt; color: var(--gris); margin-top: 2.5mm; }
.testi img { height: 9mm; max-width: 42mm; object-fit: contain; }
#hueco-testi .testi { margin: 6mm 0 0; }
table { width: 100%; border-collapse: collapse; margin-top: 5mm; }
th { text-align: left; font-size: 7.5pt; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--gris); padding: 0 0 2mm; border-bottom: 1.5px solid var(--tinta); }
td { vertical-align: top; padding: 2.2mm 4mm 2.2mm 0; border-bottom: 1px solid var(--linea); font-size: 8.8pt; line-height: 1.45; }
td:first-child { width: 36%; font-weight: 600; }
td:last-child { color: var(--gris); padding-right: 0; }
.cifras { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; background: var(--navy); color: #f1eee8; margin-top: 7mm; padding: 5.5mm 6mm; border-radius: 6px; flex-shrink: 0; }
.cifras b { display: block; font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 21pt; line-height: 1; margin-bottom: 1.5mm; }
.cifras span { display: block; font-size: 7.5pt; line-height: 1.35; color: rgba(241,238,232,.7); }
.cierre { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 6mm; flex-shrink: 0; }
.planes { border-top: 2px solid var(--navy); padding-top: 3.5mm; }
.planes p { font-size: 9.5pt; margin-top: 1.8mm; line-height: 1.4; }
.planes b { font-weight: 600; }
.planes .precios { font-size: 8.5pt; color: var(--gris); text-decoration: underline; }
.demo { background: var(--navy2); color: #f1eee8; border-radius: 6px; padding: 5mm 6mm; }
.demo .t { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 15pt; line-height: 1.15; }
.demo .boton { display: inline-flex; align-items: center; gap: 2mm; margin-top: 3.5mm; padding: 2.2mm 4.5mm; border-radius: 999px; background: #f3efe6; color: var(--navy); font-weight: 600; font-size: 9pt; }
.demo .boton span { color: var(--brand); }
.eyebrow.segunda { margin-top: 9mm; }
.unida .cifras { margin-top: 6mm; }
.unida h2 { font-size: 23pt; margin-bottom: 2mm; }
.unida .cab { margin-bottom: 7mm; }
.unida .incluye { margin-top: 3mm; }
.unida .eyebrow.segunda { margin-top: 6mm; }
.unida.apretada .nota { padding-top: 3mm; }
.unida.apretada td { padding: 1.8mm 4mm 1.8mm 0; }
.nota { font-size: 7.5pt; color: var(--gris); padding: 5mm 0 3mm; flex-shrink: 0; }
`;

function chrome() {
  const candidatos = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].filter(Boolean);
  const c = candidatos.find((p) => fs.existsSync(p));
  if (!c) throw new Error("No encuentro Chrome: define CHROME_PATH");
  return c;
}

(async () => {
  const solo = process.argv[2];
  const lista_ = solo ? FICHAS.filter((f) => f.url === "/" + solo) : FICHAS;
  if (!lista_.length) throw new Error("No hay ficha para " + solo);
  fs.mkdirSync(SALIDA, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fichas-"));
  const browser = await chromium.launch({ executablePath: chrome(), headless: true, args: ["--allow-file-access-from-files"] });
  let malas = 0;
  for (const f of lista_) {
    const { slug, html, nFuncs, planes: pl } = construir(f);
    const htmlPath = path.join(tmp, slug + ".html");
    fs.writeFileSync(htmlPath, html);
    const page = await browser.newPage();
    await page.goto("file:///" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const { pasos, fallos } = await page.evaluate(ajustar);
    const out = path.join(SALIDA, `sttok-${slug}.pdf`);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    if (process.env.FOTOS) {
      const ps = await page.$$(".pag");
      await page.setViewportSize({ width: 794, height: 1123 });
      for (let i = 0; i < ps.length; i++) await ps[i].screenshot({ path: path.join(process.env.FOTOS, `${slug}-p${i + 1}.png`) });
    }
    await page.close();
    if (fallos.length) malas++;
    console.log(`${fallos.length ? "✗" : "✓"} ${slug}: ${nFuncs} funcionalidades, ${(fs.statSync(out).size / 1024).toFixed(0)} KB` +
      (pasos.length ? ` · ${pasos.join(", ")}` : "") + (fallos.length ? ` · NO CABE ${JSON.stringify(fallos)}` : "") +
      ` · planes: ${pl.map((x) => lista(x.modulos) + " → " + x.texto).join(" | ")}`);
  }
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  if (malas) process.exit(1);
})();
