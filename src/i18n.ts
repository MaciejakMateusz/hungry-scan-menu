import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_en from './locales/en/translation_en.json';
import translation_pl from './locales/pl/translation_pl.json';
import translation_nl from './locales/nl/translation_nl.json';

const languageDetector = new LanguageDetector(null, {
    order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    caches: ['cookie']
});

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translation_en },
            pl: { translation: translation_pl },
            nl: { translation: translation_nl },
        },
        fallbackLng: 'pl',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie', 'localStorage', 'navigator'],
            caches: ['cookie']
        }
    });

if (!languageDetector.detect()) {
    languageDetector.cacheUserLanguage('pl');
}

export default i18n;