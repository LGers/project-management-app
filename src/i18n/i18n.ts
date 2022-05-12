import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enTranslation } from './dictionary.en';
import { ruTranslation } from './dictionary.ru';

i18n.use(initReactI18next).init({
  debug: true,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
});

export default i18n;
