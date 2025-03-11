import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json"; // Static English file
import appConfig from "../app.config.json"; // App config with i18n settings

const loadLocales = () => {
    const resources: Record<string, { translation: any }> = {
        en: { translation: en }, // Always load English from file
    };

    const targetLang = appConfig.i18n?.targetLanguage as keyof typeof appConfig.i18n.availableLanguages;
    const targetData = appConfig.i18n?.availableLanguages?.[targetLang];

    if (targetLang && targetData) {
        resources[targetLang] = { translation: targetData };
    } else {
        console.warn(`No data found for target language: ${targetLang}`);
    }

    return { resources, targetLang };
};

const { resources, targetLang } = loadLocales();

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: targetLang || "en", // Default to English
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
