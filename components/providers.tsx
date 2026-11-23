"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nextProvider } from "react-i18next";

import { CalendlyPopup } from "@/components/calendly-popup";
import { CookieConsent } from "@/components/cookie-consent";
import { TemaImagenes } from "@/components/tema-imagenes";

import { getI18n, type Textos } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { MenuProvider } from "@/components/contexts/MenuContext";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Providers cliente del shell. Recibe el locale resuelto en servidor y monta
 * la instancia i18n de ese idioma (fija, ver lib/i18n). El idioma no se
 * detecta en cliente: viene de la URL, decidido por el layout raíz.
 */
export default function Providers({
  locale,
  textos,
  children,
}: {
  locale: Locale;
  textos: Textos;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      // Sigue el modo del sistema del visitante; el interruptor del pie lo
      // cambia y la elección se recuerda.
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nextProvider i18n={getI18n(locale, textos)}>
        {/* Antes que la página: es lo primero que se alcanza con el teclado. */}
        <CookieConsent gaId="G-LWNDHYBY2N" />
        <CalendlyPopup />
        <TemaImagenes />
        <MenuProvider>{children}</MenuProvider>
      </I18nextProvider>

      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  );
}
