import type { DemoImageKey } from './data/demoImages';

/** Broad menu sections, shown as the category pills on /menu. */
export type MenuGroup =
  | 'tiffin'
  | 'dosa'
  | 'special-dosa'
  | 'rava-dosa'
  | 'uthappam'
  | 'starters'
  | 'chaat'
  | 'thali'
  | 'curries'
  | 'rice-noodles'
  | 'kids'
  | 'desserts'
  | 'drinks'
  | 'extras';

/** Dietary/allergen markers from the printed menu's legend. */
export type DietTag = 'N' | 'G' | 'V' | 'J' | 'D';

/** One dish/drink from the client's printed food menu (src/data/menu.ts). */
export interface MenuCatalogItem {
  id: string;
  name: string;
  /** printed menu section heading, e.g. "Your Favorite Dosa's", "Desi Chat" */
  category: string;
  group: MenuGroup;
  price: string;
  description?: string;
  tags: DietTag[];
  /** key into MENU_PHOTOS; absent when no relevant free photo exists (placeholder shown) */
  photo?: import('./data/menuPhotos').MenuPhotoKey;
  isVeg: true;
}

/**
 * A temporary demo photo (see src/data/demoImages.ts) -- a real, free-to-use
 * Unsplash image standing in for Yummy Dosa's own photography until the
 * client supplies it.
 */
export interface DemoImage {
  /** Unsplash photo id */
  id: string;
  description: string;
  source: 'Unsplash';
  sourceUrl: string;
  /** builds a sized Unsplash CDN request URL */
  url: (width?: number) => string;
}

export interface JobOpening {
  id: string;
  title: string;
  summary: string;
  responsibilities: string[];
  location: string;
  contact: { name?: string; phone?: string; email?: string };
  /** Optional fuller advert, shown when the listing is opened. */
  intro?: string;
  employment?: 'Full-Time' | 'Part-Time';
  /** Gross annual salary in GBP. */
  salaryPerYear?: number;
  hoursPerWeek?: number;
  reportsTo?: string;
  requirements?: string[];
  /**
   * ISO date the advert was published. Only listings with a date get JobPosting structured
   * data (Google for Jobs); remove the listing once the role is filled.
   */
  datePosted?: string;
}

export interface GalleryImage {
  id: string;
  category: 'Food' | 'Restaurant' | 'Banquet Hall' | 'Catering';
  title: string;
  /** id into MENU_IMAGE_MAP when this is a specific dish photo. */
  imageId?: string;
  /** key into DEMO_IMAGES (src/data/demoImages.ts) for venue/event photos not tied to a dish. */
  demoImageKey?: DemoImageKey;
}

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface FeaturePillar {
  id: string;
  title: string;
  description: string;
  iconName: 'utensils' | 'sparkles' | 'basket' | 'concierge' | 'pepper';
  bgColor: string;
  textColor: string;
  borderColor: string;
}
