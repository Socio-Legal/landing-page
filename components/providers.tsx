"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nextProvider } from "react-i18next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { getI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Toaster } from "@/components/ui/sonner";
import { MenuProvider } from "@/components/contexts/MenuContext";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Providers cliente del shell. Recibe el locale resuelto en servidor y monta
 * la instancia i18n de ese idioma (fija, ver lib/i18n). El idioma no se
 * detecta en cliente: viene de la URL, decidido por el layout raíz.
 */
export default function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <GoogleAnalytics gaId="G-LWNDHYBY2N" />

      <I18nextProvider i18n={getI18n(locale)}>
        <MenuProvider>{children}</MenuProvider>
      </I18nextProvider>

      <SpeedInsights />
      <Analytics />
      <Toaster />
    </ThemeProvider>
  );
}
