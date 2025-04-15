import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const lang = searchParams.get("lang") || "en";

  if (!slug) {
    return NextResponse.json({ error: "Slug não fornecido" }, { status: 400 });
  }

  const post = await getPostBySlug(slug, lang);
  return NextResponse.json(post);
}