import { headers } from "next/headers";
import Script from "next/script";
import { Inter as FontSans, Instrument_Serif as FontSerif } from "next/font/google";

import { cn } from "@/lib/utils";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";
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
        {/* Mandrill/Mailchimp verification */}
        <Script id="mcjs" strategy="afterInteractive">
          {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/1b100214ec0aaa7263e586908/efe92693beb44845bba2751c7.js");`}
        </Script>
        {/* Datos estructurados de la organización (SEO/GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sttok",
              url: "https://www.sttok.com",
              logo: "https://www.sttok.com/android-chrome-512x512.png",
              description:
                "Software de gestión de sociedades: captable, libro de socios, planes de incentivos, juntas y consejos, simulador y mercado secundario.",
              email: "info@sttok.com",
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
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
