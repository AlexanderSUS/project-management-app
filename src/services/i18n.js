import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { navTextEn, navTextRu } from '../constants/text';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          navText: navTextEn,
        },
      },
      ru: {
        translation: {
          navText: navTextRu,
        },
      },
    },
  });

export default i18n;
