#!/usr/bin/env node
/**
 * Escribe lib/animaciones-version.json: una huella del contenido de cada
 * animación de public/animaciones, que VideoTema añade a sus URL (?v=…).
 *
 * Las animaciones se cachean un día en el navegador y una semana más mientras
 * se revalidan (next.config.mjs), y next/image guarda su versión optimizada del
 * póster por URL. Sin la huella, un vídeo regrabado con el mismo nombre seguía
 * saliendo viejo durante días. Con ella, cambiar el archivo cambia la URL.
 *
 * Una animación es el grupo <base>-<light|dark>[-m].<webm|mp4> y
 * <base>-<light|dark>-poster.webp; la clave es <base> relativa a la carpeta
 * (`accionistas`, `en/accionistas`). Va dentro de `pnpm build`, así que lo
 * desplegado nunca lleva una huella atrasada; el JSON se versiona para que
 * `next dev` funcione sin compilar antes.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const RAIZ = join(process.cwd(), "public", "animaciones");
const SALIDA = join(process.cwd(), "lib", "animaciones-version.json");
const PIEZA = /^(.+)-(light|dark)(?:-m\.(?:webm|mp4)|\.(?:webm|mp4)|-poster\.webp)$/;

const archivos = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? archivos(join(dir, e.name)) : [join(dir, e.name)],
  );

const grupos = new Map();
for (const ruta of archivos(RAIZ)) {
  const rel = relative(RAIZ, ruta).split(sep).join("/");
  const m = rel.match(PIEZA);
  if (!m) continue;
  if (!grupos.has(m[1])) grupos.set(m[1], []);
  grupos.get(m[1]).push(rel);
}

const version = {};
for (const base of [...grupos.keys()].sort()) {
  const h = createHash("sha1");
  for (const rel of grupos.get(base).sort()) {
    h.update(rel);
    h.update(readFileSync(join(RAIZ, rel)));
  }
  version[base] = h.digest("hex").slice(0, 8);
}

writeFileSync(SALIDA, JSON.stringify(version, null, 2) + "\n");
console.log(`animaciones-version: ${Object.keys(version).length} animaciones`);
