import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  loginPageEn,
  loginPageRu,
  navTextEn,
  navTextRu,
  registrationPageTextEn,
  registrationPageTextRu,
  registrationTextEn,
  registrationTextRu,
  welcomePageRu,
  welcomePageEn,
  editProfilePageTextEn,
  editProfilePageTextRu,
  boardPageEn,
  boardPageRu,
  modalTextEn,
  modalTextRu,
  infoAcitonsRu,
  infoAcitonsEn,
} from '../constants/text';
import { AuthTextEn, AuthTextRu } from '../constants/authorization';
import {
  BoardModalTextEn,
  BoardModalTextRu,
  ListModalTextEn,
  ListModalTextRu,
  TaskModalTextEn,
  TaskModalTextRu,
} from '../constants/boards';

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
          AuthText: AuthTextEn,
          BoardModalText: BoardModalTextEn,
          ListModalText: ListModalTextEn,
          TaskModalText: TaskModalTextEn,
          loginPage: loginPageEn,
          registrationPageText: registrationPageTextEn,
          registrationText: registrationTextEn,
          loginAuthInput: 'login',
          nameErrors: {
            minLength: 'Value must be no less than 1 symbols',
            min2symbolsLength: 'Value must be no less than 2 symbols',
            maxLength: 'Value must be no more than 20 symbols',
            maxLength100symbols: 'Value must be no more than 100 symbols',
            pattern: 'name must starts with capital letter',
          },
          loginErrors: {
            pattern: 'Invalid username',
          },
          passwordError: {
            minLength: 'Password must be no less than 8 symbols',
            maxLength: 'Password must be no more than 20 symbols',
            pattern: 'Minimum eight characters, at least one letter and one number',
          },
          welcomePage: welcomePageEn,
          profilePage: editProfilePageTextEn,
          boardPage: boardPageEn,
          modal: modalTextEn,
          info: infoAcitonsEn,
        },
      },
      ru: {
        translation: {
          navText: navTextRu,
          AuthText: AuthTextRu,
          BoardModalText: BoardModalTextRu,
          ListModalText: ListModalTextRu,
          TaskModalText: TaskModalTextRu,
          loginPage: loginPageRu,
          registrationPageText: registrationPageTextRu,
          registrationText: registrationTextRu,
          loginAuthInput: 'Логин',
          nameErrors: {
            minLength: 'Значение должно быть не меньше 1 символа',
            min2symbolsLength: 'Значение должно быть не меньше 2 символов',
            maxLength: 'Значение должно быть не больше 20 символов',
            maxLength100symbols: 'Значение должно быть не больше 100 символов',
            pattern: 'Имя должно начинаться с заглавной буквы',
          },
          loginErrors: {
            pattern: 'Неверное имя пользователя',
          },
          passwordError: {
            minLength: 'Пароль должен быть не меньше 8 символов',
            maxLength: 'Пароль должен быть не больше 20 символов',
            pattern: 'Минимум 8 символов, одна буква и одна цифра',
          },
          welcomePage: welcomePageRu,
          profilePage: editProfilePageTextRu,
          boardPage: boardPageRu,
          modal: modalTextRu,
          info: infoAcitonsRu,
        },
      },
    },
  });

export default i18n;
