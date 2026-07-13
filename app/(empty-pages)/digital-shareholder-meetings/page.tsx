import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Junta de accionistas digital — cómo celebrarla con garantías",
  description: "Celebra juntas de accionistas digitales con convocatoria electrónica, voto telemático, quórums automáticos y acta instantánea. Cumpliendo los requisitos societarios.",
  keywords: "junta de accionistas digital, junta telemática, voto telemático, junta online",
  path: "/junta-de-accionistas-digital",
});

const content = {
  slogan: "Junta digital",
  title: "La junta de accionistas, celebrada digitalmente",
  intro: [
  "Las juntas digitales y mixtas ya son la norma en sociedades con socios repartidos entre ciudades y países. La cuestión no es si celebrarlas, sino cómo hacerlo con las mismas garantías que una junta presencial: convocatoria acreditable, identidad verificada, votos trazables.",
  "Sttok cubre el ciclo completo de la junta digital: convocatoria electrónica con registro de entrega, acceso verificado de cada socio, delegaciones y votaciones telemáticas y acta generada al momento."
],
  bulletsLabel: "Las garantías de una junta digital con Sttok",
  bullets: [
  {
    "title": "Convocatoria acreditable",
    "description": "Comunicación electrónica a cada socio con constancia de envío y entrega."
  },
  {
    "title": "Identidad verificada",
    "description": "Acceso con SSO corporativo o código de un solo uso para cada asistente."
  },
  {
    "title": "Voto telemático trazable",
    "description": "Cada voto queda registrado con su emisor, momento y sentido."
  },
  {
    "title": "Resultados al instante",
    "description": "Quórums, mayorías y acuerdos calculados y documentados en el acta."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Es válida una junta 100% telemática?",
    "a": "La normativa societaria admite juntas telemáticas si los estatutos lo prevén; Sttok aporta la convocatoria, identidad y votación con la trazabilidad necesaria."
  },
  {
    "q": "¿Pueden convivir asistentes presenciales y remotos?",
    "a": "Sí: las juntas mixtas funcionan con el mismo sistema de delegaciones, voto y quórum."
  },
  {
    "q": "¿Cómo se documenta la junta?",
    "a": "El acta se genera automáticamente con asistentes, quórums, votaciones y acuerdos."
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
