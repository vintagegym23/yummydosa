import { MENU_IMAGE_CATALOG } from './menuImageCatalog';
import { MenuCatalogItem, MenuGroup } from '../types';

/**
 * Single centralized menu dataset. Sourced entirely from the reconciled Yummy
 * Dosa menu in info.md (see MENU_IMAGE_CATALOG). No invented items, prices, or
 * descriptions -- info.md doesn't carry per-item prices or copy for the real
 * delivery-platform menu, so those fields are simply omitted rather than
 * fabricated. The whole menu is pure vegetarian (a verified, repeated claim
 * in info.md), so isVeg is true across the board.
 */
export const MENU_ITEMS: MenuCatalogItem[] = MENU_IMAGE_CATALOG.map((entry) => ({
  id: entry.id,
  name: entry.name,
  category: entry.subcategory,
  group: entry.folder as MenuGroup,
  image: entry.image,
  isVeg: true,
}));

/** Broad hierarchy groups for the /menu page, in display order. `image` is a representative dish id for the homepage category tiles. */
export const MENU_GROUPS: { id: MenuGroup; label: string; categories: string[]; image: string }[] = [
  { id: 'south-indian', label: 'South Indian Tiffin', categories: ['All-Time Favorites'], image: 'idly-dipped-in-sambar' },
  { id: 'dosa', label: 'Dosa', categories: ['Dosa Menu'], image: 'masala-dosa' },
  { id: 'rava-dosa', label: 'Rava Dosa', categories: ['Rava Dosa'], image: 'rava-dosa' },
  { id: 'special-dosa', label: 'Special Dosas', categories: ['Special Dosas', 'Yummy Dosa Special Dosas'], image: 'mysore-masala-dosa' },
  { id: 'starters', label: 'Starters & Soups', categories: ['Starters', 'Soups', 'Desi Snacks'], image: 'tandoori-paneer-tikka' },
  { id: 'chaat', label: 'Desi Chaat', categories: ['Desi Chaat'], image: 'pani-puri' },
  { id: 'kids', label: 'Kids Menu', categories: ['Kids Menu'], image: 'kids-pizza-dosa' },
  { id: 'thali', label: 'Thali', categories: ['Thalis', 'Extras'], image: 'madras-thali' },
  { id: 'drinks', label: 'Drinks', categories: ['Soft Drinks', 'Lassi & Milkshakes', 'Fresh Juices', 'Hot Drinks', 'Shakes / Dessert Drinks'], image: 'madras-filter-coffee' },
  { id: 'desserts', label: 'Desserts', categories: ['Ice Cream & Kulfi', 'Falooda', 'Waffles', 'Packaged Sweets & Snacks'], image: 'kulfi-falooda' },
];

/** A small, real-name subset used for homepage "Signature Dishes" preview. */
export const SIGNATURE_DISH_IDS = [
  'masala-dosa',
  'ghee-roast',
  'mysore-masala-dosa',
  'chilli-paneer-dosa',
  'madras-thali',
  'onion-rava-masala-dosa',
  'kulfi-falooda',
  'madras-filter-coffee',
];

export const SIGNATURE_DISHES: MenuCatalogItem[] = SIGNATURE_DISH_IDS
  .map((id) => MENU_ITEMS.find((item) => item.id === id))
  .filter((item): item is MenuCatalogItem => Boolean(item));

export function getMenuItem(id: string): MenuCatalogItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}

export function searchMenuItems(query: string): MenuCatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return MENU_ITEMS;
  return MENU_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
  );
}
