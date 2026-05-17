export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroHudCard {
  label: string;
  value: string;
  accent: "cyan" | "fuchsia" | "violet";
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  portraitUrl: string;
  hudCards: HeroHudCard[];
  effects: {
    particles: boolean;
    scene3d: boolean;
    scanLine: boolean;
    floatingPortrait: boolean;
  };
  neonColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  animationsEnabled: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  uploadedAt: string;
  thumbUrl: string;
  thumbSeed: string;
  category: string;
  featured: boolean;
  pinned: boolean;
  order: number;
  videoUrl?: string;
}

export interface BrandItem {
  id: string;
  name: string;
  tone: string;
  logoUrl: string;
  order: number;
}

export interface StatItem {
  key: string;
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}

export interface CommentItem {
  id: string;
  videoId: string;
  videoTitle: string;
  user: string;
  avatarUrl: string;
  avatarSeed: string;
  text: string;
  likes: number;
  time: string;
  pinned: boolean;
  spam: boolean;
}

export interface SocialLinks {
  telegram: string;
  telegramPartner: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  email: string;
  website: string;
}

export interface AboutExperience {
  title: string;
  period: string;
  description: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  bioParagraphs: string[];
  skills: string[];
  experience: AboutExperience[];
  aiTools: string[];
  services: string[];
  focus: string;
  vibe: string;
}

export interface ThemeConfig {
  neonPrimary: string;
  neonSecondary: string;
  backgroundColor: string;
  gradientOverlay: string;
  animationsEnabled: boolean;
  particlesEnabled: boolean;
  mouseGlowEnabled: boolean;
  glassBlur: number;
  darkMode: boolean;
  fontFamily: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  storagePath: string;
  type: "image" | "video";
  folder: string;
  size: number;
  createdAt: string;
}

export interface AnalyticsData {
  visitors: number;
  visitorsChange: number;
  pageViews: number;
  avgSessionSeconds: number;
  engagementRate: number;
  topVideos: Array<{ videoId: string; title: string; views: number }>;
  trafficByDay: Array<{ day: string; visits: number }>;
  devices: { desktop: number; mobile: number; tablet: number };
}

export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export interface SiteConfigDoc {
  hero: HeroContent;
  stats: StatItem[];
  social: SocialLinks;
  about: AboutContent;
  theme: ThemeConfig;
  settings: SiteSettings;
  updatedAt: string;
}

export interface SiteContent {
  config: SiteConfigDoc;
  videos: VideoItem[];
  brands: BrandItem[];
  comments: CommentItem[];
  analytics: AnalyticsData;
}
