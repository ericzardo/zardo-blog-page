import { Metadata } from 'next'
import Client from './Client'

import { getPostBySlug } from '@/lib/posts'
import { metadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  return metadata(post)
}

export default function Page({ params }: { params: { slug: string } }) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  return <Client slug={slug} />
}
