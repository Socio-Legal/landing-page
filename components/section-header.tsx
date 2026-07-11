import React from "react";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type SectionHeaderProps = {
  slogan?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

/**
 * Cabecera de sección sobria: eyebrow en versalitas, titular serif y
 * descripción en gris. Sin píldoras, iconos ni degradados.
 */
const SectionHeader = ({
  slogan,
  title,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: SectionHeaderProps) => {
  return (
    <div className="relative z-10 mb-12 text-center">
      {slogan && (
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-brand">
          {slogan}
        </p>
      )}

      {title && (
        <h2 className="mb-4 font-serif text-3xl font-normal tracking-tight text-balance text-foreground sm:text-4xl">
          {title}
        </h2>
      )}

      {description && (
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {(buttonText && buttonLink) || (secondaryButtonText && secondaryButtonLink) ? (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              {buttonText}
              <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          )}
          {secondaryButtonText && secondaryButtonLink && (
            <Link
              href={secondaryButtonLink}
              target="_blank"
              className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {secondaryButtonText}
              <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SectionHeader;
