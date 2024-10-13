"use client";

import { I18nextProvider } from "react-i18next";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { MenuProvider } from "@/components/contexts/MenuContext";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import i18n from "@/lib/i18n";

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng");
    if (storedLang && i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
    setMounted(true);
  }, []);

  // Re-render on pathname change to ensure correct language
  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng");
    if (storedLang && i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [pathname]);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <GoogleTagManager gtmId="G-LWNDHYBY2N" />

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
