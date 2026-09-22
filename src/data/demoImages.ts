import { DemoImage } from '../types';

/**
 * TEMPORARY DEMO PHOTOGRAPHY -- NOT Yummy Dosa's own photos.
 *
 * Every entry here is a real, free-to-use Unsplash photo (verified to load),
 * picked to visually represent a dish/venue category for this client demo.
 * `id` is the Unsplash photo id (the part after "photo-" in the CDN URL) --
 * `url(width)` builds a correctly-sized request against Unsplash's own
 * image-resizing CDN, so we never ship a full-resolution original.
 *
 * This file is the ONLY place demo photography is defined. Swapping in
 * Yummy Dosa's real photography later means editing MENU_DEMO_IMAGE / the
 * venue image constants below (or ultimately deleting this file once real
 * photos exist at the paths in menuImageCatalog.ts) -- no JSX changes.
 *
 * See MISSING_IMAGES.md for the real-photography gap this covers, and
 * IMAGE_AUDIT.md for the coverage report.
 */

function unsplash(id: string, description: string): DemoImage {
  return {
    id,
    description,
    source: 'Unsplash',
    sourceUrl: `https://unsplash.com/photos/${id}`,
    url: (width = 800) =>
      `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`,
  };
}

export const DEMO_IMAGES = {
  // -- Dosa (classic / rava / special / yummy-special) --
  dosaChutneySambar: unsplash('1668236543090-82eba5ee5976', 'Crispy dosa served with potato masala, sambar and three chutneys'),
  dosaBananaLeaf: unsplash('1694849789325-914b71ab4075', 'Crispy dosa with coconut chutney and sambar on a banana leaf'),
  dosaSilverTray: unsplash('1743517894265-c86ab035adef', 'Crispy dosa with dips on a silver tray'),
  dosaChutneys: unsplash('1751560455942-f859f1215826', 'Delicious dosa with chutneys, ready to be eaten'),
  dosaWithSides: unsplash('1743615467204-8fdaa85ff2db', 'A delicious dosa served with sides'),
  dosaThreeSauces: unsplash('1743615467363-250466982515', 'A dosa served with three dipping sauces'),

  // -- South Indian tiffin (idli / vada / pongal) --
  idliChutneyBananaLeaf: unsplash('1788621879512-0aefb7a774ff', 'Idli with spice powder, chutney and sambar on a banana leaf'),
  idliSambarCoffee1: unsplash('1741376509166-cbd74b608f5a', 'Idli and sambar served with filter coffee'),
  idliSambarCoffee2: unsplash('1741376509253-221ac18fac0f', 'Idli with sambar, chutney and coffee'),
  idliSambarCoffee3: unsplash('1741376509187-0b683c764294', 'Idli with chutneys and sambar, served with coffee'),
  vadaPlate: unsplash('1632104667384-06f58cb7ad44', 'A plate of fried lentil vada with dipping sauce'),
  naanBasket: unsplash('1756821753151-0879e7862e50', 'Basket of freshly baked flatbread with herbs'),

  // -- Thali --
  thaliSideDishes: unsplash('1742281257687-092746ad6021', 'Indian thali served with a variety of side dishes'),
  thaliPlatter: unsplash('1742281258189-3b933879867a', 'A delicious Indian meal on a platter'),
  thaliRoundTray: unsplash('1546833999-b9f581a1996d', 'Cooked South Indian food on a round tray'),
  thaliMetalTray: unsplash('1711153419402-336ee48f2138', 'Metal tray with an assortment of South Indian dishes'),
  thaliRiceVariety: unsplash('1742281257707-0c7f7e5ca9c6', 'Indian thalis with rice and a variety of dishes'),
  thaliRiceSouthAsian: unsplash('1743674453123-93356ade2891', 'Plate of rice with South Asian side dishes'),

  // -- Curries / paneer / starters --
  curryMetalBowl: unsplash('1631452180519-c014fe946bc7', 'Curry in a metal bowl served with rice'),
  curryBlackPot: unsplash('1596797038530-2c107229654b', 'Curry cooked in a traditional black pot'),
  curryGreenVeg: unsplash('1588166524941-3bf61a9c41db', 'Green vegetable curry on a white plate'),
  curryWhiteBowlStew: unsplash('1690401767645-595de0e0e5f8', 'A rich stew-style curry in a white bowl'),
  paneerTikkaSkewers: unsplash('1788843304145-bec146aa83c5', 'Marinated paneer, mushroom and bell pepper skewers'),
  vegFriedRice: unsplash('1788600448092-0cc9b007b8ec', 'Indo-Chinese style vegetable fried rice'),

  // -- Chaat / snacks / starters --
  paniPuriPlates: unsplash('1781243680771-1fea4521e196', 'Pani puri served on paper plates'),
  samosaGreenChilli: unsplash('1601050690597-df0568f70950', 'Golden fried samosas with green chilli and pomegranate'),
  samosaLettuce: unsplash('1767469576715-a4eb8bcfa204', 'Golden samosas served on a bed of lettuce'),
  samosaNapkin: unsplash('1772729996007-40bad08b3c40', 'Golden fried samosas served on a white napkin'),
  pakoraPlate: unsplash('1765360024331-25b63e85272e', 'A plate of golden brown pakora fritters'),
  pakoraVegFritters: unsplash('1767114915965-7abe87d7c7d8', 'Green vegetable fritters with onion'),

  // -- Drinks --
  mangoLassiGlass: unsplash('1623065422902-30a2d299bbe4', 'A glass of mango lassi-style smoothie'),
  freshJuiceOrange1: unsplash('1600271886742-f049cd451bba', 'Fresh orange juice in a clear glass'),
  freshJuiceOrange2: unsplash('1613478223719-2ab802602423', 'Fresh orange juice in a clear glass'),
  freshJuiceTrio: unsplash('1583577612013-4fecf7bf8f13', 'Three fresh juices in clear glasses'),
  freshJuiceLemon: unsplash('1618046364546-81e9d03d39a6', 'Fresh juice with a slice of lemon'),
  strawberryMilkshake: unsplash('1579954115545-a95591f28bfc', 'Strawberry milkshake in a clear glass'),
  chocolateMilkshake: unsplash('1577805947697-89e18249d767', 'Cream and chocolate filled milkshake'),
  filterCoffeePour: unsplash('1758387941825-a6ecaec9c14d', 'Traditional South Indian brass filter coffee'),
  filterCoffeeCup: unsplash('1757918391899-1341f7b285fb', 'A small metal cup of frothy South Indian coffee'),
  masalaChaiPot: unsplash('1619581073186-5b4ae1b0caad', 'Masala chai in traditional clay cups'),

  // -- Desserts --
  faloodaGlass1: unsplash('1630823186728-b17c9f82a32d', 'Rose falooda in a clear glass'),
  faloodaGlass2: unsplash('1630823184409-1c6014968038', 'Rose falooda in a clear drinking glass'),
  faloodaGlass3: unsplash('1630823183554-21c9702297f4', 'Falooda on a table'),
  faloodaGlass4: unsplash('1630823185508-53c3c6566660', 'Falooda in a clear glass cup'),
  iceCreamGlass1: unsplash('1594488506255-a8bbfdeedbaf', 'Ice cream served in a clear glass cup'),
  iceCreamGlass2: unsplash('1619158403521-ed9795026d47', 'Ice cream served in a clear glass cup'),
  iceCreamBerries: unsplash('1600718374662-0483d2b9da44', 'Ice cream topped with red and blue berries'),
  iceCreamPinkPlate: unsplash('1611928237590-087afc90c6fd', 'Pink ice cream on a white ceramic plate'),
  waffleIceCream: unsplash('1562513872-634b8fae6dbe', 'Waffle served with vanilla ice cream'),
  waffleSyrup: unsplash('1656517092618-0902a2f8b5ac', 'A plate of waffles with syrup'),
  waffleChocolate: unsplash('1634215751955-5bdb12db6c0c', 'A waffle covered in chocolate sauce'),
  indianSweetsShop: unsplash('1758910536889-43ce7b3199fd', 'Assortment of colourful Indian sweets'),
  indianSweetsTray: unsplash('1680993032090-1ef7ea9b51e5', 'A tray of Indian sweets and savouries'),

  // -- Venue / experience imagery (not tied to a specific dish) --
  restaurantInterior: unsplash('1751200503125-d8cb239f95ba', 'An Indian restaurant dining room'),
  restaurantWindow: unsplash('1764955193589-f5db4261e02c', 'A restaurant storefront window'),
  restaurantExterior: unsplash('1779912602687-c0d380ce3c76', 'A restaurant exterior with awning and signage'),
  banquetRoundTables: unsplash('1768851142332-75f3d1b47452', 'An elegant banquet hall set for an event with round tables'),
  banquetBallroom: unsplash('1780593116478-c46838f86523', 'A luxurious ballroom set for an event'),
  banquetFormalHall: unsplash('1783314867628-220ab03cac99', 'An elegant hall set up for a formal event'),
  cateringChafingDishes: unsplash('1555244162-803834f70033', 'A buffet table with chafing dishes of food'),
  cateringBuffetTable: unsplash('1696940823960-ee5242bddc47', 'A buffet table with many plates of food'),
  cateringSpread: unsplash('1722477936580-84aa10762b0b', 'A buffet spread with many types of food'),
  chefProfessionalKitchen: unsplash('1744413922991-0c2ea966b1fc', 'Chefs preparing food in a professional kitchen'),
  chefNightKitchen: unsplash('1765735049473-7cb6466e5b3f', 'A chef working in a commercial kitchen'),
  diningGroupRestaurant: unsplash('1508424757105-b6d5ad9329d0', 'A group of people dining together in a restaurant'),
  diningTalking: unsplash('1528605248644-14dd04022da1', 'People sitting at a table talking and eating'),
} as const;

export type DemoImageKey = keyof typeof DEMO_IMAGES;
