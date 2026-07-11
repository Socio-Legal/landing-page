"use client";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nextProvider } from "react-i18next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter as FontSans, Instrument_Serif as FontSerif } from "next/font/google";

import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { MenuProvider } from "@/components/contexts/MenuContext";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { useEffect } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // El idioma guardado se aplica al montar y al navegar. No se bloquea el
  // render inicial: el HTML del servidor debe llegar completo a buscadores
  // y crawlers de IA (SEO/GEO); el peor caso es un cambio breve de idioma.
  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng");
    if (storedLang && i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [pathname]);

  return (
    <html lang={i18n.language} suppressHydrationWarning>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <GoogleAnalytics gaId="G-LWNDHYBY2N" />

          <I18nextProvider i18n={i18n}>
            <MenuProvider>{children}</MenuProvider>
          </I18nextProvider>

          <SpeedInsights />
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
