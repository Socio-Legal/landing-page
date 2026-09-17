import { headers } from "next/headers";
import Script from "next/script";
import { Inter as FontSans, Instrument_Serif as FontSerif } from "next/font/google";

import { cn } from "@/lib/utils";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";
import { breadcrumbJsonLd } from "@/lib/breadcrumbs";
import JsonLd from "@/components/shared/json-ld";
import Providers from "@/components/providers";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // El locale lo resuelve el middleware por la URL y lo deja en x-locale.
  // Así el HTML del servidor emite el <html lang> correcto en cada idioma.
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as Locale) || DEFAULT_LOCALE;

  // El middleware deja en x-pathname la ruta PUBLICA (corre antes de los
  // rewrites de next.config), asi que /libro-de-socios llega tal cual y no
  // como /partners-book. De ahi salen las migas de esta pagina.
  const breadcrumb = breadcrumbJsonLd(
    headersList.get("x-pathname") || "/",
    locale,
  );

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Scripts de terceros vía next/script: se inyectan tras la
            hidratación y no provocan mismatches con el HTML del servidor */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="7f81f189-cd77-4a4b-9728-d58e81f20737"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />
        <Script id="cookiebot-onload" strategy="afterInteractive">
          {`window.addEventListener('CookiebotOnLoad', function () {
            console.log('CookieBot loaded');
          });`}
        </Script>
        {/* Datos estructurados de la organización (SEO/GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sttok",
              // Datos de identidad tomados del aviso legal y de la politica de
              // privacidad del propio sitio (public/locales/es/legal-*.json).
              legalName: "Sttok Barcelona, S.L.",
              taxID: "B10601268",
              url: "https://www.sttok.com",
              logo: "https://www.sttok.com/logo-sttok.png",
              description:
                "Software de gestión de sociedades: captable, libro de socios, planes de incentivos, juntas y consejos, simulador y mercado secundario.",
              email: "info@sttok.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Ausias Marc, 7, 3ª planta",
                postalCode: "08010",
                addressLocality: "Barcelona",
                addressRegion: "Barcelona",
                addressCountry: "ES",
              },
              // Unico perfil oficial enlazado desde las propiedades de Sttok
              // (sttok.com y blog.sttok.com). No se añaden otros sin confirmar.
              sameAs: ["https://www.linkedin.com/company/sttok/"],
            }),
          }}
        />
        {/* Migas de la pagina actual. No se emite en la home ni en rutas sin
            jerarquia conocida (breadcrumbJsonLd devuelve null). */}
        {breadcrumb && <JsonLd data={breadcrumb} />}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
