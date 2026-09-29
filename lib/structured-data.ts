import type { Locale } from "@/lib/locales";

const BASE_URL = "https://www.sttok.com";

/**
 * FAQPage a partir de una lista de preguntas. components/shared/faq-section
 * emite el suyo cuando pinta el acordeon; esto es para las paginas de
 * content/, donde las preguntas van en el cuerpo del documento.
 */
export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * URL PUBLICA de la pagina de precios en cada idioma. En castellano la ruta
 * publica es /precios: /pricing es solo el nombre de la carpeta en app/, el
 * destino interno del rewrite de next.config.mjs, y no debe aparecer nunca en
 * datos estructurados ni en canonical.
 */
const PRICING_PATH: Record<Locale, string> = {
  es: "/precios",
  en: "/en/pricing",
};

/**
 * Planes y precio anual en euros. Es el mismo dato que se pinta en
 * components/pricing/pricing-plans.tsx a partir de home-pricing-section.json
 * (yearlyPrice en centimos: 45000 -> 450 €).
 */
const PLANS: { name: Record<Locale, string>; price: string }[] = [
  { name: { es: "Básico", en: "Basic" }, price: "450" },
  { name: { es: "Avanzado", en: "Advanced" }, price: "650" },
  { name: { es: "Pro", en: "Pro" }, price: "850" },
];

const DESCRIPTION: Record<Locale, string> = {
  es: "Software de gestión de sociedades: libro de socios (captable), planes de incentivos, juntas y consejos de administración.",
  en: "Corporate management software: shareholder registry (cap table), incentive plans, shareholder and board meetings.",
};

/**
 * Ficha de producto de Sttok. Se emite en la home y en la pagina de precios de
 * cada idioma; ambas comparten @id y url para que describan UNA entidad y no
 * dos productos distintos. La url apunta a la pagina de precios, que es donde
 * viven las ofertas.
 */
/** @id de la ficha del producto Sttok en un idioma. */
export const softwareApplicationId = (locale: Locale): string =>
  `${BASE_URL}${PRICING_PATH[locale]}#software`;

export function softwareApplicationJsonLd(locale: Locale) {
  const url = `${BASE_URL}${PRICING_PATH[locale]}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": softwareApplicationId(locale),
    name: "Sttok",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    description: DESCRIPTION[locale],
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: `Sttok ${plan.name[locale]}`,
      price: plan.price,
      priceCurrency: "EUR",
      url,
    })),
  };
}

/**
 * Ficha de un modulo de producto: libro de socios, juntas, simulador...
 *
 * Cada pagina de producto describe UNA PARTE de Sttok, no un producto aparte.
 * Por eso lleva su propio @id y se ata al producto con `isPartOf`. La pagina
 * emite tambien la ficha del producto (softwareApplicationJsonLd), para que
 * esa referencia se resuelva dentro de la misma pagina.
 *
 * No lleva `offers`, y es deliberado: los precios son de los PLANES y viven en
 * la ficha del producto. Atribuir un precio a cada modulo exigiria saber que
 * modulos entran en cada plan, y ponerlo aqui seria inventar ese reparto.
 *
 * `path` es la ruta publica en el idioma de la pagina: /libro-de-socios o
 * /en/partners-book.
 */
export function productModuleJsonLd({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const url = `${BASE_URL}${path}`;
  // Algunos titulos llevan cola de SEO ("Secondary Market — share transfers
  // between partners"): el nombre del modulo es solo la parte principal.
  const nombre = title.split(/\s+—\s+|:/)[0].trim();

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: `Sttok — ${nombre}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    description,
    inLanguage: locale,
    isPartOf: { "@id": softwareApplicationId(locale) },
  };
}
