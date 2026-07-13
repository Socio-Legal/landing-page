"use client";

import Link from "next/link";
import Image from "next/image";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

import { Icons } from "./icons";
import { siteConfig } from "@/config/site-config";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";
import { localizedHref } from "@/lib/localized-href";
import { useLocale } from "@/lib/use-locale";

const FooterIcons = {
  LinkedIn: <LinkedInLogoIcon className="h-5 w-5" />,
};

export function SiteFooter() {
  const { t } = useTranslation("common");
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-background">
      {/* Main footer columns */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href={localizedHref("/", locale)} title="Sttok">
              <Icons.logo className="h-[24px] w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-[200px]">
              {t("sttokTitle")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-1">
              {siteConfig.footer.social.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  {FooterIcons[social.icon as keyof typeof FooterIcons]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {siteConfig.footer.menu.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3">
              {column.map((link) =>
                link.isHeader ? (
                  <p
                    key={link.id}
                    className="text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    {t(link.title)}
                  </p>
                ) : (
                  <Link
                    key={link.id}
                    href={link.url ? localizedHref(link.url, locale) : "#"}
                    title={link.alt}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.title)}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Security logos */}
          <div className="flex items-center gap-4 flex-wrap">
            {siteConfig.footer.logos.map((logo, i) => (
              <div key={i} className="relative h-8 w-20">
                <Image
                  src={logo}
                  alt="Certificado de seguridad"
                  fill
                  style={{ objectFit: "contain" }}
                  className="opacity-70"
                />
              </div>
            ))}
          </div>

          {/* Right side: copyright + language */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {t("allRightsReserved")}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
