import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import loadTranslations from "./loadTranslations";

const initI18n = async () => {
  const [esTranslations, enTranslations] = await Promise.all([
    loadTranslations("es"),
    loadTranslations("en"),
  ]);

  console.log("🚀 cclog  ~ initI18n:", { esTranslations, enTranslations });

  await i18n.use(initReactI18next).init({
    resources: {
      es: esTranslations,
      en: enTranslations,
    },
    lng: "es",
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

  console.log("i18n initialized:", i18n.language);
};

initI18n();

// import enTranslations from "../public/locales/en/index.json";
// import esTranslations from "../public/locales/es/index.json";

// i18n
//   .use(HttpBackend)
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .init({
//     debug: false,
//     backend: {
//       loadPath: "/locales/{{lng}}/index.json",
//     },
//     resources: {
//       en: { translation: enTranslations },
//       es: { translation: esTranslations },
//     },
//     lng: "es",
//     fallbackLng: "es",
//     supportedLngs: ["es", "en"],
//     defaultNS: "translation",
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// i18n.languages = ["es", "en"];

// const initI18n = async () => {
//   await i18n
//     .use(HttpBackend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init(
//       {
//         debug: true,
//         fallbackLng: "es",
//         supportedLngs: ["es", "en"],
//         lng: "es",
//         defaultNS: "common",
//         ns: [
//           "common",
//           "home-clients-section",
//           "home-cta-section",
//           "home-features-section",
//           "home-hero-section",
//           "home-pricing-section",
//           "home-products-section",
//           "home-testimonials-section",
//           "home-uses-section",
//           "product-hero-section",
//           "product-partner-book-page",
//           "product-incentive-plans-page",
//           "product-shareholder-meetings-page",
//           "product-operation-drafts-page",
//           "solutions-page",
//           "solutions-companies-page",
//           "solutions-lawyers-page",
//           "solutions-startups-page",
//           "solutions-investors-page",
//           "solutions-investors-dashboard-page",
//           "testimonials-page",
//           "testimonials-yaba-page",
//           "testimonials-taxdown-page",
//           "testimonials-pldspace-page",
//           "testimonials-factorial-page",
//           "testimonials-banktrack-page",
//           "testimonials-caballero-page",
//           "testimonials-derechocom-page",
//           "pricing-page",
//           "legal-privacy-page",
//           "legal-security-page",
//           "legal-disclaimer-page",
//         ],
//         interpolation: {
//           escapeValue: false,
//         },
//         backend: {
//           loadPath: "/locales/{{lng}}/{{ns}}.json",
//           requestOptions: {
//             // Modify cache control for debugging
//             cache: "no-cache",
//           },
//           // queryStringParams: { v: new Date().getTime() }, // Cache busting
//         },
//       },
//       (err, t) => {
//         if (err) {
//           console.error("Error loading translations:");
//           console.error(JSON.stringify(err, null, 2));
//           return;
//         }
//         console.log("Translations loaded successfully");
//       }
//     );

//   console.log("i18n initialized:", i18n.language);
// };

// initI18n();

export default i18n;
