#!/usr/bin/env node
/**
 * Dossier comercial en PDF (castellano e inglés), el que se descarga en /precios.
 *
 *   pnpm dossier          # los dos
 *   pnpm dossier en       # solo uno
 *
 * Sale de las MISMAS fuentes que la web, para que no se quede atrás: los
 * módulos de lib/funcionalidades-catalogo.ts, cómo se factura y los planes de
 * /precios (pricing-page.json, home-pricing-section.json y
 * home-pricing-anchor.json), las cifras y la seguridad de la home, los logos
 * de config/client-logos.ts y dos testimonios de la home. El diseño es el de
 * las fichas de producto (scripts/fichas-pdf.mjs).
 *
 * Si cambia cualquiera de esas fuentes, vuelve a generarlo y versiona los PDF
 * de public/docs. Necesita Google Chrome instalado (o CHROME_PATH).
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
const SALIDA = path.join(ROOT, "public", "docs");
const WEB = "https://www.sttok.com";

/** Módulos del catálogo, en el orden del menú Producto. */
const MODULOS = ["socios", "juntas", "consejo", "apoderados", "comunicaciones", "firma", "grupos", "simulador", "incentivos", "secundario"];
/**
 * Clientes del dossier, por relevancia. Sin Derecho.com, LetsLaw, Cabiedes ni
 * Banktrack, que no se usan como referencia.
 */
const CLIENTES = ["Factorial", "Axa", "Andbank", "MyInvestor", "Osborne", "Taxdown", "PldSpace", "Multiverse", "Caballero", "Fanalca"];
/**
 * Testimonios, por el logo de su empresa en home-testimonials-section.json (igual
 * en los dos idiomas): el primero va en precios y el segundo, con los clientes.
 */
const TESTIMONIOS = ["Caballero", "MyInvestor"];
/** Preguntas de /precios que van en el dossier (por posición en pricing-page.json). */
const FAQ = [3, 5];

