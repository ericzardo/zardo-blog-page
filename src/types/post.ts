export type Content =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'topics'; items: string[] }
  | { type: 'image'; src: string; alt: string }

export interface Post {
  title: string;
  banner: string;
  description: string;
  date: string;
  tags: string[],
  content: Content[];
  author: string;
}

export interface PostTranslationWithCanonical extends Post {
  id: string;
  lang: string;
  localized_slug: string;
  post_id: string;
  posts: {
    slug: string;
  };
}