import { MetadataRoute } from 'next'
import { getAllSlugs, getPostBySlug } from '@/lib/api/posts'
import { PostTranslationWithCanonical } from '@/types/post'

const DEFAULT_LOCALE = 'en'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://zardo.dev'
  const blogBasePath = '/blog'

  const slugs = await getAllSlugs(DEFAULT_LOCALE)

  const results = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, DEFAULT_LOCALE))
  )

  const posts = results.filter(
    (post): post is PostTranslationWithCanonical => post !== null
  );

  const staticRoutes = [
    '',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  const blogRoutes = posts.map((post) => {
    const isValidDate = post.date && !isNaN(new Date(post.date).getTime());
  
    return {
      url: `${baseUrl}${blogBasePath}/${post.title}`,
      lastModified: isValidDate ? new Date(post.date) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });
  

  return [...staticRoutes, ...blogRoutes]
}
