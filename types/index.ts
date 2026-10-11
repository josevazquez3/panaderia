export type SiteSettings = {
  id: number;
  bakeryName: string;
  logoUrl: string | null;
  email: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
};

export type ContentKey = "origin" | "mission";

export type SiteContentBlock = {
  key: ContentKey;
  title: string;
  body: string;
};

export type SiteContent = Record<ContentKey, SiteContentBlock>;

export type CarouselImage = {
  id: number;
  imageUrl: string;
  alt: string;
  position: number;
  active: boolean;
};
