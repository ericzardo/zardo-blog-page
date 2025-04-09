import Hero from "./sections/Hero";
import Section from "./sections/Content";
import ImageSection from "./sections/Image";

import { Post } from "@/types/post"
import { groupIntoSections } from "@/lib/sections";

export function PostRenderer({ title, banner, description, date, content, tags, author }: Post) {
  const sections = groupIntoSections(content);

  return (
    <article>
      <Hero
        title={title}
        description={description}
        date={date}
        tags={tags}
        banner={banner}
        author={author}
      />

      {sections.map((blocks, index) => {
        const firstBlock = blocks[0];

        if (blocks.length === 1 && firstBlock.type === 'image') {
          return (
            <ImageSection
              key={index}
              src={firstBlock.src}
              alt={firstBlock.alt}
            />
          );
        }

        return <Section key={index} blocks={blocks} index={index} />;
      })}
    </article>
  )
}
