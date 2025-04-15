import { MetadataRoute } from 'next'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import { Post } from '@/types/post'

const DEFAULT_LOCALE = 'en'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://zardo.dev'
  const blogBasePath = '/blog'

  const slugs = await getAllSlugs(DEFAULT_LOCALE)

  const results = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, DEFAULT_LOCALE))
  )

  const posts: Post[] = results.filter((post): post is Post => post !== null)

  const staticRoutes = [
    '',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}${blogBasePath}/${post.title}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}
