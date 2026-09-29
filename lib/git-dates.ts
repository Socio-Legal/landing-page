import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Fecha del ultimo commit que toco un archivo, para el `lastmod` del sitemap.
 *
 * Devuelve null cuando la fecha no es fiable, y el sitemap omite entonces el
 * `lastmod` de esa entrada. Omitirlo es honesto; inventarlo no lo es.
 *
 * Casos en que no es fiable:
 *  - No hay git disponible, o el archivo no esta commiteado.
 *  - CLON SUPERFICIAL. Vercel clona el repositorio con historia limitada. En un
 *    clon asi, el commit mas antiguo que se descargo (la "frontera") aparenta
 *    contener TODOS los archivos, de modo que `git log -- archivo` devuelve su
 *    fecha para cualquier archivo que no se tocara dentro de esa ventana: la
 *    misma fecha falsa para todos. Esos commits se listan en .git/shallow y se
 *    descartan.
 *
 * Se ejecuta en build (el sitemap es estatico), nunca por peticion.
 */

const cache = new Map<string, Date | null>();

function git(args: string[]): string | null {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

let frontera: Set<string> | null = null;

/** Commits frontera de un clon superficial. Vacio en un clon completo. */
function commitsFrontera(): Set<string> {
  if (frontera) return frontera;
  // --git-common-dir y no --git-dir: en un worktree, .git/shallow vive en el
  // directorio comun, no en el del worktree.
  const dir = git(["rev-parse", "--git-common-dir"]);
  const archivo = dir ? path.join(path.resolve(dir), "shallow") : null;
  frontera = new Set(
    archivo && fs.existsSync(archivo)
      ? fs.readFileSync(archivo, "utf8").split(/\s+/).filter(Boolean)
      : [],
  );
  return frontera;
}

/** `archivo` es relativo a la raiz del repositorio. */
export function lastCommitDate(archivo: string): Date | null {
  if (cache.has(archivo)) return cache.get(archivo)!;

  let fecha: Date | null = null;
  const salida = git(["log", "-1", "--format=%H %cI", "--", archivo]);
  if (salida) {
    const [hash, iso] = salida.split(" ");
    if (hash && iso && !commitsFrontera().has(hash)) {
      const d = new Date(iso);
      if (!Number.isNaN(d.getTime())) fecha = d;
    }
  }

  cache.set(archivo, fecha);
  return fecha;
}
