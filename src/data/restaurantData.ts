import { LocationItem, FeaturePillar } from '../types';
import { BUSINESS } from './content';

/**
 * Core restaurant identity. Contact details, address and hours are the real,
 * verified values from info.md (Yummy Dosa, 68 Cranbrook Rd, Ilford) -- see
 * src/data/content.ts / BUSINESS for the source of truth. logoUrl/heroBg/
 * signatureDosaImg are the existing approved decorative brand imagery kept
 * from the original homepage design.
 */
export const RESTAURANT_INFO = {
  name: BUSINESS.legalName,
  tagline: 'South Indian Kitchen',
  subTagline: 'Authentic & Pure Vegetarian',
  displayPhone: BUSINESS.phoneDisplay,
  phoneIntl: BUSINESS.phoneIntl,
  email: BUSINESS.email,
  whatsappUrl: `https://wa.me/${BUSINESS.phoneDigits}`,
  hours: BUSINESS.hours,
  hoursShort: 'Mon–Fri 8AM–11PM · Sat–Sun 9AM–11PM',
  heroBg: '/images/hero-bg.png',
  get signatureDosaImg() {
    return this.heroBg;
  },
};

export const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: 'pillar-1',
    title: 'Unlimited Variety',
    description: 'Over 80+ varieties of dosas, idlis, and snacks',
    iconName: 'utensils',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
  {
    id: 'pillar-2',
    title: 'Hygienic & Healthy',
    description: 'Clean, safe & pure vegetarian cooking standards',
    iconName: 'sparkles',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'pillar-3',
    title: 'Fresh Ingredients',
    description: 'Fresh stone-ground batter & pure cow ghee daily',
    iconName: 'basket',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
  {
    id: 'pillar-4',
    title: 'Ultimate Experience',
    description: 'Warm South Indian hospitality & joyful dining',
    iconName: 'concierge',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'pillar-5',
    title: 'Rooted Flavours',
    description: 'Generations-old heirloom spice masalas & taste',
    iconName: 'pepper',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
];

/** Yummy Dosa has one confirmed real address (info.md) -- previously this listed three fictional branches. */
export const LOCATIONS: LocationItem[] = [
  {
    id: 'ilford',
    name: 'Yummy Dosa, Ilford',
    address: BUSINESS.address.full,
    phone: BUSINESS.phoneDisplay,
  },
];
