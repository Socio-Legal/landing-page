"use client";

import React, { FC } from "react";

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
 * Cabecera de documento legal: eyebrow, titular serif y nada más.
 * Quien llega aquí es un DPO o un abogado haciendo due diligence.
 */
const HeroSection: FC<HeroSectionProps> = ({ slogan, title, description }) => {
  return (
    <section id="legal-hero">
      <div className="container mx-auto px-4 pb-4 pt-16 text-center md:pt-24">
        {slogan && (
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {slogan}
          </p>
        )}
        <h1 className="mx-auto mt-4 max-w-[24ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
