/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Client from "./Client";
import { getPostBySlug } from "@/lib/posts";
import { metadata as buildMetadata } from "@/lib/metadata";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(context: Params): Promise<Metadata> {
  try {
    const post = await getPostBySlug(context.params.slug);
    if (!post) notFound();
    return buildMetadata(post);
  } catch (error) {
    notFound();
  }
}

export default async function Page(context: Params) {
  const slug = context.params.slug;
  return <Client slug={slug} />;
}
