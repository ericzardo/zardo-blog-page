'use client';

import { useEffect, useState, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { Post } from '@/types/post';
import { LoadingScreen } from '@zardo/ui-kit/feedback';
import { Linkedin, Instagram } from 'lucide-react';
import { getPostBySlug } from '@/lib/api/posts';
import switchLanguage from '@/lib/translate/service/switch';

const PostRenderer = lazy(() => import('@/components/PostRenderer'));
const Slogan = lazy(() => import('@zardo/ui-kit/layout').then(module => ({ default: module.Slogan })));
const Footer = lazy(() => import('@zardo/ui-kit/layout').then(module => ({ default: module.Footer })));
const Header = lazy(() => import('@zardo/ui-kit/layout').then(module => ({ default: module.Header })));

const iconMap = {
  instagram: <Instagram strokeWidth={2} className="size-6 text-white/60" />,
  linkedin: <Linkedin strokeWidth={2} className="size-6 text-white/60" />,
};

type ClientProps = {
  initialPost: Post | null;
  slug: string;
};

export default function Client({ initialPost, slug }: ClientProps) {
  const { t, i18n } = useTranslation('home');
  const scrollToSection = useScrollToSection();

  const [isBlogPage, setIsBlogPage] = useState(false);
  const [post, setPost] = useState<Post | null>(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [isLangReady, setLangReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBlogPage(window.location.pathname.startsWith('/blog'));
    }
  }, []);

  useEffect(() => {
    if (i18n.language !== 'pt' && i18n.language !== 'en') {
      setLangReady(false);
    } else {
      setLangReady(true); 
    }
  }, [i18n.language]);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getPostBySlug(slug, i18n.language).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [i18n.language, slug]);

  useEffect(() => {
    if (!initialPost) {
      setLoading(true);
      getPostBySlug(slug, i18n.language).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [slug, i18n.language, initialPost]);

  if (loading || !post || !isLangReady) return <LoadingScreen />;

  const NAV_ITEMS = t('nav', { returnObjects: true }) as { label: string; href: string }[];
  const SOCIAL_LINKS = (t('social', { returnObjects: true }) as { platform: keyof typeof iconMap; url: string; label: string }[] || [])
    .map((item) => ({ ...item, icon: iconMap[item.platform] }));

  const headerNavItems = NAV_ITEMS.map((nav) =>
    isBlogPage
      ? { ...nav, href: `https://zardo.dev/#${nav.href}` }
      : { ...nav, onClick: () => scrollToSection({ sectionId: nav.href, offset: 80, duration: 800 }) }
  );

  return (
    <main className="min-h-screen bg-brand-offwhite">
      <Header 
        navItems={headerNavItems}
        ctaLabel={t('cta')}
        ctaOnClick={() => window.location.href = "/booking"}
        selector={{
          current: i18n.language,
          options: [
            { value: "pt", label: "Português", icon: "🇧🇷" },
            { value: "en", label: "English", icon: "🇺🇸" },
          ],
          onSelect: (lang: string) => switchLanguage(lang as "en" | "pt"),
        }}
      />
      <PostRenderer {...post} authorLabel={t("hero.authorLabel")} dateLabel={t("hero.dateLabel")} />
      <Slogan title={t('slogan.title')} description={t('slogan.description')} />
      <Footer
        email="contact@zardo.dev"
        socialLinks={SOCIAL_LINKS}
        onScrollToTop={() => scrollToSection({ sectionId: "hero", offset: 80, duration: 800 })}
        backToTopLabel={t("footer.backToTop")}
      />
    </main>
  );
}
