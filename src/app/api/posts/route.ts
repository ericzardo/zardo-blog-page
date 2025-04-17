import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
import { type PostTranslationWithCanonical } from '@/types/post';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  const lang = req.nextUrl.searchParams.get('lang');

  if (!lang) throw new Error("Language not found.")

  if (slug) {
    const { data, error } = await supabase
      .from('post_translations')
      .select(`
        id,
        lang,
        localized_slug,
        title,
        date,
        description,
        banner,
        author,
        tags,
        content,
        post_id,
        posts!inner(slug)
      `)
      .eq('localized_slug', slug)
      .eq('lang', lang)
      .single<PostTranslationWithCanonical>();

    if (error || !data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...data,
      canonicalSlug: data.posts.slug,
    });
  }

  const { data, error } = await supabase
    .from('post_translations')
    .select('localized_slug')
    .eq('lang', lang);

  if (error) {
    return NextResponse.json({ error: 'Erro ao buscar slugs' }, { status: 500 });
  }

  return NextResponse.json(
    data.map((post) => ({ slug: post.localized_slug }))
  );
}
