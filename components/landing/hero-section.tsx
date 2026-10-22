"use client";

import Link from "next/link";
import Image from "next/image";
import VideoTema from "@/components/shared/video-tema";
import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { trackDemoClick, trackMeetingClick } from "@/lib/analytics";

export default function HeroSection() {
  const { t } = useTranslation(["common", "home-hero-section"]);

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground animate-fade-in opacity-0 [--animation-delay:0ms]">
              {t("home-hero-section:hero.badge")}
            </p>

            {/* Sin animacion de entrada a proposito: con `opacity-0` de base, el
                titular dependia de que corriera la animacion CSS para verse, y
                un renderizador que capture antes —o que no ejecute
                animaciones— lo veia invisible. Es la frase principal del
                dominio; tiene que estar visible desde el primer pintado. */}
            <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-foreground text-balance sm:text-5xl md:text-[54px]">
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
                ["/logo-iso-27001.png", "iso"],
                ["/logo-gdpr-compliant.png", "gdpr"],
                ["/logo-ssl.png", "ssl"],
              ].map(([src, key]) => (
                <div
                  key={src}
                  className="relative h-8 w-20 opacity-60 grayscale"
                >
                  <Image
                    src={src}
                    alt={t(`home-hero-section:hero.certifications.${key}`)}
                    fill
                    style={{ objectFit: "contain" }}
                    className="dark:invert"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up opacity-0 [--animation-delay:200ms]">
            <div className="relative rounded-xl border border-border bg-card shadow-xl overflow-hidden">
              <VideoTema
                base={t("home-hero-section:hero.video.base")}
                alt={t("home-hero-section:hero.video.alt")}
                prioridad
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
