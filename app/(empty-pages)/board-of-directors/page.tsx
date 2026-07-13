import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Software para consejos de administración — convocatoria y actas",
  description: "Gestiona el consejo de administración digitalmente: convocatorias, delegaciones, votaciones y actas con trazabilidad. Pensado para secretarios del consejo.",
  keywords: "software consejo de administración, secretario del consejo, actas consejo, votaciones consejo",
  path: "/consejos-de-administracion",
});

const content = {
  slogan: "Consejos de administración",
  title: "El consejo de administración, gestionado con método",
  intro: [
  "El secretario del consejo repite el mismo ciclo en cada sesión: convocar, recopilar delegaciones, celebrar, contar votos y redactar el acta. Cada paso manual es tiempo y riesgo de impugnación.",
  "Sttok digitaliza el ciclo completo del consejo con las mismas garantías que las juntas: convocatoria con constancia, delegaciones y votaciones trazables y acta generada al instante, con la documentación de cada sesión archivada."
],
  bulletsLabel: "Qué resuelve Sttok para el consejo",
  bullets: [
  {
    "title": "Convocatoria y orden del día",
    "description": "Comunicación a los consejeros con la documentación de la sesión adjunta."
  },
  {
    "title": "Delegaciones y votaciones",
    "description": "Digitales y trazables, también en sesiones telemáticas o mixtas."
  },
  {
    "title": "Actas al instante",
    "description": "Generadas con asistentes, deliberaciones y acuerdos, listas para firmar."
  },
  {
    "title": "Archivo del órgano",
    "description": "Todas las sesiones, acuerdos y documentos en un repositorio con permisos."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Sirve para consejos telemáticos?",
    "a": "Sí: convocatoria, asistencia, votación y acta funcionan igual en sesiones presenciales, telemáticas o mixtas."
  },
  {
    "q": "¿Los consejeros necesitan formación?",
    "a": "No: acceden por navegador, con la documentación de cada sesión en un solo lugar."
  },
  {
    "q": "¿Puedo gestionar varios consejos?",
    "a": "Sí, cada sociedad del grupo tiene su órgano con sus miembros, sesiones y actas."
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
