import { PatternBackground } from "@zardo/ui-kit/layout";

import { Content } from "@/types/post";

interface SectionProps {
  blocks: Content[];
}

const Section = ({ blocks }: SectionProps) => {
  return (
    <section className="relative py-20 bg-brand-offwhite">
      <PatternBackground />
      <div className="container mx-auto px-4 max-w-4xl">
      {blocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2
                  key={index}
                  className="text-3xl font-bold text-brand-purpleDeep"
                >
                  {block.text}
                </h2>
              );

            case 'paragraph':
              return (
                <p
                  key={index}
                  className="text-lg text-brand-navy/80 leading-relaxed"
                >
                  {block.text}
                </p>
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default Section;