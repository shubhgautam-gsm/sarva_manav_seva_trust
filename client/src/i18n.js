import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import gu from './locales/gu/translation.json';

const saved = localStorage.getItem('lang') || 'en';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, gu: { translation: gu } },
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;