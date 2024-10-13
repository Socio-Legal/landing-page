import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const initI18n = async () => {
  await i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
      {
        debug: false,
        fallbackLng: "es",
        supportedLngs: ["es", "en"],
        lng: "es",
        defaultNS: "common",
        ns: [
          "common",
          "home-clients-section",
          "home-cta-section",
          "home-features-section",
          "home-hero-section",
          "home-pricing-section",
          "home-products-section",
          "home-testimonials-section",
          "home-uses-section",
          "product-hero-section",
          "product-partner-book-page",
          "product-incentive-plans-page",
          "product-shareholder-meetings-page",
          "product-operation-drafts-page",
          "solutions-page",
          "solutions-companies-page",
          "solutions-lawyers-page",
          "solutions-startups-page",
          "solutions-investors-page",
          "solutions-investors-dashboard-page",
          "testimonials-page",
          "testimonials-yaba-page",
          "testimonials-taxdown-page",
          "testimonials-pldspace-page",
          "testimonials-factorial-page",
          "testimonials-banktrack-page",
          "testimonials-caballero-page",
          "testimonials-derechocom-page",
          "pricing-page",
          "legal-privacy-page",
          "legal-security-page",
          "legal-disclaimer-page",
        ],
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: "/locales/{{lng}}/{{ns}}.json",
          requestOptions: {
            // Modify cache control for debugging
            cache: "no-cache",
          },
          // queryStringParams: { v: new Date().getTime() }, // Cache busting
        },
      },
      (err, t) => {
        if (err) return console.error("Error loading translations:", err);
        console.log("Translations loaded successfully");
      }
    );

  console.log("i18n initialized:", i18n.language);
};

initI18n();

export default i18n;
