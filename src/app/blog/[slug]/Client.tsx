'use client'

import { useEffect, useState } from 'react'
import { Post } from '@/types/post'
import { useScrollToSection } from '@/hooks/useScrollToSection'

import { Header, Slogan, Footer } from '@zardo/ui-kit/layout'
import { LoadingScreen } from '@zardo/ui-kit/feedback'
import { PostRenderer } from '@/components/PostRenderer'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/constants/nav'

export default function Client({ slug }: { slug: string }) {
  const [isClient, setIsClient ] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null)
  const scrollToSection = useScrollToSection()


  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts?slug=${slug}`);
      if (!res.ok) throw new Error('Failed to fetch post')
      setPost(await res.json())
    }
    fetchPost()
  }, [slug])

  if (!post || !isClient) {
    return <LoadingScreen message="Loading post..." />
  }

  return (
    <main className="min-h-screen">
      <Header 
        navItems={NAV_ITEMS.map(nav => ({
          ...nav,
          onClick: () => window.location.href = 'https://zardo.dev',
        }))}
        ctaLabel="Get Started"
        ctaOnClick={() => window.location.href = 'https://zardo.dev#contact'}
        onLogoClick={() => window.location.href = 'https://zardo.dev'}
      />
      <PostRenderer {...post} />
      <Slogan
        title="Innovative Digital Solutions"
        description="Combining creativity and cutting-edge technology to craft unique experiences that transform your business."
      />
      <Footer
        email="contact@zardo.dev"
        socialLinks={SOCIAL_LINKS}
        onScrollToTop={() => scrollToSection({ sectionId: "hero", offset: 80, duration: 800 })}
      />
    </main>
  )
}
