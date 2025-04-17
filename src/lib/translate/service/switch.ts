import i18n from "../config";

function switchLanguage(lang: 'en' | 'pt') {
  i18n.changeLanguage(lang);
  localStorage.setItem("preferredLanguage", lang);
  document.cookie = `preferredLanguage=${lang}; path=/; max-age=31536000`;
}

export default switchLanguage;