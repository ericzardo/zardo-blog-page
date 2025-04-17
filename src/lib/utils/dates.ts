export function format(date: string, lang: 'en' | 'pt') {
  const d = new Date(date);

  return d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}