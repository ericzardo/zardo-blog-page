import { PatternBackground } from "@zardo/ui-kit/layout";

import { Content } from "@/types/post";

interface SectionProps {
  blocks: Content[];
  index: number;
}

const Section = ({ blocks, index }: SectionProps) => {
  return (
    <section className="relative py-20 bg-brand-offwhite">
      {(index === 0) && <PatternBackground />}
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

            case 'subheading':
              return (
                <h3 key={index} className="text-xl font-semibold text-brand-navy">
                  {block.text}
                </h3>
              );

            case 'paragraph':
              return (
                <p
                  key={index}
                  className="text-lg text-brand-navy/80 leading-relaxed pb-4 pt-2"
                >
                  {block.text}
                </p>
              );

            case 'topics':
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-brand-navy/80 pl-4">
                  {block.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
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