 
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "./Client";
import { getPostBySlug } from "@/lib/posts";
import { metadata } from "@/lib/metadata";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  
  const cookieStore = await cookies();
  const locale = cookieStore.get('preferredLanguage')?.value || 'en';

  try {
    const post = await getPostBySlug(slug, locale);
    if (!post) notFound();
    return metadata(post);
  } catch {
    notFound();
  }
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  return <Client slug={slug} />;
}