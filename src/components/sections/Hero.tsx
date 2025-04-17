"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import i18n from "@/lib/translate/config";
import { format } from "@/lib/utils/dates";

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  title: string;
  description: string;
  banner: string;
  tags: string[];
  date: string;
  author: string;
  authorLabel: string;
  dateLabel: string;
}

const Hero = ({ title, description, banner, tags, date, author, authorLabel, dateLabel }: HeroProps) => {
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.08,
        ease: "power1.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }
  }, [])

  const formattedDate = format(date, i18n.language as 'pt' | 'en')

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-44 pb-24 bg-brand-navy"
      id="hero"
    > 
      <div className="container mx-auto px-4 flex flex-col justify-start gap-10">
        <div className="flex justify-between lg:flex-row flex-col gap-8">
          <div className="flex flex-col gap-8 lg:max-w-3xl">
            <h1 className="section-heading text-brand-lavender mb-0">{title}</h1>
            <p className="text-lg text-brand-lavender/85">{description}</p>
            <div className="w-full flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <div key={index} className="px-2 py-1 border border-brand-lavender text-brand-lavender rounded">
                  <p className="text-xs">{tag}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:w-1/3 w-full">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
              <div className="flex flex-col flex-1 gap-2 p-4 rounded-lg bg-brand-navy/50 border border-brand-lavender/10">
                <p className="text-sm text-brand-lavender/85">{dateLabel}</p>
                <p className="text-brand-lavender font-medium">
                  {formattedDate}
                </p>
              </div>

              <div className="flex flex-col flex-1 gap-2 p-4 rounded-lg bg-brand-navy/50 border border-brand-lavender/10">
                <p className="text-sm text-brand-lavender/85">{authorLabel}</p>
                <p className="text-brand-lavender font-medium">
                  {author}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-lg will-change-transform">
          {banner && (
            <Image
              ref={imageRef}
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${banner}`}
              alt={`${title} - Project showcase banner featuring ${tags.join(', ')} technologies.`}
              className="object-cover w-full h-full max-h-[700px] transition-transform will-change-transform"
              loading="lazy"
              width={2000}
              height={100}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;