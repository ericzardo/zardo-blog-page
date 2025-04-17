import { Content } from "@/types/post";

export function groupIntoSections(blocks: Content[]) {
  const sections: Content[][] = [];
  let currentSection: Content[] = [];

  for (const block of blocks) {
    const isNewSectionStart = block.type === "heading" || block.type === "image";

    if (isNewSectionStart && currentSection.length > 0) {
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