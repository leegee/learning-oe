import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import appConfig from "../app.config.json";

const loadLocales = () => {
    const resources: Record<string, { translation: any }> = {};

    const defaultLang = appConfig.defaultLanguage as keyof typeof appConfig.i18n.availableLanguages;
    const targetLang = appConfig.targetLanguage as keyof typeof appConfig.i18n.availableLanguages;

    if (defaultLang && defaultLang in appConfig.i18n.availableLanguages) {
        resources[defaultLang] = { translation: appConfig.i18n.availableLanguages[defaultLang] };
    } else {
        console.warn(`No data found for default language: ${defaultLang}`);
    }

    if (targetLang && targetLang in appConfig.i18n.availableLanguages) {
        resources[targetLang] = { translation: appConfig.i18n.availableLanguages[targetLang] };
    } else {
        console.warn(`No data found for target language: ${targetLang}`);
    }

    return { resources, defaultLang, targetLang };
};

const { resources, defaultLang, targetLang } = loadLocales();

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: targetLang || defaultLang,
        fallbackLng: defaultLang,
        interpolation: { escapeValue: false },
    });

export default i18n;
