#!/usr/bin/env node
/**
 * Completa la historia de git antes del build si el clon es superficial.
 *
 * Vercel clona con `git clone --depth=10`. Con solo 10 commits, la fecha del
 * ultimo commit de cada archivo de content/ —que es el `lastmod` del sitemap—
 * no se puede saber para los archivos que no se tocaron en esa ventana
 * (lib/git-dates los descarta en vez de inventarlos). Traer la historia
 * completa lo resuelve.
 *
 * Es un intento, no un requisito: si no hay git, no hay remoto o la red falla,
 * se avisa y el build sigue. En el peor caso el sitemap sale sin `lastmod` en
 * esas entradas, que es correcto. Nunca sale con codigo distinto de 0.
 */
import { execFileSync } from "node:child_process";

const git = (args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

const esSuperficial = () => git(["rev-parse", "--is-shallow-repository"]) === "true";

try {
  if (!esSuperficial()) {
    console.log("ensure-git-history: clon completo, nada que hacer");
  } else {
    git(["fetch", "--unshallow", "--quiet"]);
    // Se comprueba el resultado en vez de fiarse del codigo de salida: sin
    // remoto configurado, `git fetch` sale con 0 sin haber traido nada.
    if (esSuperficial()) throw new Error("el clon sigue siendo superficial tras el fetch");
    console.log("ensure-git-history: historia completada (el clon era superficial)");
  }
} catch (e) {
  const motivo = String(e?.stderr || e?.message || e).split("\n")[0];
  console.warn(`ensure-git-history: no se pudo completar la historia (${motivo}).`);
  console.warn("ensure-git-history: el sitemap omitira el lastmod que no pueda verificar.");
}
