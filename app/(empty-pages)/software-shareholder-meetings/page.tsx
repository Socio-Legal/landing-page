import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Software de juntas de accionistas — convocatoria, voto y acta",
  description: "Convoca juntas digitalmente, gestiona delegaciones de voto, calcula quórums automáticamente y genera el acta al instante. Con firma electrónica integrada.",
  keywords: "software juntas de accionistas, convocatoria junta, delegación voto, acta junta",
  path: "/software-de-juntas-de-accionistas",
});

const content = {
  slogan: "Software de juntas",
  title: "Juntas de accionistas sin papeles ni cálculos a mano",
  intro: [
  "Una junta general mueve convocatorias, delegaciones de voto, quórums y actas. Hecho por email y en papel, son días de trabajo administrativo y errores difíciles de subsanar después.",
  "Con Sttok convocas en un clic, los socios delegan y votan digitalmente, los quórums se calculan solos con los datos reales del libro de socios y el acta queda generada y lista para firmar al terminar."
],
  bulletsLabel: "Qué automatiza Sttok en tus juntas",
  bullets: [
  {
    "title": "Convocatoria digital",
    "description": "Comunicaciones a todos los socios con registro de entrega y recordatorios."
  },
  {
    "title": "Delegaciones con trazabilidad",
    "description": "Quién delega en quién, registrado y verificable."
  },
  {
    "title": "Quórums automáticos",
    "description": "Cálculo al momento sobre el capital presente y representado."
  },
  {
    "title": "Acta y firma",
    "description": "Acta generada al instante y firmada con la firma electrónica integrada."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Los socios necesitan instalar algo?",
    "a": "No: acceden por navegador con SSO o código de un solo uso (OTP)."
  },
  {
    "q": "¿Sirve para juntas telemáticas y mixtas?",
    "a": "Sí, la votación y las delegaciones funcionan igual con asistencia presencial, telemática o mixta."
  },
  {
    "q": "¿Qué pasa con el acta?",
    "a": "Se genera automáticamente con los acuerdos y resultados de voto, lista para firmar y archivar."
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
