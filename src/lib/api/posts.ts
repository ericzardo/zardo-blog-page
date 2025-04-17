import { PostTranslationWithCanonical } from "@/types/post";

export async function getPostBySlug(slug: string, lang: string): Promise<PostTranslationWithCanonical | null>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?slug=${slug}&lang=${lang}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
}

export async function getAllSlugs(locale: string): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?lang=${locale}`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.map((post: { slug: string }) => post.slug);
}
