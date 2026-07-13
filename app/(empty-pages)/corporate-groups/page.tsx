import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gestión de grupos de sociedades — todas bajo un mismo panel",
  description: "Gestiona grupos societarios: participaciones cruzadas, libros de socios de cada filial, juntas y documentación de todo el grupo desde un panel multi-sociedad.",
  keywords: "grupos de sociedades, gestión grupo societario, holding, participaciones cruzadas",
  path: "/grupos-societarios",
});

const content = {
  slogan: "Grupos societarios",
  title: "Todo el grupo de sociedades, bajo control",
  intro: [
  "En un grupo societario, cada filial tiene su libro de socios, sus juntas, sus apoderamientos y su documentación. Multiplicado por diez o treinta sociedades, la gestión en carpetas y hojas de cálculo se vuelve inmanejable y opaca.",
  "Sttok ofrece un panel multi-sociedad: las participaciones cruzadas del grupo visibles de un vistazo, cada libro al día, y las juntas y consejos de todas las sociedades gestionados con el mismo método."
],
  bulletsLabel: "Qué aporta Sttok a un grupo societario",
  bullets: [
  {
    "title": "Panel multi-sociedad",
    "description": "Todas las sociedades del grupo y sus participaciones cruzadas en una vista."
  },
  {
    "title": "Libros al día en cada filial",
    "description": "Cada sociedad con su libro oficial, exportable y con histórico."
  },
  {
    "title": "Órganos de gobierno del grupo",
    "description": "Juntas y consejos de todas las sociedades, con sus actas y acuerdos."
  },
  {
    "title": "Acceso por roles",
    "description": "La dirección jurídica ve el grupo; cada filial y cada socio, lo suyo."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Cómo se representan las participaciones cruzadas?",
    "a": "Cada sociedad refleja a sus socios, incluidas otras sociedades del grupo, y el panel muestra la estructura completa."
  },
  {
    "q": "¿El precio es por sociedad?",
    "a": "Sí, los planes son por sociedad y año; para grupos hay planes personalizados según el número de sociedades."
  },
  {
    "q": "¿Quién suele usarlo en el grupo?",
    "a": "Direcciones jurídicas y financieras in-house, con acceso para los despachos externos si se desea."
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
