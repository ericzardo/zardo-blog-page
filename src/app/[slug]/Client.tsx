'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '@/lib/translate';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { Post } from '@/types/post';

import { Header, Slogan, Footer } from '@zardo/ui-kit/layout';
import { LoadingScreen } from '@zardo/ui-kit/feedback';
import { PostRenderer } from '@/components/PostRenderer';
import { Linkedin, Instagram } from 'lucide-react';

const iconMap = {
  instagram: <Instagram strokeWidth={2} className="size-6 text-white/60" />,
  linkedin: <Linkedin strokeWidth={2} className="size-6 text-white/60" />,
};

export default function Client({ slug }: { slug: string }) {
  const [languageReady, setLanguageReady] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const scrollToSection = useScrollToSection();

  const { t } = useTranslation('home');
  const { i18n } = useTranslation();

  const NAV_ITEMS = t('nav', { returnObjects: true }) as { label: string; href: string }[];
  const rawSocial = t('social', { returnObjects: true }) as { platform: keyof typeof iconMap; url: string; label: string }[];
  const SOCIAL_LINKS = rawSocial.map((item) => ({
    ...item,
    icon: iconMap[item.platform],
  }));

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang && storedLang !== i18n.language) {
      switchLanguage(storedLang as "en" | "pt");
      setLanguageReady(true)
    } else {
      setLanguageReady(true);
    }
  }, [i18n.language]);
  
  useEffect(() => {
    if (!languageReady) return;
    
    const fetchPost = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?slug=${slug}&lang=${i18n.language}`);
      if (!res.ok) return setPost(null);
      setPost(await res.json());
    };
  
    fetchPost();
  }, [slug, i18n.language, languageReady]);
  

  if (!post) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen">
      <Header 
        navItems={NAV_ITEMS.map(nav => ({
          ...nav,
          onClick: () => scrollToSection({ sectionId: nav.href, offset: 80, duration: 800 }),
        }))}
        ctaLabel={t('cta')}
        ctaOnClick={() => scrollToSection({ sectionId: "contact", offset: 80, duration: 800 })}
        selector={{
          current: i18n.language,
          options: [
            { value: "pt", label: "Português", icon: "🇧🇷" },
            { value: "en", label: "English", icon: "🇺🇸" },
          ],
          onSelect: (lang: string) => {
            switchLanguage(lang as "en" | "pt");
          }
        }}
      />
      <PostRenderer {...post} authorLabel={t("hero.authorLabel")} dateLabel={t("hero.dateLabel")} />
      <Slogan
        title={t('slogan.title')}
        description={t('slogan.description')}
      />
      <Footer
        email="contact@zardo.dev"
        socialLinks={SOCIAL_LINKS}
        onScrollToTop={() => scrollToSection({ sectionId: "hero", offset: 80, duration: 800 })}
        backToTopLabel={t("footer.backToTop")}
      />
    </main>
  )
}
