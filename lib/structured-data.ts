import type { Locale } from "@/lib/locales";

const BASE_URL = "https://www.sttok.com";

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
export function softwareApplicationJsonLd(locale: Locale) {
  const url = `${BASE_URL}${PRICING_PATH[locale]}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
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
