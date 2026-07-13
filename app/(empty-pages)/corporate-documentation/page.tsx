import React from "react";

import CallToActionSection from "@/components/landing/cta-section";
import SeoLanding from "@/components/shared/seo-landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documentación societaria — actas y certificados automáticos",
  description: "Genera actas, certificados y documentos societarios automáticamente desde los datos reales del libro de socios, y fírmalos con la firma electrónica integrada.",
  keywords: "documentación societaria, generar actas, certificados de participaciones, escrituras",
  path: "/documentacion-societaria",
});

const content = {
  slogan: "Documentación societaria",
  title: "Actas y certificados que se escriben solos",
  intro: [
  "La documentación societaria —actas, certificados, cartas de incentivos— se redacta una y otra vez con los mismos datos: socios, participaciones, acuerdos. Hacerlo a mano es lento y multiplica las inconsistencias entre documentos.",
  "Sttok genera cada documento desde los datos reales del libro de socios: el certificado de un socio, el acta de la junta o la carta de un plan de incentivos salen con los datos exactos, listos para firmar electrónicamente."
],
  bulletsLabel: "La documentación que genera Sttok",
  bullets: [
  {
    "title": "Certificados de titularidad",
    "description": "Al instante desde la ficha de cada socio, con los datos del libro."
  },
  {
    "title": "Actas de juntas y consejos",
    "description": "Generadas al cerrar cada sesión con asistentes, votos y acuerdos."
  },
  {
    "title": "Cartas de incentivos",
    "description": "Invitaciones y acuerdos de planes generados y firmados en minutos."
  },
  {
    "title": "Repositorio con permisos",
    "description": "Escrituras y documentos vinculados a cada operación, accesibles por rol."
  }
],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
  {
    "q": "¿Los documentos son personalizables?",
    "a": "Las plantillas se adaptan a tu sociedad y los datos se insertan automáticamente desde el libro."
  },
  {
    "q": "¿Cómo se firman?",
    "a": "Con la firma electrónica integrada, legalmente vinculante y sin coste adicional."
  },
  {
    "q": "¿Dónde queda archivado todo?",
    "a": "En el repositorio de la sociedad, vinculado a cada socio y operación, con acceso por roles."
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
