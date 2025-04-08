import { NextResponse } from 'next/server';

import { getPostBySlug } from '@/lib/posts';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return NextResponse.json(post);
}