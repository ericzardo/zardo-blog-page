 
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "./Client";
import { getPostBySlug } from "@/lib/posts";
import { metadata } from "@/lib/metadata";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return []; 
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
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