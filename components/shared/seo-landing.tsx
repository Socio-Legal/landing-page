import { FC } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import FaqSection, { FaqItem } from "@/components/shared/faq-section";
import SectionHeading from "@/components/shared/section-heading";

export type SeoLandingContent = {
  slogan: string;
  title: string;
  intro: string[];
  bulletsLabel: string;
  bullets: { title: string; description: string }[];
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  links: { label: string; href: string }[];
};

/**
 * Página de captación SEO con contenido real: hero de documento, párrafos
 * útiles, funcionalidades, FAQ con schema y enlaces internos. Sustituye a
 * las páginas de solo titular + botón (contenido fino).
 */
const SeoLanding: FC<SeoLandingContent> = ({
  slogan,
  title,
  intro,
  bulletsLabel,
  bullets,
  faq,
  links,
}) => (
  <>
    <section id="seo-hero">
      <div className="container mx-auto px-4 pb-6 pt-16 text-center md:pt-24">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {slogan}
        </p>
        <h1 className="mx-auto mt-4 max-w-[22ch] font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
          {title}
        </h1>
      </div>
    </section>

    <section id="seo-intro">
      <div className="container mx-auto max-w-2xl space-y-5 px-4 pb-12">
        {intro.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </section>

    <section id="seo-features" className="border-t border-border">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <SectionHeading title={bulletsLabel} />
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {bullets.map((bullet, i) => (
            <div key={i} className="border-t border-border py-5 sm:pr-8">
              <h3 className="mb-1.5 text-base font-semibold text-foreground">
                {bullet.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {bullet.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {link.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    <FaqSection eyebrow={faq.eyebrow} title={faq.title} items={faq.items} />
  </>
);

export default SeoLanding;
