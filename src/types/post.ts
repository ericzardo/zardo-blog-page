export type Content =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
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