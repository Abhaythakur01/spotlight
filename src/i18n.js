import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Update these import paths
import enTranslation from './locales/en/translation.json'; // Changed from ../public/locales
// You'll need to create similar files for other languages (ta, kn, ml, te)
import taTranslation from './locales/ta/translation.json'; // Changed from ../public/locales
import knTranslation from './locales/kn/translation.json';
import mlTranslation from './locales/ml/translation.json';
import teTranslation from './locales/te/translation.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      // Add other languages here, remember to import them first
      ta: {
        translation: taTranslation,
      },
      kn: { translation: knTranslation },
      ml: { translation: mlTranslation },
      te: { translation: teTranslation },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;