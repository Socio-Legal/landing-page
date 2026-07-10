"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { trackDemoClick, trackMeetingClick } from "@/lib/analytics";

export default function HeroSection() {
  const { t } = useTranslation(["common", "home-hero-section"]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />

      <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm animate-fade-in opacity-0 [--animation-delay:0ms]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {t("home-hero-section:hero.badge")}
            </div>

            <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-foreground text-balance sm:text-5xl md:text-[54px] animate-fade-in opacity-0 [--animation-delay:100ms]">
              {t("home-hero-section:hero.title")}
            </h1>

            <p className="text-base leading-relaxed text-muted-foreground text-balance animate-fade-in opacity-0 [--animation-delay:200ms]">
              {t("home-hero-section:hero.description")}
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in opacity-0 [--animation-delay:300ms]">
              <Link
                href={t("home-hero-section:hero.button.link")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMeetingClick("hero-primary")}
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                {t("home-hero-section:hero.button.text")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href={t("home-hero-section:hero.secondaryButton.link")}
                onClick={() => trackDemoClick("hero-secondary")}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                {t("home-hero-section:hero.secondaryButton.text")}
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-2 animate-fade-in opacity-0 [--animation-delay:400ms]">
              {[
                "/logo-iso-27001.png",
                "/logo-gdpr-compliant.png",
                "/logo-ssl.png",
              ].map((src) => (
                <div key={src} className="relative h-8 w-20">
                  <Image
                    src={src}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    className="opacity-60 dark:brightness-0 dark:invert dark:opacity-40"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up opacity-0 [--animation-delay:200ms]">
            <div className="relative rounded-xl border border-border bg-card shadow-xl overflow-hidden">
              <Image
                src="/hero/hero-dark.png"
                alt="Sttok, panel de gestión de sociedades"
                width={900}
                height={560}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="w-full h-auto hidden dark:block"
                style={{ borderRadius: "inherit" }}
              />
              <Image
                src="/hero/hero-light.png"
                alt="Sttok, panel de gestión de sociedades"
                width={900}
                height={560}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="w-full h-auto block dark:hidden"
                style={{ borderRadius: "inherit" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
