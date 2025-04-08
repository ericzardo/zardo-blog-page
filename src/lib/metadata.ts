import { Metadata } from 'next'
import { Favicon, AppleTouchIcon, Logo32, Logo192, Logo512 } from "@zardo/ui-kit/logos"

import { Post } from '@/types/post'

export async function metadata(post: Post): Promise<Metadata> {
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, "zardo", "zardo.dev"],
    openGraph: {
      title: post.title,
      description: post.description,
      url: "https://zardo.dev",
      siteName: "zardo",
      images: [
        {
          url: "https://zardo.dev/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "zardo",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: [
        { url: Favicon, sizes: 'any' },
        { url: Logo32, type: 'image/png', sizes: '32x32' },
        { url: Logo192, type: 'image/png', sizes: '192x192' },
        { url: Logo512, type: 'image/png', sizes: '512x512' },
      ],
      apple: [
        { url: AppleTouchIcon, sizes: '180x180', type: 'image/png' },
      ],
      shortcut: [Favicon],
    },
    manifest: '/manifest.json',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}