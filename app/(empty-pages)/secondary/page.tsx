import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mercado secundario de participaciones — compraventas entre socios",
  description: "Organiza compraventas de participaciones entre socios y tender offers con registro automático en el libro de socios. El módulo de secundario de Sttok.",
  keywords: "mercado secundario participaciones, compraventa participaciones, tender offer, liquidez socios",
  path: "/secundario",
});

const content = {
  slogan: "Mercado secundario",
  title: "Liquidez para tus socios, orden para tu libro",
  intro: [
  "Cuando una empresa crece, sus socios tempranos y empleados quieren liquidez sin esperar a una venta total. El mercado secundario —compraventas entre socios y ofertas de compra organizadas— es la respuesta, pero gestionado por email se convierte en un caos documental.",
  "El módulo de secundario de Sttok organiza el proceso completo: la oferta, los participantes autorizados, la ejecución y el registro automático de cada operación en el libro de socios con su documentación."
],
  bulletsLabel: "Cómo funciona el secundario en Sttok",
  bullets: [
  {
    "title": "Tender offers organizadas",
    "description": "Ofertas de compra a varios socios a la vez, con plazos y condiciones claros."
  },
  {
    "title": "Participantes autorizados",
    "description": "La sociedad define quién puede comprar y vender, y con qué límites."
  },
  {
    "title": "Registro automático",
    "description": "Cada compraventa queda anotada en el libro de socios al ejecutarse."
  },
  {
    "title": "Documentación asociada",
    "description": "Contratos y comunicaciones de cada operación, archivados y trazables."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Está incluido en los planes?",
    "a": "El mercado de acciones o de incentivos es una funcionalidad con coste extra, contratable sobre cualquier plan."
  },
  {
    "q": "¿Quién autoriza las operaciones?",
    "a": "La sociedad: define participantes, límites y condiciones de cada oferta."
  },
  {
    "q": "¿Cómo afecta al libro de socios?",
    "a": "Cada operación ejecutada actualiza el libro automáticamente, con su documentación asociada."
  }
],
  },
  links: [
  {
    "label": "Ver el producto completo",
    "href": "/producto"
  },
  {
    "label": "Planes y precios",
    "href": "/precios"
  },
  {
    "label": "Casos de éxito",
    "href": "/testimonios"
  }
],
};

const Page = () => {
  return (
    <>
      <SeoLanding {...content} />
      <CallToActionSection />
    </>
  );
};

export default Page;
