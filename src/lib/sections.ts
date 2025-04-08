import { Content } from "@/types/post";

export function groupIntoSections(blocks: Content[]) {
  const sections: Content[][] = [];
  let currentSection: Content[] = [];

  for (const block of blocks) {
    const isHeading = block.type === 'heading';
    const isImage = block.type === 'image';

    if ((isHeading || isImage) && currentSection.length > 0) {
      sections.push(currentSection);
      currentSection = [block];
    } else {
      currentSection.push(block);
    }
  }

  if (currentSection.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}