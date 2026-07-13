import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Software de libro de socios — oficial, actualizado y exportable",
  description: "Libro de socios digital para sociedades limitadas: numeración, clases y transmisiones al día, exportable para el Registro. Migración desde Excel en una semana.",
  keywords: "software libro de socios, libro de socios digital, libro registro de socios",
  path: "/software-de-libro-de-socios",
});

const content = {
  slogan: "Software de libro de socios",
  title: "El libro de socios, oficial y sin errores",
  intro: [
  "El libro de socios es el registro oficial de una sociedad limitada: quiénes son los socios, qué participaciones tienen, con qué numeración y qué transmisiones ha habido. Llevarlo en un Excel o en carpetas dispersas convierte cada certificado y cada operación en trabajo manual con riesgo de error.",
  "Sttok lo mantiene actualizado y exportable: listo para presentar ante el Registro, para emitir certificados al instante y para que cada socio consulte lo suyo en su portal."
],
  bulletsLabel: "Qué incluye el libro de socios de Sttok",
  bullets: [
  {
    "title": "Libro oficial exportable",
    "description": "Actualizado y listo para presentar ante registros oficiales en cualquier momento."
  },
  {
    "title": "Numeración y clases",
    "description": "Detalle de numeración, clases de participaciones, cargas y cotitulares."
  },
  {
    "title": "Ficha de cada socio",
    "description": "Datos, transacciones, documentos y certificados individuales, accesibles para el socio."
  },
  {
    "title": "Transmisiones con documentación",
    "description": "Cada transmisión registrada con su escritura o contrato asociado."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Es válido un libro de socios digital?",
    "a": "Sttok mantiene el libro actualizado y exportable en el formato que exigen el Registro y los organismos oficiales."
  },
  {
    "q": "¿Cómo migro mi libro actual?",
    "a": "El onboarding incluye la migración de datos e histórico y se completa en una semana."
  },
  {
    "q": "¿Y para sociedades anónimas?",
    "a": "Sttok gestiona igualmente el libro registro de acciones nominativas de las sociedades anónimas."
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
