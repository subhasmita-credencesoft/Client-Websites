export type ImageSource = string;

export type CardItem = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: ImageSource;
  meta?: string;
};

export type DetailContent = {
  title: string;
  eyebrow: string;
  intro: string;
  paragraphs: string[];
  image: ImageSource;
  facts: string[];
  gallery?: ImageSource[];
  rates?: readonly { name: string; amount: string }[];
  availability?: string;
  roomId?: number;
  price?: string;
  occupancy?: string;
  facilities?: string[];
  extraGuestFee?: string;
};

export type ListingType =
  | 'bedrooms'
  | 'dining'
  | 'offers'
  | 'things-to-do'
  | 'blog';

export type DetailKind = 'bedrooms' | 'offers' | 'dining' | 'blog';

export type SectionConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  image: ImageSource;
  items: CardItem[];
};
