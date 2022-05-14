import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          headerButtons: {
            home: 'Home',
            boards: 'Boards',
            profile: 'Profile',
            addBoard: 'Add board',
            logIn: 'Log in',
            logOut: 'Log out',
          },
        },
      },
      ru: {
        translation: {
          headerButtons: {
            home: 'Главная',
            boards: 'Доски',
            profile: 'Профиль',
            addBoard: 'Добавить доску',
            logIn: 'Вход',
            logOut: 'Выход',
          },
        },
      },
    },
  });

export default i18n;
