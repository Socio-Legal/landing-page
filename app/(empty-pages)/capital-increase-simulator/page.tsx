import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Simulador de ampliación de capital — calcula rondas y diluciones",
  description: "Simula ampliaciones de capital, rondas y notas convertibles con los datos reales de tu captable: dilución por socio, prima de emisión y escenarios comparados.",
  keywords: "simulador ampliación de capital, calcular dilución, simulador ronda financiación",
  path: "/simulador-de-ampliacion-de-capital",
});

const content = {
  slogan: "Simulador de operaciones",
  title: "Simula la ampliación de capital antes de firmarla",
  intro: [
  "Toda ampliación de capital plantea las mismas preguntas: cuántas participaciones se emiten, a qué prima, cuánto se diluye cada socio y cómo queda el captable después. Calcularlo en Excel funciona hasta que entran convertibles, pools de incentivos o varias clases de participaciones.",
  "El simulador de Sttok calcula la operación sobre tu captable real: creas tantos borradores como escenarios quieras comparar y, cuando la operación se cierra, el borrador se convierte en registro oficial en el libro de socios."
],
  bulletsLabel: "Qué puedes simular con Sttok",
  bullets: [
  {
    "title": "Rondas y ampliaciones",
    "description": "Nuevas emisiones con prima, valoración pre y post y dilución por socio."
  },
  {
    "title": "Notas convertibles",
    "description": "Conversión con descuento o cap, y su efecto en el captable."
  },
  {
    "title": "Escenarios comparados",
    "description": "Borradores ilimitados para negociar con datos delante."
  },
  {
    "title": "Del borrador al libro",
    "description": "La simulación aprobada se ejecuta y queda registrada oficialmente."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿El simulador usa mis datos reales?",
    "a": "Sí, calcula sobre el captable actualizado del libro de socios, sin copiar datos a otra herramienta."
  },
  {
    "q": "¿Puedo compartir un escenario con inversores?",
    "a": "Sí, los borradores pueden compartirse con los implicados antes de ejecutar la operación."
  },
  {
    "q": "¿Qué operaciones cubre además de ampliaciones?",
    "a": "Rondas, notas convertibles, compraventas y escenarios de liquidación."
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
