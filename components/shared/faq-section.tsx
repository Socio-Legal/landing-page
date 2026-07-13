import { FC } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import SectionHeading from "@/components/shared/section-heading";

export type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
};

/**
 * FAQ con acordeón nativo (details/summary, sin JavaScript) y datos
 * estructurados FAQPage emitidos en el mismo HTML del servidor: sirve a
 * la vez para rich results de Google y para citación por motores de IA.
 */
const FaqSection: FC<FaqSectionProps> = ({ eyebrow, title, items }) => {
  const safeItems = Array.isArray(items) ? items : [];
  if (safeItems.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: safeItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-3xl px-4 py-14 md:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div>
          {safeItems.map((item, i) => (
            <details key={i} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <PlusIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-[70ch] pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
