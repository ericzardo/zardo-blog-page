import { Instagram, Linkedin } from "lucide-react";

export const SOCIAL_LINKS = [
  {
    url: "#",
    icon: <Instagram strokeWidth={2} className="size-6 text-white/60" />,
    label: "Zardo's Instagram Profile",
  },
  {
    url: "https://www.linkedin.com/company/zardo-dev",
    icon: <Linkedin strokeWidth={2} className="size-6 text-white/60" />,
    label: "Zardo's LinkedIn Profile",
  }
];

export const NAV_ITEMS = [
  { label: "Home", href: "hero" },
  { label: "Projects", href: "projects" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];
