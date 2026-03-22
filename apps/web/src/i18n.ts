import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

function normalizeLanguage(lang: string): string {
  const fallback = 'en'

  if (!lang) return fallback;

  const shortLang = lang.split('-')[0];
  if (['en', 'fr', 'es'].includes(shortLang)) return shortLang;

  return 'en';
}

function getInitialLanguage(): string {
  const savedLanguage = localStorage.getItem('language');
  const browserLanguage = normalizeLanguage(navigator.language);
  const initialLanguage = savedLanguage || browserLanguage;

  return initialLanguage
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;