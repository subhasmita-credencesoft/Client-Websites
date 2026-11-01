export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', icon: 'mdi:instagram', href: 'https://www.instagram.com/malhar_baug_resort/' },
  { label: 'Facebook', icon: 'mdi:facebook', href: 'https://www.facebook.com/p/Malharbaug-Resort-61584448151255/' },
];

export const POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
] as const;
