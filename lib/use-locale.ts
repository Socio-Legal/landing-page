"use client";

import { usePathname } from "next/navigation";

import type { Locale } from "./locales";

/** Locale activo derivado de la URL (inglés bajo /en, español en la raíz). */
export function useLocale(): Locale {
  const pathname = usePathname();
  return pathname === "/en" || pathname?.startsWith("/en/") ? "en" : "es";
}
