"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { trackDemoClick } from "@/lib/analytics";

export type HeroSectionProps = {
  slogan?: string;
  title: string;
  description: string;
  button?: {
    text: string;
    link: string;
  };
  image?: {
    light: string;
    dark: string;
  };
};

/**
 * Hero interior sobrio, compartido por producto, soluciones, testimonios y
 * recursos: eyebrow en versalitas, titular serif, copy, CTA, línea de
 * confianza y el producto real como imagen. Sustituye al hero anterior con
 * fondos difuminados y bordes animados.
 */
const HeroSection: FC<HeroSectionProps> = ({
  slogan,
  title,
  description,
  button,
  image,
}) => {
  const { t } = useTranslation("product-hero-section");

  const hasButton = !!(button?.text && button?.link);
  const hasImage = !!(image?.light || image?.dark);

  return (
    <section id="product-hero" className="relative overflow-hidden">
      <div className="container mx-auto px-4 pb-12 pt-16 md:pb-16 md:pt-24">
        <div
          className={
            hasImage
              ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
              : "mx-auto max-w-2xl text-center"
          }
        >
          <div className={hasImage ? "max-w-xl space-y-6" : "space-y-6"}>
            {slogan && (
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t(slogan)}
              </p>
            )}

            <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
              {t(title)}
            </h1>

            <p className="text-base leading-relaxed text-balance text-muted-foreground">
              {t(description)}
            </p>

            {hasButton && (
              <div
                className={
                  hasImage ? "flex flex-wrap gap-3" : "flex justify-center"
                }
              >
                <Link
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDemoClick("inner-hero")}
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  {t(button.text)}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            )}

            <div
              className={
                "flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4" +
                (hasImage ? "" : " justify-center")
              }
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="relative inline-block h-5 w-11 opacity-80 grayscale">
                  <Image
                    src="/logo-bureau-veritas.png"
                    alt="Bureau Veritas"
                    fill
                    style={{ objectFit: "contain" }}
                    className="dark:invert"
                  />
                </span>
                {t("trust.iso")}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {t("trust.gdpr")}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {t("trust.eu")}
              </span>
            </div>
          </div>

          {hasImage && (
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                <Image
                  alt={t(title)}
                  className="relative hidden h-auto w-full rounded-[inherit] dark:block"
                  src={image.dark || image.light}
                  height={0}
                  width={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
                <Image
                  alt={t(title)}
                  className="relative block h-auto w-full rounded-[inherit] dark:hidden"
                  src={image.light || image.dark}
                  height={0}
                  width={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
