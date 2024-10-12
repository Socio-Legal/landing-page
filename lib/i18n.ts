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
        debug: true,
        fallbackLng: "es",
        supportedLngs: ["en", "es"],
        lng: "es",
        defaultNS: "common",
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: "/locales/{{lng}}/{{ns}}.json",
          requestOptions: {
            // Modify cache control for debugging
            cache: "no-cache",
          },
          queryStringParams: { v: new Date().getTime() }, // Cache busting
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
