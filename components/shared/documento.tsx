import { Inter as FontSans, Instrument_Serif as FontSerif } from "next/font/google";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locales";
import { CONSENT_COOKIE } from "@/lib/cookie-consent";

import "@/app/globals.css";

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

/**
 * <html> completo de una página: lo comparten los dos layouts raíz,
 * app/(es)/layout.tsx (castellano, en la raíz) y app/[locale]/layout.tsx
 * (idiomas con prefijo). El idioma lo da la ruta, no la petición: sin
 * headers() ni cookies() el sitio se genera estático (SSG) y la CDN lo sirve.
 * Las migas (BreadcrumbList) las emite cada página con <Migas>. Los
 * proveedores (i18n, tema, cookies) los pone cada layout raíz con los textos
 * de su idioma: si los importara este archivo, común a los dos, cada página
 * cargaría los textos de los dos idiomas.
 */
export default function Documento({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      {/* App Router: el <head> del layout raíz es el del documento. La regla
          es para pages/; aquí lo pinta un componente del layout raíz. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Consent Mode de Google en «denied» antes de cualquier etiqueta:
            sin consentimiento, Google Analytics y Google Ads no instalan
            cookies. components/cookie-consent.tsx lo actualiza con la
            decisión del visitante en el banner de cookies propio. */}
        {/* En línea y síncrono: corre antes que cualquier otro script. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function () { window.dataLayer.push(arguments); };
          window.gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });`,
          }}
        />
        {/* El banner de cookies sale en el HTML (es estático) y se pinta con
            la página, sin esperar a que cargue el JavaScript. Si ya hay
            decisión guardada, esta clase lo oculta antes del primer pintado. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(document.cookie.indexOf(${JSON.stringify(CONSENT_COOKIE + "=")})>-1)document.documentElement.classList.add("consentimiento-dado")}catch(e){}`,
          }}
        />
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
                locale === "en"
                  ? "Corporate governance software for companies and groups: shareholder register and cap table, general meetings and board with communications and e-signature, incentive plans and secondary market."
                  : "Software de gestión societaria para empresas y grupos: libro de socios y captable, juntas y consejos con comunicaciones y firma electrónica, planes de incentivos y mercado secundario.",
              email: "hola@sttok.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Ausias Marc, 7, 3ª planta",
                postalCode: "08010",
                addressLocality: "Barcelona",
                addressRegion: "Barcelona",
                addressCountry: "ES",
              },
              // Unico perfil oficial enlazado desde las propiedades de Sttok
              // (sttok.com). No se añaden otros sin confirmar.
              sameAs: ["https://www.linkedin.com/company/sttok/"],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        {/* children llega ya envuelto en el proveedor de su idioma
            (ProvidersES / ProvidersEN), que pone cada layout raíz. */}
        {children}
      </body>
    </html>
  );
}
