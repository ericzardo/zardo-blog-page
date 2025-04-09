import fs from 'fs/promises'
import path from 'path'

import { Post } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'src/data')

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.json`);

  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}
export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(postsDirectory)
  return files.map((file) => file.replace('.json', ''))
}