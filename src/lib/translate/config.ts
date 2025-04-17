'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homePT from "@/../public/locales/pt/home.json"
import homeEN from "@/../public/locales/en/home.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        home: homePT
      },
      en: {
        home: homeEN
      }
    },
    lng: 'pt',
    fallbackLng: 'en',
    ns: ['home'],
    defaultNS: 'home',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n