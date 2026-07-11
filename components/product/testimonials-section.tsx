import { FC } from "react";
import Image from "next/image";

import { Testimonial } from "@/types/Testimonial";

import SectionHeading from "@/components/shared/section-heading";

export type TestimonialsSectionProps = {
  title: string;
  description: string;
  items: Testimonial[];
};

/**
 * Testimonios sin carrusel: citas en serif itálica con nombre y cargo,
 * en rejilla estática. Los LLM y buscadores leen HTML plano, no carruseles.
 */
const TestimonialsSection: FC<TestimonialsSectionProps> = ({
  title,
  description,
  items,
}) => {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section id="product-testimonials" className="border-t border-border">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading eyebrow={title} title={description} />

        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12">
          {safeItems.map((testimonial, index) => (
            <figure
              key={index}
              className="flex flex-col justify-between gap-5 border-l border-border pl-6"
            >
              <blockquote className="font-serif text-lg italic leading-relaxed text-foreground">
                “{testimonial.description}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {testimonial.img && (
                  <Image
                    width={32}
                    height={32}
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="rounded-full grayscale"
                  />
                )}
                <div className="text-sm">
                  <span className="font-semibold text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {testimonial.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
