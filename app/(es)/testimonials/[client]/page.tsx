"use client";

import { use } from "react";

import { TestimonialCase } from "@/components/testimonials/testimonial-case";

// /testimonios/<cliente> (rewrite de next.config). La versión inglesa,
// /en/testimonials/<cliente>, la sirve app/[locale] con el mismo componente.
export default function Page({ params }: { params: Promise<{ client: string }> }) {
  const { client } = use(params);
  return <TestimonialCase client={client} />;
}
