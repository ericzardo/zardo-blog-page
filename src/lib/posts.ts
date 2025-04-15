import fs from 'fs/promises';
import path from 'path';

import { Post } from '@/types/post';

// Caminho para os posts traduzidos
const getPostPath = (locale: string) =>
  path.join(process.cwd(), 'public', 'locales', locale);

// Buscar um post específico por slug e idioma
export async function getPostBySlug(slug: string, locale: string): Promise<Post | null> {
  const postPath = getPostPath(locale);
  const filePath = path.join(postPath, `${slug}.json`);

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(file);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

// Buscar todos os slugs disponíveis em um idioma específico
export async function getAllSlugs(locale: string): Promise<string[]> {
  const postPath = getPostPath(locale);
  const files = await fs.readdir(postPath);
  return files.map((file) => file.replace('.json', ''));
}
