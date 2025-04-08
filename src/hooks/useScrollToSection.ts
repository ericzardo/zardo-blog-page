"use client";

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface ScrollToSectionOptions {
  sectionId: string;
  basePath?: string;
  offset?: number;
  duration?: number; // Duration in milliseconds
  easing?: (t: number) => number; // Easing function
}

// Easing function for smooth animation
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const useScrollToSection = () => {
  const router = useRouter();

  const animateScroll = (start: number, end: number, duration: number, easing: (t: number) => number) => {
    const startTime = performance.now();
    const distance = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing function
      const easedProgress = easing(progress);
      const currentPosition = start + distance * easedProgress;

      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollToSection = useCallback(
    async ({ 
      sectionId, 
      basePath = '/', 
      offset = 0,
      duration = 1000, // Default 1 second duration
      easing = easeInOutCubic
    }: ScrollToSectionOptions) => {
      // Check if we're on the same page where the section exists
      const currentPath = window.location.pathname;
      const targetPath = basePath;

      if (currentPath !== targetPath) {
        // If we're not on the target page, navigate to it first
        await router.push(targetPath);
        
        // Wait for the page to load and then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const targetPosition = elementPosition + window.pageYOffset - offset;
            const startPosition = window.pageYOffset;
            
            animateScroll(startPosition, targetPosition, duration, easing);
          }
        }, 150); // Small delay to ensure the page has loaded
      } else {
        // If we're on the same page, just scroll smoothly
        const element = document.getElementById(sectionId);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const targetPosition = elementPosition + window.pageYOffset - offset;
          const startPosition = window.pageYOffset;
          
          animateScroll(startPosition, targetPosition, duration, easing);
        }
      }
    },
    [router]
  );

  return scrollToSection;
}; 