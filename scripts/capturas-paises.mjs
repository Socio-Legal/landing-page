// Genera las capturas del libro de una sociedad de demostracion por pais
// (content/jurisdicciones/*.mdx) con el mismo aspecto que
// public/funcionalidades/numeracion-por-rangos-*.png (2480 x 1320, claro y
// oscuro), renderizando una maqueta HTML con Chrome sin ventana.
//
//   node scripts/capturas-paises.mjs public/funcionalidades
//
// Necesita Chrome instalado. Los datos son ficticios; los rangos son los de
// la captura espanola para que el reparto cuadre.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

// Los HTML intermedios y el perfil de Chrome van a un temporal, no al repo.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "capturas-paises-"));
const DESTINO = process.argv[2] || "public/funcionalidades";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const PAISES = {
  colombia: {
    empresa: "AGROINDUSTRIAL DEL VALLE S.A.S.",
    libro: "Libro de Registro de Accionistas",
    idLabel: "Identificación",
    nac: "Colombiana",
    unidad: "Acciones",
    clases: ["Ordinaria", "Privilegiada"],
    fmt: "es",
    filas: [
      ["Inversiones Valle del Cauca S.A.S.", "NIT 900.123.456-7", "Calle 10 # 4-20, Cali, Valle del Cauca, 760001, Colombia"],
      ["María Fernanda Restrepo Gómez", "C.C. 31.456.789", "Carrera 5 # 12-30, Cali, Valle del Cauca, 760044, Colombia"],
      ["Andrés Felipe Cardona Ríos", "C.C. 16.789.012", "Avenida 6N # 25-40, Cali, Valle del Cauca, 760046, Colombia"],
      ["Juliana Ospina Vélez", "C.C. 29.345.678", "-"],
      ["Santiago Mejía Londoño", "C.C. 94.567.890", "-"],
    ],
  },
  mexico: {
    empresa: "GRUPO INDUSTRIAL DEL BAJÍO, S.A. DE C.V.",
    libro: "Libro de Registro de Acciones",
    idLabel: "RFC",
    nac: "Mexicana",
    unidad: "Acciones",
    clases: ["Serie A", "Serie B"],
    fmt: "mx",
    filas: [
      ["Inversiones Bajío, S.A. de C.V.", "IBA150312AB1", "Av. Insurgentes Sur 1234, Col. Del Valle, Ciudad de México, 03100, México"],
      ["María Fernanda Reyes Lozano", "RELM800101XY2", "Blvd. Adolfo López Mateos 500, León, Guanajuato, 37000, México"],
      ["Andrés Castañeda Ruiz", "CARA750615MN3", "Calle Hidalgo 48, Querétaro, Querétaro, 76000, México"],
      ["Juliana Ortiz Navarro", "OINJ820920QR4", "-"],
      ["Santiago Mejía Lara", "MELS900305ST5", "-"],
    ],
  },
  chile: {
    empresa: "INVERSIONES ANDES AUSTRAL SpA",
    libro: "Registro de Accionistas",
    idLabel: "RUT",
    nac: "Chilena",
    unidad: "Acciones",
    clases: ["Serie A", "Serie B"],
    fmt: "es",
    filas: [
      ["Inversiones Cordillera SpA", "76.123.456-7", "Av. Apoquindo 3000, of. 1201, Las Condes, Santiago, Chile"],
      ["María Fernanda Rojas Sepúlveda", "12.345.678-9", "Av. Providencia 1208, Providencia, Santiago, Chile"],
      ["Andrés Fuentes Carrasco", "15.678.901-2", "Los Leones 220, Providencia, Santiago, Chile"],
      ["Juliana Pizarro Muñoz", "17.890.123-4", "-"],
      ["Santiago Mejías Toledo", "19.012.345-6", "-"],
    ],
  },
};

// Mismos rangos y cifras que la captura española, para que el reparto cuadre.
const DATOS = [
  { n: 6380, pct: 53.16667, rangos: [[1, 4004, 0], [4005, 4098, 0], [4269, 4343, 0], [4344, 4392, 0], [4404, 4478, 0], [5127, 5854, 0], [6002, 6156, 0], [10001, 11200, 1]] },
  { n: 4391, pct: 36.59167, rangos: [[5855, 6001, 0], [6157, 10000, 0], [11601, 12000, 1]] },
  { n: 889, pct: 7.40833, rangos: [[4479, 4887, 0], [4893, 4972, 0], [11201, 11600, 1]] },
  { n: 181, pct: 1.50833, rangos: [[4099, 4268, 0], [4393, 4403, 0]], carga: "Prenda" },
  { n: 159, pct: 1.325, rangos: [[4888, 4892, 0], [4973, 5126, 0]] },
];

const num = (v, fmt) => (fmt === "mx" ? v.toLocaleString("en-US") : v.toLocaleString("de-DE"));
const pct = (v, fmt) => (fmt === "mx" ? v.toFixed(5) : v.toFixed(5).replace(".", ",")) + "%";

