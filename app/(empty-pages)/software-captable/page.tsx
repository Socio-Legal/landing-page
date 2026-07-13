import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Software de captable — libro de socios digital y sin errores",
  description: "Software de captable para empresas españolas: libro de socios oficial, porcentajes y diluciones exactos, acceso para socios e inversores. Desde 450€/año.",
  keywords: "software de captable, captable españa, cap table software, gestión captable",
  path: "/software-de-captable",
});

const content = {
  slogan: "Software de captable",
  title: "El captable de tu empresa, exacto y en un solo sitio",
  intro: [
  "Un captable es el registro de quién posee qué en una sociedad: socios, participaciones, porcentajes y clases. Cuando vive en una hoja de cálculo, cada ampliación, transmisión o plan de incentivos es una ocasión para introducir errores que nadie detecta hasta la siguiente operación o una due diligence.",
  "Sttok mantiene el captable como fuente única de verdad, conectado con el libro de socios oficial: cada operación queda registrada con su documentación, los porcentajes y diluciones se calculan solos, y socios e inversores acceden a su información sin pedírtela por correo."
],
  bulletsLabel: "Qué resuelve el software de captable de Sttok",
  bullets: [
  {
    "title": "Datos siempre exactos",
    "description": "Numeración, clases, cargas y cotitulares al día, con porcentajes calculados sobre datos reales."
  },
  {
    "title": "Histórico completo",
    "description": "Todas las operaciones registradas con su escritura o documento asociado."
  },
  {
    "title": "Acceso para socios",
    "description": "Cada socio consulta su ficha, sus documentos y sus certificados en su propio portal."
  },
  {
    "title": "Simulación de operaciones",
    "description": "Rondas, ampliaciones y convertibles calculados sobre el captable real antes de ejecutarlos."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Qué diferencia hay entre un captable y el libro de socios?",
    "a": "El captable es la foto del reparto de la propiedad; el libro de socios es su soporte oficial en las sociedades limitadas españolas. En Sttok son lo mismo: un único registro, siempre al día."
  },
  {
    "q": "¿Puedo importar mi captable actual?",
    "a": "Sí. El onboarding incluye la migración desde Excel u otras herramientas y se completa en una semana."
  },
  {
    "q": "¿Cuánto cuesta?",
    "a": "Desde 450€ por sociedad al año, con comunicaciones y firma electrónica incluidas."
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
