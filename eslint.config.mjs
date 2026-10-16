import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

// Flat config de ESLint 9. `next lint` desaparece en Next 16; las reglas son
// las mismas que daba .eslintrc.json (next/core-web-vitals), traducidas con
// FlatCompat.
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals"),
];
