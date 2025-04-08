import fs from 'fs/promises'
import path from 'path'

import { Post } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'src/data')

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.json`)
  const file = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(file)
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(postsDirectory)
  return files.map((file) => file.replace('.json', ''))
}