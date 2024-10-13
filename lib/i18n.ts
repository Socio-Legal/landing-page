import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import loadTranslations from "./loadTranslations";

const initI18n = async () => {
  if (!i18n.isInitialized) {
    const [esTranslations, enTranslations] = await Promise.all([
      loadTranslations("es"),
      loadTranslations("en"),
    ]);

    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          es: esTranslations,
          en: enTranslations,
        },
        fallbackLng: "es",
        supportedLngs: ["es", "en"],
        detection: {
          order: ["localStorage", "navigator"],
        },
        defaultNS: "common",
        interpolation: {
          escapeValue: false,
        },
      } as any);

    console.log("i18n initialized:", i18n.language);
  }
};

initI18n();

export default i18n;
