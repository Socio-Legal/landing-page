"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
import { Icons } from "@/components/icons";
import Drawer from "@/components/drawer";
import Menu from "@/components/menu";
import { cn } from "@/lib/utils";

import ThemeToggler from "./ui/theme-toggler";
import LanguageSwitcher from "./language-switcher";
import { useTranslation } from "react-i18next";
import { trackDemoClick, trackLoginClick } from "@/lib/analytics";
import { localizedHref } from "@/lib/localized-href";
import { useLocale } from "@/lib/use-locale";

export function SiteHeader() {
  const { t } = useTranslation("common");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm transition-shadow duration-200",
        scrolled ? "shadow-sm border-b border-border" : "border-b border-transparent"
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href={localizedHref("/", locale)}
          title="Sttok"
          className="flex items-center shrink-0 mr-8"
        >
          <Icons.logo className="h-[26px] w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center flex-1">
          <nav className="flex-1">
            <Menu />
          </nav>

          <div className="flex items-center gap-1.5">
            {siteConfig.cta?.map((cta, index) => (
              <Link
                key={index}
                href={cta.link}
                target={cta.blankPage ? "_blank" : undefined}
                rel={cta.blankPage ? "noopener noreferrer" : undefined}
                onClick={() => cta.variant === "default" ? trackDemoClick("nav") : trackLoginClick()}
                className={cn(
                  buttonVariants({
                    variant: cta.variant as any,
                    size: "sm",
                  }),
                  cta.variant === "default" && "bg-foreground text-background hover:bg-foreground/90",
                  cta.variant === "ghost" && "text-foreground/70 hover:text-foreground hover:bg-accent",
                )}
              >
                {t(cta.text)}
              </Link>
            ))}

            <div className="ml-1 flex items-center gap-1">
              <ThemeToggler />
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="block lg:hidden">
          <Drawer />
        </div>
      </div>
    </header>
  );
}
