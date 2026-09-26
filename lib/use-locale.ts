"use client";

import { usePathname } from "next/navigation";

import { localeFromPathname, type Locale } from "./locales";

/** Locale activo derivado de la URL. La regla vive en lib/locales. */
export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}