function html(pais, tema) {
  const p = PAISES[pais];
  const oscuro = tema === "dark";
  const c = oscuro
    ? { bg: "#111827", cab: "#1a2332", alt: "#1a2332", txt: "#cbd5e1", tit: "#e5e7eb", borde: "#1f2937", th: "#e5e7eb", btnTxt: "#e5e7eb", btnBorde: "#374151" }
    : { bg: "#ffffff", cab: "#f7f8fa", alt: "#f3f5f8", txt: "#4a5568", tit: "#2d3748", borde: "#e5e7eb", th: "#2d3748", btnTxt: "#2d3748", btnBorde: "#d1d5db" };
  const filas = p.filas
    .map((f, i) => {
      const d = DATOS[i];
      const rangos = d.rangos
        .map(([a, b, k]) => `${num(a, p.fmt)}-${num(b, p.fmt)} <span class="clase">(${p.clases[k]})</span>`)
        .join("<br>");
      return `<tr>
        <td class="nombre">${f[0]}</td>
        <td class="alt c">${f[1]}</td>
        <td class="c">${f[2] === "-" && i === 4 ? "-" : p.nac}</td>
        <td class="alt c">${f[2]}</td>
        <td class="c">${num(d.n, p.fmt)}</td>
        <td class="alt c">${pct(d.pct, p.fmt)}</td>
        <td class="num">${rangos}</td>
        <td class="carga">${d.carga ? `<a>${d.carga}</a>` : ""}</td>
      </tr>`;
    })
    .join("\n");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;background:${c.bg};}
    body{width:1240px;height:660px;overflow:hidden;font-family:Inter,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:${c.txt};-webkit-font-smoothing:antialiased;}
    .top{display:flex;justify-content:space-between;align-items:flex-start;padding:22px 24px 16px;}
    h1{margin:0;font-size:22px;line-height:30px;font-weight:700;color:${c.tit};letter-spacing:-0.01em;}
    h1 small{display:block;font-size:22px;font-weight:700;}
    .btns{display:flex;gap:12px;margin-top:10px;}
    .btn{height:34px;padding:0 20px;border-radius:5px;font-size:14px;font-weight:600;display:flex;align-items:center;border:1px solid ${c.btnBorde};color:${c.btnTxt};background:transparent;}
    .btn.azul{background:#1a8cff;border-color:#1a8cff;color:#fff;}
    .btn.linea{border-color:#1a8cff;color:#1a8cff;}
    .caret{font-size:9px;margin-left:8px;}
    table{width:1192px;margin:0 24px;border-collapse:separate;border-spacing:0;border:1px solid ${c.borde};border-radius:4px;font-size:13px;line-height:19px;}
    th{background:${c.cab};color:${c.th};font-weight:600;padding:11px 10px;white-space:nowrap;text-align:center;border-bottom:1px solid ${c.borde};}
    td{padding:11px 10px;vertical-align:top;border-bottom:1px solid ${c.borde};}
    tr:last-child td{border-bottom:0;}
    td.alt{background:${c.alt};}
    td.c{text-align:center;}
    td.nombre{color:${c.tit};}
    td.num{text-align:right;white-space:nowrap;}
    .clase{color:${oscuro ? "#9ca3af" : "#6b7280"};}
    td.carga a{color:#1a8cff;font-weight:500;}
  </style></head><body>
  <div class="top">
    <h1>${p.empresa}<small>${p.libro}</small></h1>
    <div class="btns">
      <span class="btn">← Volver</span>
      <span class="btn azul">Descargar Tabla</span>
      <span class="btn linea">Vista<span class="caret">▼</span></span>
      <span class="btn azul">Añadir Operación<span class="caret">▼</span></span>
    </div>
  </div>
  <table>
    <thead><tr><th>Nombre</th><th>${p.idLabel}</th><th>Nacionalidad</th><th>Domicilio Social</th><th>${p.unidad}</th><th>% Participación</th><th>Numeración (Clase)</th><th>Carga</th></tr></thead>
    <tbody>${filas}</tbody>
  </table>
  </body></html>`;
}

fs.mkdirSync(DESTINO, { recursive: true });
for (const pais of Object.keys(PAISES)) {
  for (const tema of ["light", "dark"]) {
    const archivo = path.join(TMP, `${pais}-${tema}.html`);
    fs.writeFileSync(archivo, html(pais, tema));
    const salida = path.join(DESTINO, `libro-${pais}-${tema}.png`);
    execFileSync(CHROME, [
      "--headless=new", "--hide-scrollbars", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
      `--user-data-dir=${path.join(TMP, "perfil")}`,
      "--window-size=1240,660", "--force-device-scale-factor=2",
      `--screenshot=${salida}`, `file:///${archivo.replace(/\\/g, "/")}`,
    ], { stdio: "ignore", timeout: 60000 });
    console.log("ok", salida);
  }
}
