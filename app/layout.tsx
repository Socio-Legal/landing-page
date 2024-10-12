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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
// export const metadata: Metadata = {
//   title: "Sttok",
//   description: "Software para Gestión de Sociedades",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