const TXT = {
  es: {
    etiqueta: "Dossier comercial",
    modulos: "Qué hace Sttok",
    modulosTitulo: "Los módulos de Sttok",
    precios: "Precios",
    preciosTitulo: "Cómo se factura",
    plan: "Plan",
    hasta: "Sociedades de hasta",
    precio: "Precio por sociedad y año",
    incluido: "Incluido",
    sinImpuestos: "Impuestos no incluidos.",
    seguridad: "Seguridad y acceso",
    clientes: "Empresas que usan Sttok",
    demo: "Una demo de 30 minutos con un experto societario",
    boton: "Reservar demo",
    paginas: "páginas",
    nota: (mes) => `Actualizado en ${mes}. Este dossier describe el producto y no constituye asesoramiento jurídico. www.sttok.com · info@sttok.com`,
    mesLocale: "es-ES",
  },
  en: {
    etiqueta: "Sales brochure",
    modulos: "What Sttok does",
    modulosTitulo: "Sttok modules",
    precios: "Pricing",
    preciosTitulo: "How billing works",
    plan: "Plan",
    hasta: "Companies with up to",
    precio: "Price per company per year",
    incluido: "Included",
    sinImpuestos: "Taxes not included.",
    seguridad: "Security and access",
    clientes: "Companies using Sttok",
    demo: "A 30-minute demo with a corporate expert",
    boton: "Book a demo",
    paginas: "pages",
    nota: (mes) => `Updated ${mes}. This brochure describes the product and is not legal advice. www.sttok.com · info@sttok.com`,
    mesLocale: "en-GB",
  },
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
const { CATALOGO, HREF_EN } = cargarTs("lib/funcionalidades-catalogo.ts");
const ICONS = leer("components/icons.tsx");
const LOGO_D = ICONS.slice(ICONS.indexOf("logo: (props"), ICONS.indexOf("logoMin:")).match(/d="([^"]+)"/)[1];
/** Archivo de cada logo de cliente, leído de los import de config/client-logos.ts. */
const LOGOS = Object.fromEntries([...leer("config/client-logos.ts").matchAll(/^import (\w+) from "@\/public\/([^"]+)";/gm)].map((m) => [m[1], m[2]]));

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const img = (rel) => "file:///" + path.join(ROOT, "public", rel.replace(/^\//, "")).replace(/\\/g, "/");
const logo = (alto) =>
  `<svg class="logo" style="height:${alto}" viewBox="10.2 5.3 71.2 20.6" fill="#6576ff" xmlns="http://www.w3.org/2000/svg"><path d="${LOGO_D}"/></svg>`;
const euros = (centimos, lang) => (lang === "en" ? `€${centimos / 100}` : `${centimos / 100} €`);

function construir(lang) {
  const T = TXT[lang];
  const L = (f) => json(`public/locales/${lang}/${f}.json`);
  const hero = L("home-hero-section").hero;
  const cifras = L("home-numbers-section").items;
  const precios = L("pricing-page");
  const planes = L("home-pricing-section").items;
  const ancla = L("home-pricing-anchor");
  const integ = L("home-integrations-section");
  const items = L("home-testimonials-section").items;
  const [testiPrecios, testiClientes] = TESTIMONIOS.map((l) => items.find((t) => t.logo === l));
  const testi = (t) => (t ? `<div class="testi"><div><q>${esc(t.description)}</q><div class="quien">${esc(t.name)} · ${esc(t.role)}</div></div><img src="${img(LOGOS[t.logo])}"></div>` : "");
  const MES = new Date().toLocaleDateString(T.mesLocale, { month: "long", year: "numeric" });
  // /demo solo existe en castellano (Calendly incrustado): sirve para los dos.
  const DEMO = `${WEB}/demo?utm_source=dossier-pdf&utm_medium=pdf&utm_campaign=dossier-${lang}`;
  const PRECIOS_URL = lang === "en" ? "/en/pricing" : "/precios";
  const TOTAL = 4;

  const modulos = MODULOS.map((id) => CATALOGO.find((m) => m.id === id)).filter(Boolean).map((m) => {
    const href = lang === "en" ? HREF_EN[m.id] : m.href;
    return { titulo: (lang === "en" && m.en?.titulo) || m.titulo, resumen: (lang === "en" && m.en?.resumen) || m.resumen, href };
  });

  const cabecera = `<header class="cab">${logo("6.2mm")}<span class="cab-r">${T.etiqueta}</span></header>`;
  const pie = (n) => `<footer class="pie"><a href="${WEB}${lang === "en" ? "/en" : ""}">sttok.com${lang === "en" ? "/en" : ""}</a><span>${n} / ${TOTAL}</span></footer>`;

  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Sttok · ${T.etiqueta}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>
<section class="pag portada">
  <header class="cab">${logo("7mm")}<span class="cab-r">${T.etiqueta}</span></header>
  <h1>${esc(hero.title)}</h1>
  <p class="sub">${esc(hero.description)}</p>
  <div class="brillo"></div>
  <div class="escena"><img src="${img("/animaciones/panel-light-poster.webp")}"></div>
  <div class="base"><span><b>Sttok</b> · ${T.etiqueta}</span><span>${TOTAL} ${T.paginas} · ${esc(MES)}</span></div>
</section>
<section class="pag">
  ${cabecera}
  <div class="eyebrow">${T.modulos}</div>
  <h2>${T.modulosTitulo}</h2>
  <div class="modulos">${modulos
    .map((m) => `<div class="mod"><h3>${m.href ? `<a href="${WEB}${m.href}">${esc(m.titulo)}</a>` : esc(m.titulo)}</h3><p>${esc(m.resumen)}</p></div>`)
    .join("")}</div>
  <div class="empuje"></div>
  <div class="cifras">${cifras.map((c) => `<div><b>${esc(c.value)}</b><span>${esc(c.label)}</span></div>`).join("")}</div>
  ${pie(2)}
</section>
<section class="pag">
  ${cabecera}
  <div class="eyebrow">${T.precios}</div>
  <h2>${T.preciosTitulo}</h2>
  <p class="lede">${esc(precios.hero.description)}</p>
  <table><thead><tr><th>${T.plan}</th><th>${T.hasta}</th><th>${T.incluido}</th><th class="num">${T.precio}</th></tr></thead><tbody>
  ${planes
    .map((p) => `<tr${p.isMostPopular ? ' class="dest"' : ""}><td>${esc(p.name)}</td><td>${esc(p.description.replace(/^(Sociedades de hasta|Companies with up to|Up to)\s*/i, ""))}</td><td>${esc(p.features.join(" · "))}</td><td class="num precio">${euros(p.yearlyPrice, lang)}</td></tr>`)
    .join("")}
  </tbody></table>
  <p class="aclara">${T.sinImpuestos} ${esc(precios.plans.extras)}</p>
  <ul class="incluye">${ancla.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
  <div class="faq">${FAQ.map((i) => precios.faq.items[i]).filter(Boolean).map((q) => `<div><h3>${esc(q.q)}</h3><p>${esc(q.a)}</p></div>`).join("")}</div>
  <p class="enlace"><a href="${WEB}${PRECIOS_URL}">sttok.com${PRECIOS_URL}</a></p>
  <div class="empuje"></div>
  ${testi(testiPrecios)}
  ${pie(3)}
</section>
<section class="pag">
  ${cabecera}
  <div class="eyebrow">${T.seguridad}</div>
  <h2>${esc(integ.header.title)}</h2>
  <div class="segur">${integ.items.map((x) => `<div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></div>`).join("")}</div>
  <div class="sellos">${integ.trust.items.map((x) => `<div><img src="${img(x.logo)}"><span>${esc(x.text)}</span></div>`).join("")}</div>
  <div class="eyebrow segunda">${T.clientes}</div>
  <div class="logos">${CLIENTES.filter((c) => LOGOS[c]).map((c) => `<img src="${img(LOGOS[c])}" alt="${c}">`).join("")}</div>
  ${testi(testiClientes)}
  <div class="empuje"></div>
  <div class="demo"><div class="t">${T.demo}</div><a class="boton" href="${DEMO}">${T.boton} <span>→</span></a></div>
  <p class="nota">${esc(T.nota(MES))}</p>
  ${pie(4)}
</section>
</body></html>`;
  return html;
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
.eyebrow.segunda { margin-top: 8mm; }
.cab { display: flex; justify-content: space-between; align-items: center; padding-bottom: 5mm; border-bottom: 1px solid var(--linea); margin-bottom: 9mm; flex-shrink: 0; }
.cab-r { font-size: 7.5pt; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--gris); }
.pie { display: flex; justify-content: space-between; font-size: 8pt; color: var(--gris); padding-top: 4mm; border-top: 1px solid var(--linea); flex-shrink: 0; margin-top: 6mm; }
h2 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 27pt; line-height: 1.08; letter-spacing: -0.01em; margin: 2.5mm 0 4mm; text-wrap: balance; }
h3 { font-size: 10pt; font-weight: 600; line-height: 1.35; }
.lede { color: var(--gris); font-size: 10.5pt; max-width: 165mm; }

.portada { background: radial-gradient(120% 80% at 85% 0%, #2c3770 0%, #1b2240 46%, #121731 100%); color: #f3efe6; padding: 18mm 18mm 14mm; }
.portada .cab { border-color: rgba(214,196,154,.35); position: relative; }
.portada .cab-r { color: var(--champan); }
.portada h1 { position: relative; font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 40pt; line-height: 1.04; letter-spacing: -0.018em; margin-top: 18mm; max-width: 165mm; text-wrap: balance; }
.portada .sub { position: relative; font-size: 11.5pt; line-height: 1.5; color: rgba(243,239,230,.72); margin-top: 7mm; max-width: 150mm; }
.portada .brillo { position: absolute; width: 230mm; height: 160mm; right: -80mm; top: 125mm; background: radial-gradient(closest-side, rgba(102,128,255,.34), rgba(102,128,255,0)); }
.portada .escena { position: absolute; left: 30mm; right: 0; top: 148mm; height: 115mm; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent 100%); mask-image: linear-gradient(to bottom, #000 62%, transparent 100%); }
.portada .escena img { width: 205mm; display: block; border-radius: 7px 0 0 0; }
.portada .base { position: absolute; left: 18mm; right: 18mm; bottom: 14mm; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; padding-top: 4mm; border-top: 1px solid rgba(214,196,154,.35); color: rgba(243,239,230,.85); }
.portada .base b { font-weight: 600; color: var(--champan); }

.modulos { display: grid; grid-template-columns: 1fr 1fr; gap: 0 9mm; margin-top: 4mm; }
.mod { padding: 3.2mm 0 3.4mm; border-top: 1px solid var(--linea); }
.mod p { font-size: 9pt; color: var(--gris); line-height: 1.45; margin-top: .8mm; }
.cifras { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; background: var(--navy); color: #f1eee8; padding: 6mm; border-radius: 6px; flex-shrink: 0; }
.cifras b { display: block; font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 22pt; line-height: 1; margin-bottom: 1.5mm; }
.cifras span { display: block; font-size: 7.5pt; line-height: 1.35; color: rgba(241,238,232,.7); }

table { width: 100%; border-collapse: collapse; margin-top: 5mm; }
th { text-align: left; font-size: 7.2pt; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--gris); padding: 0 3mm 2mm 0; border-bottom: 1.5px solid var(--tinta); }
td { vertical-align: top; padding: 3mm 3mm 3mm 0; border-bottom: 1px solid var(--linea); font-size: 9pt; line-height: 1.45; }
td:first-child { font-weight: 600; width: 22mm; }
td:nth-child(2) { width: 42mm; color: var(--gris); }
td:nth-child(3) { color: var(--gris); font-size: 8.4pt; }
.num { text-align: right; padding-right: 0; white-space: nowrap; }
td.precio { font-family: 'Instrument Serif', serif; font-size: 17pt; line-height: 1; }
td:first-child, th:first-child { padding-left: 3mm; }
tr.dest td { background: #fff; }
tr.dest td:first-child { box-shadow: inset 2px 0 0 var(--navy); }
.aclara { font-size: 8.5pt; color: var(--gris); margin-top: 3mm; }
.incluye { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 9mm; margin-top: 5mm; }
.incluye li { font-size: 9.5pt; padding-left: 5mm; position: relative; }
.incluye li::before { content: '✓'; position: absolute; left: 0; color: var(--brand); font-weight: 700; }
.faq { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; margin-top: 6mm; }
.faq > div { border-top: 2px solid var(--navy); padding-top: 3.5mm; }
.faq p { font-size: 9pt; color: var(--gris); margin-top: 1.5mm; line-height: 1.5; }
.enlace { font-size: 8.5pt; color: var(--gris); text-decoration: underline; margin-top: 4mm; }

.segur { display: grid; grid-template-columns: 1fr 1fr; gap: 0 9mm; margin-top: 2mm; }
.segur > div { padding: 3mm 0; border-top: 1px solid var(--linea); }
.segur p { font-size: 9pt; color: var(--gris); margin-top: .8mm; line-height: 1.45; }
.sellos { display: flex; gap: 8mm; margin-top: 5mm; align-items: center; }
.sellos div { display: flex; align-items: center; gap: 2.5mm; font-size: 8.5pt; color: var(--gris); }
.sellos img { height: 9mm; width: auto; }
.logos { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5mm 6mm; align-items: center; justify-items: center; margin-top: 5mm; padding: 5mm 4mm; background: #fff; border-radius: 6px; }
.logos img { max-height: 8mm; max-width: 26mm; object-fit: contain; filter: grayscale(1); opacity: .85; }
.testi { display: grid; grid-template-columns: 1fr auto; gap: 6mm; align-items: center; margin-top: 5mm; padding: 4.5mm 6mm; background: #fff; border-radius: 6px; }
.testi q { font-family: 'Instrument Serif', serif; font-size: 12.5pt; line-height: 1.25; quotes: '«' '»'; }
html[lang=en] .testi q { quotes: '“' '”'; }
.testi .quien { font-size: 8.5pt; color: var(--gris); margin-top: 2mm; }
.testi img { height: 8mm; max-width: 36mm; object-fit: contain; filter: grayscale(1); }
.demo { background: var(--navy2); color: #f1eee8; border-radius: 6px; padding: 5.5mm 7mm; display: flex; justify-content: space-between; align-items: center; gap: 6mm; flex-shrink: 0; }
.demo .t { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 16pt; line-height: 1.15; }
.demo .boton { display: inline-flex; align-items: center; gap: 2mm; padding: 2.4mm 5mm; border-radius: 999px; background: #f3efe6; color: var(--navy); font-weight: 600; font-size: 9.5pt; white-space: nowrap; }
.demo .boton span { color: var(--brand); }
.nota { font-size: 7.5pt; color: var(--gris); padding: 4mm 0 0; flex-shrink: 0; }
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
  const idiomas = solo ? [solo] : ["es", "en"];
  if (idiomas.some((l) => !TXT[l])) throw new Error("Idioma: es o en");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dossier-"));
  const browser = await chromium.launch({ executablePath: chrome(), headless: true, args: ["--allow-file-access-from-files"] });
  let malos = 0;
  for (const lang of idiomas) {
    const htmlPath = path.join(tmp, `dossier-${lang}.html`);
    fs.writeFileSync(htmlPath, construir(lang));
    const page = await browser.newPage();
    await page.goto("file:///" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Ninguna página puede desbordar: si no cabe, el dossier falla.
    const fallos = await page.evaluate(() =>
      [...document.querySelectorAll(".pag")].map((p, i) => ({ pag: i + 1, sobra: p.scrollHeight - p.clientHeight })).filter((x) => x.sobra > 0));
    const out = path.join(SALIDA, `sttok-dossier-${lang}.pdf`);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    if (process.env.FOTOS) {
      const ps = await page.$$(".pag");
      for (let i = 0; i < ps.length; i++) await ps[i].screenshot({ path: path.join(process.env.FOTOS, `dossier-${lang}-p${i + 1}.png`) });
    }
    await page.close();
    if (fallos.length) malos++;
    console.log(`${fallos.length ? "✗" : "✓"} dossier ${lang}: ${(fs.statSync(out).size / 1024).toFixed(0)} KB` + (fallos.length ? ` · NO CABE ${JSON.stringify(fallos)}` : ""));
  }
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  if (malos) process.exit(1);
})();
