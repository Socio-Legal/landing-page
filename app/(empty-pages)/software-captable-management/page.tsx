import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gestión de captable — operaciones, diluciones y socios al día",
  description: "Gestiona el captable en el día a día: ampliaciones, transmisiones, planes de incentivos y diluciones calculadas al momento. La alternativa profesional al Excel.",
  keywords: "gestión de captable, gestionar cap table, actualizar captable, diluciones",
  path: "/software-de-gestion-de-captable",
});

const content = {
  slogan: "Gestión de captable",
  title: "Gestionar el captable no debería ser un proyecto",
  intro: [
  "Tener un captable es fácil; mantenerlo correcto durante años de ampliaciones, transmisiones, planes de incentivos y notas convertibles es lo difícil. La gestión del captable es un proceso continuo, y cada operación mal registrada se paga en la siguiente ronda.",
  "Con Sttok, cada operación societaria actualiza el captable automáticamente: registras la ampliación o la compraventa una vez, y porcentajes, diluciones y certificados quedan al día para todos los implicados."
],
  bulletsLabel: "La gestión continua que hace Sttok por ti",
  bullets: [
  {
    "title": "Transacciones registradas",
    "description": "Ampliaciones, compraventas, transmisiones, canjes, herencias, reducciones y renumeraciones, con su documentación."
  },
  {
    "title": "Dilución bajo control",
    "description": "El efecto de cada operación y del pool de incentivos, calculado sobre el captable totalmente diluido."
  },
  {
    "title": "Certificados al instante",
    "description": "Certificados de titularidad generados desde la ficha de cada socio, sin redactarlos a mano."
  },
  {
    "title": "Preparado para due diligence",
    "description": "Histórico y documentación completos, listos para compartir con inversores o asesores."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Cada cuánto se actualiza el captable?",
    "a": "En cada operación: al registrarla en Sttok, porcentajes y diluciones se recalculan al momento para todos los socios."
  },
  {
    "q": "¿Quién puede ver el captable?",
    "a": "Tú decides: acceso por roles para administradores, socios, inversores y asesores, cada uno con su nivel."
  },
  {
    "q": "¿Sirve para varias sociedades?",
    "a": "Sí, Sttok gestiona grupos de sociedades con participaciones cruzadas desde un mismo panel."
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
