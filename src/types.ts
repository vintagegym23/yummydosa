import type { DemoImageKey } from './data/demoImages';

export type MenuGroup =
  | 'dosa'
  | 'rava-dosa'
  | 'special-dosa'
  | 'south-indian'
  | 'starters'
  | 'chaat'
  | 'thali'
  | 'drinks'
  | 'desserts'
  | 'kids';

/** One real, named dish/drink from the reconciled Yummy Dosa menu (info.md) and its intended local photo. */
export interface MenuImageCatalogEntry {
  id: string;
  name: string;
  /** top-level folder under /images/menu/ */
  folder: MenuGroup;
  subcategory: string;
  /** intended local asset path. May not exist on disk yet -- DishImage falls back to a placeholder until it does. */
  image: string;
}

/** The centralized, full real menu item (src/data/menu.ts). No invented price/description. */
export interface MenuCatalogItem {
  id: string;
  name: string;
  /** real info.md category label, e.g. "Dosa Menu", "Desi Chaat" */
  category: string;
  /** broad hierarchy group folder, e.g. "dosa", "thali" */
  group: MenuGroup;
  image: string;
  isVeg: true;
  description?: string;
  price?: string;
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
