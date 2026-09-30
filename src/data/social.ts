import { siteConfig } from '../config/site';

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  icon: string; // SVG path or icon name
}

export const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    handle: siteConfig.social.instagramHandle,
    url: siteConfig.social.instagram,
    icon: "instagram",
  },
  {
    platform: "TikTok",
    handle: siteConfig.social.tiktokHandle,
    url: siteConfig.social.tiktok,
    icon: "tiktok",
  },
  {
    platform: "Pinterest",
    handle: siteConfig.social.pinterestHandle,
    url: siteConfig.social.pinterest,
    icon: "pinterest",
  },
];

// Instagram feed data (for Instagram section)
export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  url: string;
  likes?: number;
  comments?: number;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: "ig1",
    image: "/images/instagram/ig-1.jpg",
    alt: "New collection styling",
    url: `${siteConfig.social.instagram}`,
    likes: 234,
    comments: 12,
  },
  {
    id: "ig2",
    image: "/images/instagram/ig-2.jpg",
    alt: "Behind the scenes",
    url: `${siteConfig.social.instagram}`,
    likes: 189,
    comments: 8,
  },
  {
    id: "ig3",
    image: "/images/instagram/ig-3.jpg",
    alt: "Street style look",
    url: `${siteConfig.social.instagram}`,
    likes: 312,
    comments: 24,
  },
  {
    id: "ig4",
    image: "/images/instagram/ig-4.jpg",
    alt: "Product detail shot",
    url: `${siteConfig.social.instagram}`,
    likes: 156,
    comments: 6,
  },
  {
    id: "ig5",
    image: "/images/instagram/ig-5.jpg",
    alt: "Lifestyle shot",
    url: `${siteConfig.social.instagram}`,
    likes: 278,
    comments: 15,
  },
  {
    id: "ig6",
    image: "/images/instagram/ig-6.jpg",
    alt: "Seasonal campaign",
    url: `${siteConfig.social.instagram}`,
    likes: 198,
    comments: 9,
  },
];

// Get social link by platform
export function getSocialLink(platform: string): SocialLink | undefined {
  return socialLinks.find((s) => s.platform.toLowerCase() === platform.toLowerCase());
}

// Get Instagram profile URL
export function getInstagramUrl(): string {
  return siteConfig.social.instagram;
}
