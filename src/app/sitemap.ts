import { MetadataRoute } from 'next'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import { Post } from '@/types/post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://zardo.dev/blog'

  const slugs = await getAllSlugs()
  const posts: Post[] = await Promise.all(
    slugs.map(async (slug: string) => await getPostBySlug(slug))
  )

  const staticRoutes = [
    '',
    '/blog',
  ].map((route) => ({
    url: `https://zardo.dev${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.title}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}
