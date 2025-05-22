'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ConsultancyBadge() {
  const { i18n, t } = useTranslation("home");

  useEffect(() => {
    const scriptId = 'calendly-widget-script';
    const linkId = 'calendly-widget-css';

    // Adiciona o CSS
    if (!document.querySelector(`#${linkId}`)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Adiciona o JS
    if (!document.querySelector(`#${scriptId}`)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        initCalendlyBadge();
      };
    } else {
      initCalendlyBadge(); // Se já carregou, só inicializa de novo (útil em troca de idioma)
    }

    function initCalendlyBadge() {
      if (window.Calendly?.initBadgeWidget) {
        window.Calendly.initBadgeWidget({
          url: `https://calendly.com/eric-zardo/${t('consultancy.slug')}?background_color=e6e6fa&text_color=0a122a&primary_color=620079`,
          text: t('consultancy.labelText'),
          color: '#620079',
          textColor: '#e6e6fa',
        });
      }
    }
  }, [i18n.language, t]);

  return null; // Não precisa renderizar nada
}
