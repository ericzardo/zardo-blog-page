'use client';

import { useEffect, useState } from 'react';
import i18n from '@/lib/translate/config';
import { LoadingScreen } from '@zardo/ui-kit/components';

export function LanguageSync() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const preferredLang = localStorage.getItem('preferredLanguage');

    if (preferredLang && i18n.language !== preferredLang) {
      i18n.changeLanguage(preferredLang);
    }

    document.documentElement.lang = preferredLang || i18n.language;

    setIsReady(true); 
  }, []);

  if (!isReady) {
    return <LoadingScreen />
  }
}
