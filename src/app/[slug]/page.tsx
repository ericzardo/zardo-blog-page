 
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "./Client";
import { metadata } from "@/lib/metadata";
import { cookies } from "next/headers";
import { getPostBySlug } from "@/lib/api/posts";

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const store = await cookies();
  
  const lang = store.get('preferredLanguage')?.value || 'en';
  const post = await getPostBySlug(slug, lang);

  if (!post) notFound();

  return metadata(post);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = await cookies();

  const lang = store.get('preferredLanguage')?.value || "en"
  const post = await getPostBySlug(slug, lang);

  if (!post) notFound();

  return <Client initialPost={post} slug={slug} />;
}