'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

function switchLanguage(lang: 'en' | 'pt') {
  i18n.changeLanguage(lang);
  localStorage.setItem("preferredLanguage", lang);
  document.cookie = `preferredLanguage=${lang}; path=/; max-age=31536000`;
}

import homeEN from '@/../public/locales/en/home.json';
import homePT from '@/../public/locales/pt/home.json';

import examplePostEN from "@/../public/locales/en/example-post.json"
import examplePostPT from "@/../public/locales/pt/example-post.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEN,
        examplePost: examplePostEN,
      },
      pt: {
        home: homePT,
        examplePost: examplePostPT,
      },
    },
    lng: 'pt',
    fallbackLng: 'en',
    ns: ['home', 'hero', 'footer'],
    defaultNS: 'home',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n, switchLanguage };