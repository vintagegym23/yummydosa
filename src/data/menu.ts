import { DietTag, MenuCatalogItem, MenuGroup } from '../types';
import { MenuPhotoKey } from './menuPhotos';

/**
 * The Yummy Dosa food menu, transcribed from the client's printed menu
 * (client-resources: "Yummy dosa menu.pdf", pages 2-11). Prices, descriptions and
 * dietary tags are as printed; section headings are verbatim, item names have only
 * obvious typos corrected. Every item is pure vegetarian.
 *
 * Each item has a `photo` (src/data/menuPhotos.ts): Yummy Dosa's own photo (`own/...`)
 * where supplied, otherwise a freely licensed photo, shared between variants of a dish.
 */

type Row = [name: string, price: string, tags: DietTag[], photo: MenuPhotoKey | null, description?: string];

interface Section {
  category: string;
  group: MenuGroup;
  /** extra line printed under the section heading */
  note?: string;
  /** tags printed on the section heading, applied to every item in it */
  tags?: DietTag[];
  /** prefix for item ids, for names that repeat in another section */
  idPrefix?: string;
  items: Row[];
}

const SECTIONS: Section[] = [
  {
    category: 'Soups',
    group: 'starters',
    items: [
      ['Rasam', '£3.39', ['V'], 'rasam', 'A tangy and spicy South Indian soup made with tamarind, tomatoes and aromatic spices.'],
      ['Cream of Tomato Soup', '£4.29', ['J', 'D'], 'tomato-soup', 'A rich and velvety soup made with fresh tomatoes, cream and a touch of seasoning.'],
      ['Sweet Corn Soup', '£4.49', ['V', 'J'], 'sweet-corn-soup', 'A light and comforting soup made with sweet corn, flavourful broth and a hint of seasoning.'],
      ['Veg Manchow Soup', '£4.99', ['V', 'J'], 'manchow-soup', 'A spicy and tangy vegetable soup topped with crispy noodles, packed with bold Indo-Chinese flavours.'],
      ['Veg Hot & Sour Soup', '£4.99', ['V', 'J'], 'hot-sour-soup', 'A zesty Indo-Chinese soup with mixed vegetables, with a perfect balance of heat and tang.'],
      ['Lentil Soup', '£3.99', ['V', 'J'], 'lentil-soup', 'A hearty and wholesome soup made with lentils, vegetables and flavourful spices.'],
    ],
  },
  {
    category: 'Desi Snacks',
    group: 'starters',
    items: [
      ['Masala Papadams (2 Nos)', '£3.49', ['V', 'J'], 'masala-papad', 'Crispy papad topped with a tangy mix of onions, tomatoes, spices and fresh herbs.'],
      ['Masala Vada (4 Nos)', '£4.29', ['V'], 'masala-vada', 'Crispy fried lentil patties mixed with onions, spices and fresh herbs, packed with flavour.'],
      ['Medhu Vada (2 Nos)', '£3.99', ['V', 'J'], 'own/medhu-vada', 'Crispy, golden deep-fried doughnuts made from ground urad dal, seasoned with pepper, spices and herbs.'],
      ['Mysore Bonda (4 Nos)', '£5.99', ['V', 'J'], 'own/mysore-bonda', 'Soft and fluffy fried dumplings made from a spiced gram flour batter, served as a savoury snack.'],
      ['Mix Bajji Platter (6 Nos – Potato / Onion / Chilli)', '£5.99', ['V', 'J'], 'bajji', 'Indian street delight: your choice of the vegetables above coated in besan flour blended with traditional spices and deep fried – served with chutneys.'],
      ['Aloo Bonda (4 Nos)', '£5.49', ['V', 'J'], 'aloo-bonda', 'Spiced potato filling coated in a gram flour batter and deep fried until golden and crispy.'],
      ['Veg Samosas (4 Nos)', '£4.99', ['G', 'V'], 'samosa', 'Golden fried pastry with seasoned mixed vegetables and Indian spices.'],
      ['Punjabi Samosa (3 Nos)', '£4.99', ['J', 'G', 'V'], 'punjabi-samosa', 'A flaky, crisp Indian snack with a flavourful potato and peas filling.'],
      ['Dahi Vada (2 Nos) – Salt or Sweet', '£4.99', ['J', 'D'], 'dahi-vada', 'Soft lentil vadas soaked in creamy yogurt, topped with tangy tamarind chutney and spices.'],
      ['Medhu Vada Dipped in Rasam (2 Nos)', '£4.99', ['V'], 'rasam-vada', 'Crispy medhu vadas soaked in flavourful rasam – a deliciously tangy and spicy combination.'],
      ['Medhu Vada Dipped in Sambar (2 Nos)', '£4.99', ['V', 'J'], 'sambar-vada', 'Crispy medhu vadas soaked in flavourful sambar – a deliciously soft and savoury treat.'],
    ],
  },
  {
    category: 'Desi Chat',
    group: 'chaat',
    items: [
      ['Pani Puri', '£5.49', ['J', 'G', 'V'], 'pani-puri', 'Crispy puris filled with spicy, tangy water, tamarind chutney and a mix of potatoes and chickpeas.'],
      ['Bhel Puri', '£5.29', ['J', 'V'], 'bhel-puri', 'Crispy puffed rice with sweet, sour and spicy chutneys and crunchy sev.'],
      ['Dahi Puri', '£5.29', ['J', 'G', 'D'], 'dahi-puri', 'Crispy puris topped with creamy yogurt, tangy tamarind chutney and a blend of spices – a refreshing bite.'],
      ['Sev Puri', '£5.29', ['G', 'V', 'J'], 'own/sev-puri', 'Crispy puris topped with mashed potatoes, tangy tamarind chutney, yogurt, sev and a blend of spices for a burst of flavour.'],
      ['Aloo Papdi Chaat', '£5.29', ['J', 'D'], 'papdi-chaat', 'A crunchy and tangy snack made with crispy papdis, spiced potatoes, chutneys, yogurt and sev.'],
      ['Samosa Channa', '£5.99', ['G', 'D'], 'samosa-chaat', 'Crispy samosas served with spiced chickpeas, tangy chutneys, yogurt and a sprinkle of fresh herbs.'],
      ['Aloo Tikki', '£5.99', ['V', 'D'], 'aloo-tikki', 'Crispy potato patties topped with yogurt, chutneys and fresh chaat toppings.'],
      ['Khasta Kachori Chaat', '£5.99', ['G', 'D'], 'kachori-chaat', 'Flaky kachoris topped with spiced chickpeas, tangy chutneys, yogurt and crispy sev.'],
      ['Pav Bhaji', '£6.29', ['G', 'D'], 'own/pav-bhaji', 'A flavourful mashed vegetable curry served with buttery pav buns, garnished with onions and lemon.'],
    ],
  },
  {
    category: 'Kids Menu',
    group: 'kids',
    idPrefix: 'kids-',
    items: [
      ['Potato Fries', '£4.99', ['J', 'V'], 'french-fries', 'Crispy deep-fried potato fries.'],
      ['Chocolate Dosa', '£6.99', ['D', 'J'], 'chocolate-dosa', 'A sweet, crispy dosa filled with melted chocolate – a deliciously indulgent twist on the classic dish.'],
      ['Cheese Dosa', '£7.49', ['D', 'J'], 'own/cheese-dosa', 'A crispy dosa filled with melted cheese – a deliciously savoury, cheesy twist on the traditional dish.'],
      ['Cheese & Sweet Corn Dosa', '£7.25', ['D', 'J'], 'own/kids-cheese-and-sweet-corn-dosa', 'A crispy dosa filled with a savoury blend of melted cheese and sweet corn – deliciously creamy.'],
      ['Sweet Corn Paneer Dosa', '£7.49', ['J', 'D'], 'own/kids-sweet-corn-paneer-dosa', 'A crispy dosa stuffed with a flavourful mix of sweet corn and paneer – creamy and savoury.'],
      ['Kids Pizza Dosa', '£7.49', ['J', 'D'], 'pizza-dosa', 'A fun, healthy kids’ pizza dosa topped with fresh raw vegetables, pizza sauce and cheese – a tasty, nutritious meal.'],
      ['Cone Shaped Ghee Dosa', '£7.49', ['J', 'D'], 'own/cone-shaped-ghee-dosa', 'A crispy, cone-shaped dosa drizzled with ghee – rich and savoury in every bite.'],
      ['Mini Idly (14 Nos)', '£6.29', ['J', 'V'], 'mini-idli', 'Bite-sized steamed idlis served with sambar and chutney – perfect for a light, flavourful snack.'],
      ['Mild Veg Noodles', '£7.49', ['J', 'G', 'V'], 'hakka-noodles', 'A mild vegetable noodle dish, stir-fried with fresh vegetables and light seasoning – a comforting meal.'],
    ],
  },
  {
    category: 'Starters',
    group: 'starters',
    items: [
      ['Paneer 65', '£8.79', ['J', 'G', 'D'], 'paneer-65', 'Diced paneer marinated in Yummy Dosa’s special spices and deep fried.'],
      ['Gobi 65', '£7.79', ['J', 'G', 'V'], 'own/gobi-65', 'Cauliflower florets marinated in Yummy Dosa’s special spices and deep fried.'],
      ['Mushroom 65', '£7.79', ['V', 'J', 'G'], 'mushroom-65', 'Fried mushroom marinated in Yummy Dosa’s special spices.'],
      ['Chilli Paneer', '£8.99', ['J', 'G', 'D'], 'chilli-paneer', 'Crispy cottage cheese tossed in Yummy Dosa’s special sauce.'],
      ['Chilli Mushroom', '£7.79', ['J', 'G', 'V'], 'mushroom-manchurian', 'Mushroom with bright Indian and Chinese flavours.'],
      ['Chilli Gobi', '£7.79', ['V', 'G', 'J'], 'chilli-gobi', 'Cauliflower with bright Indian and Chinese flavours.'],
      ['Chilli Parotta', '£7.79', ['J', 'G', 'V'], 'chilli-parotta', 'Torn pieces of semi-dry parotta stir-fried with a touch of spices, sauces and herbs.'],
      ['Chilli Mogo', '£7.79', ['J', 'G', 'V'], 'mogo', 'Wedges of cassava cooked through in a thick medley of spice.'],
      ['Spicy Masala Mogo', '£7.99', ['J', 'G', 'V'], 'masala-mogo', 'Wedges of cassava cooked through in a thick medley of spice and Yummy Dosa’s special sauce.'],
      ['Chilli Idly', '£7.99', ['J', 'V'], 'chilli-idli', 'An Indo-Chinese appetiser of stir-fried steamed rice cakes in a variety of sauces and spices.'],
    ],
  },
  {
    category: 'Yummy Dosa Special Starter',
    group: 'starters',
    note: 'Available at 10:00 AM - 10:45 PM',
    items: [
      ['Veg Manchurian', '£7.99', ['V', 'G'], 'own/veg-manchurian', 'Veg dumplings tossed in Yummy Dosa’s special in-house sauce.'],
      ['Gobi Manchurian', '£7.99', ['V', 'G', 'J'], 'own/gobi-manchurian', 'Fried cauliflower florets sautéed in Yummy Dosa’s Manchurian sauce.'],
      ['Paneer Manchurian', '£8.99', ['D', 'G', 'J'], 'own/paneer-manchurian', 'Batter-fried paneer tossed in Yummy Dosa’s special in-house sauce.'],
      ['Paneer Schezwan', '£8.99', ['D', 'G', 'J'], 'own/paneer-schezwan', 'Crisp paneer tossed in a sweet and spicy sauce.'],
      ['Mushroom Manchurian', '£7.99', ['V', 'G', 'J'], 'own/mushroom-manchurian', 'Fried mushrooms sautéed in Yummy Dosa’s Manchurian sauce.'],
      ['Baby Corn Manchurian', '£7.99', ['V', 'G', 'J'], 'babycorn-manchurian', 'Fried baby corn sautéed in Yummy Dosa’s Manchurian sauce.'],
      ['Veg Ball in Hot Garlic Sauce', '£8.49', ['V', 'G'], 'own/veg-ball-in-hot-garlic-sauce', 'Veg dumplings tossed in Yummy Dosa’s special in-house ginger garlic sauce.'],
      ['Tandoori Paneer Tikka', '£9.29', ['D'], 'own/tandoori-paneer-tikka', 'Chunks of cottage cheese marinated in Yummy Dosa’s special herbs and spices, grilled in a clay oven.'],
    ],
  },
  {
    category: 'Any Timers',
    group: 'tiffin',
    items: [
      ['Upma / Upma with Vada', '£5.59 / £6.29', ['G'], 'own/upma', 'Soft, savoury semolina upma – add a crispy medhu vada for a perfect South Indian breakfast combo.'],
      ['Ghee Pongal / Ghee Pongal with Vada', '£5.99 / £6.49', ['D', 'N', 'J'], 'own/ghee-pongal', 'Creamy ghee pongal – add a crispy medhu vada for a delightful South Indian breakfast.'],
      ['Podi Idly', '£5.99', ['V', 'J'], 'podi-idli', 'Soft idlis coated with flavourful podi (spiced lentil powder) – a delicious South Indian treat.'],
      ['Idly (3 Nos) or Idly (2 Nos) & Vada (1 No)', '£4.99', ['V', 'J'], 'idli-vada', 'Steamed rice cakes served with chutneys and lentil sambar.'],
      ['Mini Idly (14 Nos)', '£6.29', ['V', 'J'], 'mini-idli', 'Bite-sized steamed idlis served with sambar and chutney – perfect for a light, flavourful snack.'],
      ['Ghee Podi Idly', '£6.99', ['D', 'J'], 'ghee-podi-idli', 'Soft idlis tossed with aromatic podi and ghee – a rich, flavourful South Indian delicacy.'],
      ['Idly Dipped in Sambar (2 Nos)', '£5.49', ['J', 'V'], 'sambar-idli', 'Soft steamed idlis soaked in flavourful, tangy sambar – comforting and delicious.'],
      ['Kaima Idly', '£6.49', ['V'], 'kaima-idli', 'Soft idlis tossed in our signature in-house gravy and aromatic South Indian spices.'],
      ['Chappathi Kurma (2 Nos)', '£5.99', ['V', 'G'], 'chapati-kurma', 'Two soft chapathis served with a rich, flavourful mixed vegetable kurma.'],
      ['Parotta Kurma (2 Nos)', '£6.59', ['V', 'G'], 'own/parotta-kurma', 'Two flaky, soft parottas served with a rich, aromatic mixed vegetable kurma – a hearty meal.'],
      ['Poori Masala or Kurma (2 Nos)', '£6.29', ['V', 'G'], 'own/poori-masala-or-kurma', 'Two fluffy pooris served with either a spiced potato masala or a rich vegetable kurma.'],
      ['Chole Bhatura (2 Nos)', '£7.49', ['V', 'G'], 'own/chole-bhatura', 'Two soft, fluffy bhaturas served with a hearty spiced chickpea curry (chole).'],
      ['Aloo Parotta (with Curd & Pickle)', '£5.99', ['D', 'G'], 'aloo-paratha', 'Soft, flaky aloo parottas served with refreshing curd and tangy pickle.'],
    ],
  },
  {
    category: 'Combo Deal (Breakfast & Lunch)',
    group: 'tiffin',
    items: [
      ['Mini Tiffin', '£8.49', [], 'own/mini-tiffin', '2 pcs Idly, 1 pc Vada, Ghee Pongal or Upma, Mini Masala Dosa or Poori, and Sweet.'],
      ['Mini Lunch Combo', '£8.49', [], 'mini-meals', 'Sambar Rice, Curd Rice, Veg Biryani, Chapathi, Poriyal, Sweet, Papadam and Pickle.'],
    ],
  },
  {
    category: "Your Favorite Dosa's",
    group: 'dosa',
    items: [
      ['Plain Dosa', '£5.29', ['V', 'J'], 'own/plain-dosa', 'A simple, soft dosa made from fermented rice and urad dal batter – light with a crispy texture.'],
      ['Masala Dosa', '£6.29', ['V', 'J'], 'own/masala-dosa', 'A crispy dosa filled with a spiced potato filling, served with chutneys and sambar.'],
      ['Onion Dosa', '£6.29', ['V'], 'own/onion-dosa', 'A crispy dosa topped with sautéed onions and spices – a savoury twist on the classic.'],
      ['Onion Masala Dosa', '£7.29', ['V'], 'own/onion-masala-dosa', 'A crispy dosa filled with spiced potato and onion, served with chutneys and sambar.'],
      ['Podi Dosa', '£6.29', ['V'], 'own/podi-dosa', 'A crispy dosa sprinkled with aromatic podi (spiced lentil powder) and drizzled with ghee.'],
      ['Podi Masala Dosa', '£7.29', ['V'], 'own/podi-masala-dosa', 'A crispy dosa filled with spiced potato, sprinkled with podi (spiced lentil powder) and drizzled for extra flavour.'],
      ['Ghee Roast', '£7.49', ['J', 'D'], 'own/ghee-roast', 'A thin, extra-crispy dosa roasted with ghee.'],
      ['Ghee Masala Dosa', '£7.99', ['J', 'D'], 'own/ghee-masala-dosa', 'A ghee-roasted dosa filled with seasoned potato masala.'],
      ['Ghee Podi Dosa', '£7.99', ['D'], 'own/ghee-podi-dosa', 'A ghee-roasted dosa sprinkled with podi (spiced lentil powder).'],
      ['Ghee Podi Masala Dosa', '£8.49', ['J', 'D'], 'own/ghee-podi-masala-dosa', 'A ghee-roasted podi dosa filled with seasoned potato masala.'],
      ['Butter Dosa', '£7.49', ['J', 'D'], 'own/butter-dosa', 'A thin rice crepe filled with butter.'],
      ['Butter Masala Dosa', '£7.99', ['J', 'D'], 'own/butter-masala-dosa', 'Dosa filled with butter and seasoned potato masala.'],
      ['Cheese Dosa', '£7.49', ['J', 'D'], 'own/cheese-dosa', 'Dosa filled with shredded mozzarella cheese.'],
      ['Cheese Masala Dosa', '£7.99', ['J', 'D'], 'own/cheese-masala-dosa', 'Dosa filled with shredded mozzarella cheese and seasoned potato masala.'],
      ['Palak Dosa', '£6.99', ['J', 'V'], 'own/palak-dosa', 'Dosa made of rice and spinach.'],
      ['Palak Masala Dosa', '£7.49', ['J', 'V'], 'own/palak-masala-dosa', 'A thin rice and spinach crepe with seasoned potato masala.'],
    ],
  },
  {
    category: "Special Dosa's",
    group: 'special-dosa',
    items: [
      ['Mysore Masala Dosa', '£7.29', ['V'], 'own/mysore-masala-dosa', 'Spread with spicy house chutney and filled with seasoned potato masala.'],
      ['Mysore Masala Butter Dosa', '£7.99', ['D'], 'own/mysore-masala-butter-dosa', 'Spread with spicy house chutney and filled with seasoned potato masala and butter.'],
      ['Mysore Masala Cheese Dosa', '£8.49', ['D'], 'own/mysore-masala-cheese-dosa', 'Spread with spicy house chutney, filled with seasoned potato masala and shredded mozzarella cheese.'],
      ['South Special Chettinad Masala Dosa', '£8.49', ['V'], 'own/south-special-chettinad-masala-dosa', 'A thin rice crepe spread with a mixed masala of Chettinad spices and vegetables.'],
      ['Paneer Masala Dosa', '£8.99', ['D'], 'own/paneer-masala-dosa', 'A thin rice crepe spread with paneer masala.'],
      ['Nilagiri Masala Dosa', '£8.49', ['V'], 'own/nilagiri-masala-dosa', 'Special mint, coriander and green chilli chutney spread evenly on the dosa and stuffed with mashed potato masala.'],
      ['Cheese & Sweet Corn Chilli Dosa', '£8.49', ['D', 'J'], 'own/cheese-and-sweet-corn-chilli-dosa', 'Sweet corn, chilli and cheese spread on a dosa.'],
      ['Pav Bhaji Dosa', '£8.49', ['D'], 'pav-bhaji-dosa', 'Dosa spread with Yummy Dosa’s special pav bhaji masala.'],
      ['Pav Bhaji Masala Dosa', '£8.99', ['D'], 'own/pav-bhaji-masala-dosa', 'Spread with pav bhaji masala and filled with seasoned potato masala.'],
      ['Cheese Pav Bhaji Masala Dosa', '£9.29', ['D'], 'own/cheese-pav-bhaji-masala-dosa', 'Spread with pav bhaji masala and cheese, filled with seasoned potato masala.'],
    ],
  },
  {
    category: "Indo-Chinese Dosa's",
    group: 'special-dosa',
    items: [
      ['Chilli Garlic Podi Dosa', '£8.49', ['V'], 'own/chilli-garlic-podi-dosa', 'Spicy lentil and garlic powder and chilli topped on a thin crepe.'],
      ['Chilli Garlic Podi & Cheese Dosa', '£8.99', ['D'], 'own/chilli-garlic-podi-and-cheese-dosa', 'A thin crepe filled with cheese, chilli, lentil and garlic powder.'],
      ['Chilli Garlic Podi & Cheese Masala Dosa', '£9.29', ['D'], 'own/chilli-garlic-podi-and-cheese-masala-dosa', 'A rice and lentil crepe stuffed with garlic sauce and potatoes.'],
      ['Chilli Paneer Dosa', '£9.99', ['J', 'D', 'G'], 'own/chilli-paneer-dosa', 'Chilli paneer spread on a thin crepe.'],
      ['Paneer Manchurian Dosa', '£9.99', ['J', 'D', 'G'], 'own/paneer-manchurian-dosa', 'A crispy rice crepe flavoured with special paneer Manchurian masala.'],
      ['Veg Manchurian Dosa', '£9.49', ['G', 'V'], 'own/veg-manchurian-dosa', 'A thin crepe made of rice topped with mixed vegetable Manchurian masala.'],
      ['Mushroom Manchurian Dosa', '£9.49', ['J', 'V', 'G'], 'own/mushroom-manchurian-dosa', 'Mushroom Manchurian masala spread on the crepe.'],
      ['Schezwan Noodles Dosa', '£9.49', ['G', 'V'], 'own/schezwan-noodles-dosa', 'A thin rice crepe topped with Yummy Dosa’s special sauce and Schezwan noodles.'],
      ['Veg Pizza Dosa', '£8.99', ['D', 'J'], 'own/veg-pizza-dosa', 'A rice and lentil crepe topped with onion, capsicum, mixed vegetables, pizza sauce and toppings.'],
    ],
  },
  {
    category: "Love your Rava Dosa's",
    group: 'rava-dosa',
    items: [
      ['Rava Dosa', '£6.49', ['J', 'V', 'G'], 'own/rava-dosa', 'A popular dosa with a difference – made with semolina.'],
      ['Rava Masala Dosa', '£6.99', ['J', 'V', 'G'], 'own/rava-masala-dosa', 'Semolina dosa filled with seasoned potato masala.'],
      ['Onion Rava Dosa', '£6.99', ['G', 'V'], 'own/onion-rava-dosa', 'Semolina dosa topped with chopped onions.'],
      ['Onion Rava Masala Dosa', '£7.49', ['G', 'V'], 'own/onion-rava-masala-dosa', 'Semolina dosa topped with chopped onions and seasoned potato masala.'],
      ['Ghee Rava Dosa', '£7.49', ['J', 'D', 'G'], 'own/ghee-rava-dosa', 'Semolina dosa filled with ghee.'],
      ['Ghee Rava Masala Dosa', '£7.99', ['J', 'D', 'G'], 'own/ghee-rava-masala-dosa', 'Rava dosa filled with ghee and seasoned potato masala.'],
      ['Butter Rava Dosa', '£7.49', ['J', 'D', 'G'], 'own/butter-rava-dosa', 'A dosa with a difference – made with semolina and filled with butter.'],
      ['Butter Rava Masala Dosa', '£7.99', ['J', 'D', 'G'], 'own/butter-rava-masala-dosa', 'Rava dosa made with semolina, filled with butter and seasoned potato masala.'],
      ['Dry Fruit Rava Dosa', '£7.99', ['N', 'V', 'G'], 'own/dry-fruit-rava-dosa', 'A thin semolina crepe filled with nuts and dry fruits.'],
      ['Cheese Rava Dosa', '£7.99', ['J', 'D'], 'own/cheese-rava-dosa', 'Semolina crepe topped with melted cheese – a delicious blend of crunchy texture and rich flavour.'],
      ['Cheese Rava Masala Dosa', '£8.49', ['J', 'G', 'D'], 'own/cheese-rava-masala-dosa', 'Rava dosa filled with shredded mozzarella cheese and potato masala.'],
    ],
  },
  {
    category: "Desi Pizza's (Uthappam's)",
    group: 'uthappam',
    items: [
      ['Plain Uthappam', '£4.99', ['J', 'V'], 'own/plain-uthappam', 'South Indian soft pancake made of rice.'],
      ['Onion Uthappam', '£5.99', ['V'], 'own/onion-uthappam', 'South Indian soft pancake made of rice and topped with onion.'],
      ['Ghee Podi Uthappam', '£6.49', ['D', 'J'], 'podi-uttapam', 'South Indian soft pancake made of rice and topped with gunpowder (chilli lentil powder).'],
      ['Onion Chilli Uthappam', '£5.99', ['V'], 'own/onion-chilli-uthappam', 'A soft, thick South Indian pancake topped with fresh onions and green chillies – a mildly spicy bite.'],
      ['Mix Veg Uthappam', '£7.29', ['J', 'V'], 'own/mix-veg-uthappam', 'South Indian soft pancake made of rice and topped with mixed vegetables.'],
      ['Pizza Uthappam', '£7.99', ['D', 'J'], 'pizza-uttapam', 'South Indian soft pancake made of rice and topped with mixed vegetables, pizza sauce and toppings.'],
      ['Butter Uthappam', '£6.49', ['D', 'J'], 'own/butter-uthappam', 'South Indian soft pancake made of rice and topped with butter.'],
      ['Butter Onion Uthappam', '£6.99', ['D'], 'own/butter-onion-uthappam', 'South Indian soft pancake made of rice and topped with butter and onion.'],
      ['Panjavarna Uthappam', '£7.99', ['D'], 'veg-uttapam', 'Mini onion-chilli uthappam, mini mix veg uthappam, mini ghee podi uthappam and mini Nilagiri uthappam.'],
    ],
  },
  {
    category: "Annapoorneshwari Meal's",
    group: 'thali',
    items: [
      ['Madras Thali', '£9.99', [], 'madras-thali', 'White Rice, 1 pc Chapathi or Poori, Sambar, Rasam, Kara Kolambu, Yoghurt, Kootu, Poriyal, Butter Chilli Pickle, Sweet and Papadam.'],
      ['North Indian Thali', '£9.99', [], 'north-indian-thali', 'Variety Rice, Paneer 65 or Gobi 65, 2 pcs Chapathi or Poori, Channa Masala, Paneer Butter Masala, Dhal, Raitha, Salad and Sweet.'],
      ['Telugu Thali', '£12.99', [], 'andhra-meals', '1 pc Chapathi or Poori, White Rice, Brinjal Masala, Aloo Fry, Muddha Pappu, Sambar, Rasam, Curd, Mirchi Bajji or Masala Vada, Gongura Pickle, Sweet, Appalam, and Butter Milk or Mango Lassi.'],
    ],
  },
  {
    category: 'Variety of Rice',
    group: 'rice-noodles',
    items: [
      ['Veg Biryani', '£7.79', ['V'], 'veg-biryani', 'Basmati rice cooked with vegetables and spices.'],
      ['Paneer Biryani', '£8.29', ['D'], 'own/paneer-biryani', 'Rice and cottage cheese cooked with herbs, spices and sauce.'],
      ['Mushroom Biryani', '£7.79', ['V'], 'mushroom-biryani', 'Basmati rice cooked with mushroom and spices.'],
      ['Ghee Rice with Raitha', '£7.29', ['D', 'J'], 'ghee-rice', 'Delicious rice cooked with ghee, spices and nuts.'],
      ['Jeera Rice', '£7.29', ['D', 'J'], 'jeera-rice', 'Long grain basmati rice tempered with butter and cumin seeds.'],
      ['Veg Pulao', '£7.79', ['D', 'J'], 'veg-pulao', 'Flavourful basmati rice cooked with mixed vegetables and whole spices tempered in ghee.'],
      ['Paneer Pulao', '£8.29', ['D', 'J'], 'own/paneer-pulao', 'Aromatic basmati rice cooked with paneer and whole spices tempered in ghee.'],
      ['Mushroom Pulao', '£7.79', ['D', 'J'], 'own/mushroom-pulao', 'Basmati rice cooked with mushroom and whole spices tempered in ghee.'],
      ['Sambar Rice with Papadam', '£6.99', ['J', 'V'], 'sambar-rice', 'Rice cooked with lentil broth and mixed vegetables, served with papad.'],
      ['Curd Rice with Pickle', '£6.29', ['D', 'J'], 'curd-rice', 'Mashed rice mixed with creamy tempered yogurt and milk.'],
    ],
  },
  {
    category: "Mouth-Watering Curry's",
    group: 'curries',
    items: [
      ['Paneer Tikka Masala', '£7.99', ['D'], 'paneer-tikka-masala', 'Grilled paneer cubes cooked in a rich, creamy tomato-based gravy with aromatic spices.'],
      ['Paneer Butter Masala', '£8.79', ['D', 'J'], 'own/paneer-butter-masala', 'Soft paneer cubes cooked in a rich, creamy tomato gravy with butter and aromatic spices.'],
      ['Palak Paneer', '£8.79', ['D', 'J'], 'palak-paneer', 'Paneer cubes cooked in a smooth, flavourful spinach gravy with spices.'],
      ['Kadai Paneer Punjabi', '£8.99', ['D'], 'kadai-paneer', 'Paneer cubes cooked in a spicy, tangy tomato gravy with bell peppers, onions and aromatic spices, served in a traditional kadai.'],
      ['Paneer Bhurji', '£8.99', ['D', 'J'], 'paneer-bhurji', 'Scrambled paneer cooked with onions, tomatoes and spices – flavourful and protein-rich.'],
      ['Paneer Jalfrezi', '£8.99', ['D', 'J'], 'paneer-jalfrezi', 'Paneer cubes cooked with a medley of spices in a tangy, flavourful gravy.'],
      ['Green Peas Masala', '£7.99', ['V'], 'peas-masala', 'Green peas cooked in a rich, spiced tomato-based gravy.'],
      ['Veg Kolhapuri', '£8.29', ['V'], 'veg-kolhapuri', 'A spicy, flavourful vegetable curry made with aromatic spices, tomatoes and seasonal vegetables.'],
      ['Kashmiri Dum Aloo', '£8.49', ['V', 'J'], 'dum-aloo', 'Baby potatoes simmered in a rich, aromatic gravy made with yogurt, spices and Kashmiri red chilli.'],
      ['Mix Veg Kurma', '£7.99', ['V'], 'veg-kurma', 'Mixed vegetables tossed with onions, tomatoes and bell peppers in a flavourful Indian masala base.'],
      ['Channa Masala', '£7.99', ['V'], 'chana-masala', 'A popular Punjabi curry made with chickpeas, onion, tomatoes and house spices.'],
      ['Dal Tadka', '£7.99', ['V'], 'dal-tadka', 'Moong dal cooked with onion and tomatoes, tempered with traditional Indian spices.'],
      ['Dal Makhani', '£7.99', ['V'], 'dal-makhani', 'Kidney beans and black lentils simmered in a creamy gravy.'],
      ['Kaju Masala (Sweet or Spicy)', '£8.79', ['D', 'N'], 'kaju-masala', 'Shallow-fried shredded paneer, cashews, potatoes and raisins cooked in a rich gravy.'],
      ['Malai Kofta (Sweet)', '£8.29', ['D', 'N'], 'malai-kofta', 'Shallow-fried shredded cottage cheese dumplings cooked in a rich, smooth gravy.'],
      ['Veg Kofta (Spicy)', '£8.29', ['J', 'V', 'G'], 'veg-kofta', 'Little spice bombs made from mixed vegetables, added to the gravy.'],
      ['Brinjal Masala', '£7.99', ['V'], 'own/brinjal-masala', 'An Indian curried dish made with aubergines.'],
      ['Mutter Paneer', '£8.79', ['D'], 'matar-paneer', 'Paneer and green peas cooked in a spicy onion-tomato masala.'],
      ['Aloo Gobi', '£7.49', ['J', 'V'], 'aloo-gobi', 'Potatoes (aloo) and cauliflower (gobi) cooked with Indian spices, aromatics and herbs.'],
    ],
  },
  {
    category: 'Indian Flat Breads',
    group: 'curries',
    items: [
      ['Naan', '£2.29', ['J', 'G', 'D'], 'naan', 'Tandoor-cooked Indian bread made with self-raising flour.'],
      ['Butter Naan', '£2.79', ['J', 'G', 'D'], 'butter-naan', 'Indian bread made with self-raising flour, topped with butter.'],
      ['Cheese Naan', '£3.49', ['J', 'G', 'D'], 'cheese-naan', 'Bread baked in a clay oven and topped with cheese.'],
      ['Garlic Naan', '£2.99', ['D', 'G'], 'garlic-naan', 'Traditional Punjabi bread baked in a clay oven, topped with chopped garlic and brushed with butter.'],
      ['Chilli Garlic Naan', '£3.29', ['D', 'G'], 'own/chilli-garlic-naan', 'Stuffed with garlic and chilli and baked in the tandoor oven.'],
      ['Chilli Garlic Butter Naan', '£3.49', ['D', 'G'], 'garlic-butter-naan', 'Soft, fluffy flatbread topped with aromatic garlic, spicy chilli and melted butter.'],
      ['Bullet Naan', '£2.99', ['D', 'G'], 'naan', 'Flatbread with a fiery boost from chilli flakes.'],
      ['Roti', '£2.29', ['V', 'J', 'G'], 'roti', 'Indian wholewheat flatbread.'],
      ['Butter Roti', '£2.79', ['D', 'G', 'J'], 'butter-roti', 'Indian wheat bread topped with butter.'],
      ['Kulcha', '£2.29', ['V', 'G', 'D'], 'kulcha', 'A disc-shaped loaf of leavened bread.'],
      ['Masala Kulcha', '£3.29', ['D', 'V'], 'masala-kulcha', 'Kulcha with the dough stuffed with a flavourful mixture of spices.'],
    ],
  },
  {
    category: 'Desi-Chinese / Rice & Noodles',
    group: 'rice-noodles',
    items: [
      ['Veg Fried Rice', '£7.49', ['V', 'J'], 'veg-fried-rice', 'Long grain basmati rice cooked with mixed vegetables and whole spices tempered in ghee.'],
      ['Schezwan Fried Rice', '£7.49', ['V'], 'schezwan-fried-rice', 'Basmati rice sautéed with vegetables and blended in Schezwan sauce.'],
      ['Paneer Fried Rice', '£8.29', ['J', 'D'], 'own/paneer-fried-rice', 'Long grain basmati rice cooked with paneer and whole spices tempered in ghee.'],
      ['Mushroom Fried Rice', '£7.99', ['J', 'V'], 'mushroom-fried-rice', 'Long grain basmati rice cooked with mushroom and whole spices tempered in ghee.'],
      ['Garlic Fried Rice', '£7.49', ['V'], 'garlic-fried-rice', 'Basmati rice sautéed with shredded garlic.'],
      ['Veg Noodles', '£7.29', ['V', 'J', 'G'], 'own/veg-noodles', 'A Chinese classic: steamed noodles cooked with mixed vegetables and garnished with scallions.'],
      ['Schezwan Noodles', '£7.59', ['G', 'V'], 'schezwan-noodles', 'Noodles topped with sliced vegetables in Schezwan sauce.'],
      ['Paneer Noodles', '£8.29', ['G', 'J'], 'paneer-noodles', 'Noodles tossed with onions, capsicum and paneer.'],
      ['Mushroom Noodles', '£7.99', ['V', 'J', 'G'], 'own/mushroom-noodles', 'Noodles tossed with onions, capsicum and mushroom.'],
      ['Veg Hakka Noodles', '£7.99', ['V', 'J', 'G'], 'hakka-noodles', 'Noodles, vegetables and bean sprouts stir-fried with soya and chilli sauce.'],
    ],
  },
  {
    category: 'Desi Meeta (Deserts)',
    group: 'desserts',
    items: [
      ['Rava Kesari (Plain / Pineapple / Banana)', '£3.99', ['D', 'G', 'J'], 'kesari', 'A delightful semolina dessert infused with ghee, sugar and fragrant saffron, garnished with nuts.'],
      ['Badam Halwa', '£3.99', ['D', 'J'], 'badam-halwa', 'A rich, creamy almond dessert made with puréed almonds, sugar, ghee and saffron.'],
      ['Gajar Halwa', '£3.49', ['J'], 'gajar-halwa'],
      ['Gulab Jamun (2 Nos)', '£2.99', ['G', 'J'], 'gulab-jamun'],
      ['Gulab Jamun (2 Nos) with Ice Cream (1 Scoop)', '£4.99', ['D', 'G', 'J'], 'gulab-jamun-icecream'],
      ['Rasmalai (2 Nos)', '£4.99', ['D', 'J'], 'rasmalai'],
      ['Sizzler Brownie with Vanilla Ice Cream', '£5.49', [], 'brownie'],
      ['Sweet Paan', '£1.99', ['V', 'J'], 'paan'],
    ],
  },
  {
    category: 'Ice Cream & Kulfi',
    group: 'desserts',
    tags: ['D'],
    items: [
      ['Malai Kulfi', '£4.25', [], 'kulfi'],
      ['Pistachio Kulfi', '£4.25', [], 'pista-kulfi'],
      ['Matka Kulfi', '£4.25', [], 'matka-kulfi'],
      ['Choice of Ice Cream (Vanilla / Chocolate / Strawberry / Butterscotch)', '£3.79', [], 'ice-cream'],
    ],
  },
  {
    category: 'Falooda',
    group: 'desserts',
    tags: ['J', 'G', 'N'],
    items: [
      ['Rose Falooda', '£5.99', [], 'rose-falooda'],
      ['Shahi Falooda', '£5.99', [], 'falooda'],
      ['Kulfi Falooda', '£5.99', [], 'kulfi-falooda'],
      ['Mango Falooda', '£5.99', [], 'mango-falooda'],
      ['Strawberry Falooda', '£5.99', [], 'rose-falooda'],
    ],
  },
  {
    category: 'Hot Drinks',
    group: 'drinks',
    tags: ['J', 'D'],
    items: [
      ['Madras Filter Coffee (10oz / 15oz)', '£2.49 / £3.49', [], 'filter-coffee'],
      ['Masala Tea (10oz / 15oz)', '£2.49 / £3.49', [], 'masala-chai'],
      ['Hot Milk (10oz)', '£2.49', [], 'hot-milk'],
      ['Horlicks / Boost / Hot Chocolate / Hot Badam Milk (10oz)', '£3.49', [], 'own/hot-drinks'],
      ['Black Coffee / Black Tea (10oz)', '£3.29', [], 'black-coffee'],
    ],
  },
  {
    category: 'Drinks',
    group: 'drinks',
    items: [
      ['Coke / Diet Coke / Fanta / 7Up (330ml)', '£2.49', [], 'soft-drinks'],
      ['Thums Up / Limca (300ml)', '£2.49', [], 'thums-up'],
      ['Nimbooz 7Up / Jeera Soda (250ml)', '£2.99', [], 'jeera-soda'],
    ],
  },
  {
    category: 'Lassi and Milkshakes',
    group: 'drinks',
    tags: ['D'],
    items: [
      ['Lassi (Mango / Sweet / Salt)', '£5.49', [], 'mango-lassi'],
      ['Butter Milk', '£4.49', [], 'own/butter-milk'],
      ['Passion Fruit Juice', '£5.29', [], 'passion-juice'],
      ['Rose Milk', '£4.79', [], 'rose-milk'],
      ['Badam Milk', '£5.29', [], 'own/badam-milk'],
      ['Milkshakes (Chocolate / Vanilla / Strawberry / Butterscotch)', '£5.49', [], 'milkshake'],
      ['Special Milkshakes (Oreo / Ferrero Rocher / KitKat)', '£6.49', [], 'oreo-shake'],
      ['Butter Milk Jug', '£13.99', [], 'own/butter-milk-jug'],
      ['Badam Milk Jug', '£15.99', [], 'own/badam-milk-jug'],
      ['Passion Fruit Juice Jug', '£15.99', [], 'passion-juice'],
      ['Rose Milk Jug', '£14.99', [], 'rose-milk'],
      ['Lassi Jug (Mango / Sweet / Salt)', '£15.99', [], 'lassi'],
    ],
  },
  {
    category: 'Fresh fruit Juices',
    group: 'drinks',
    items: [
      ['Orange / Apple / Watermelon / Carrot / Pineapple', '£5.49', [], 'orange-juice'],
      ['Mix Your Own Fresh Juice', '£5.99', [], 'mixed-juice'],
      ['Beetroot + Ginger + Lime', '£5.49', [], 'beetroot-juice'],
      ['Lemon Juice', '£4.29', [], 'lemon-juice'],
    ],
  },
  {
    category: 'Extras',
    group: 'extras',
    items: [
      ['Plain Rice', '£2.99', [], 'plain-rice'],
      ['Kootu / Poriyal / Sambar / Rasam / Kara Kolambu / Dhal', '£2.99', [], 'own/kootu-poriyal'],
      ['Yogurt (220ml)', '£1.99', [], 'yogurt'],
      ['Papadam (1 pc)', '£1.99', [], 'papadum'],
      ['Sambar (500ml)', '£3.99', [], 'own/sambar'],
      ['Chutney (220ml)', '£2.99', [], 'chutney'],
      ['Parotta / Poori / Chapathi / Bhatura (1 pc)', '£2.49', [], 'parotta'],
      ['Raitha (200ml)', '£2.49', [], 'raita'],
      ['Green Salad', '£2.99', [], 'salad'],
      ['Extra Cheese / Masala / Butter', '£1.49', [], 'own/extra-cheese-masala-butter'],
    ],
  },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const MENU_ITEMS: MenuCatalogItem[] = SECTIONS.flatMap((section) =>
  section.items.map(([name, price, tags, photo, description]) => ({
    id: (section.idPrefix ?? '') + slug(name),
    name,
    category: section.category,
    group: section.group,
    price,
    description,
    tags: [...new Set([...(section.tags ?? []), ...tags])],
    photo: photo ?? undefined,
    isVeg: true as const,
  }))
);

/** Section notes (e.g. serving hours), keyed by category. */
export const MENU_CATEGORY_NOTES: Record<string, string> = Object.fromEntries(
  SECTIONS.filter((s) => s.note).map((s) => [s.category, s.note!])
);

/** Menu sections for the /menu page, in display order. `image` is a representative dish id for homepage tiles. */
export const MENU_GROUPS: { id: MenuGroup; label: string; image: string }[] = [
  { id: 'tiffin', label: 'South Indian Tiffin', image: 'idly-3-nos-or-idly-2-nos-and-vada-1-no' },
  { id: 'dosa', label: "Your Favorite Dosa's", image: 'masala-dosa' },
  { id: 'special-dosa', label: 'Special Dosas', image: 'mysore-masala-dosa' },
  { id: 'rava-dosa', label: "Love your Rava Dosa's", image: 'onion-rava-masala-dosa' },
  { id: 'uthappam', label: "Desi Pizza's (Uthappam's)", image: 'onion-uthappam' },
  { id: 'starters', label: 'Soups & Starters', image: 'gobi-manchurian' },
  { id: 'chaat', label: 'Desi Chat', image: 'pani-puri' },
  { id: 'thali', label: "Annapoorneshwari Meal's", image: 'madras-thali' },
  { id: 'curries', label: 'Curries & Breads', image: 'paneer-butter-masala' },
  { id: 'rice-noodles', label: 'Rice & Noodles', image: 'veg-biryani' },
  { id: 'kids', label: 'Kids Menu', image: 'kids-chocolate-dosa' },
  { id: 'desserts', label: 'Desserts', image: 'kulfi-falooda' },
  { id: 'drinks', label: 'Drinks', image: 'madras-filter-coffee-10oz-15oz' },
  { id: 'extras', label: 'Extras', image: 'sambar-500ml' },
];

/** Categories within a group, in printed order. */
export const categoriesForGroup = (group: MenuGroup) => [
  ...new Set(SECTIONS.filter((s) => s.group === group).map((s) => s.category)),
];

/** Dietary legend, as printed on the menu. */
export const DIET_TAGS: Record<string, { label: string; className: string }> = {
  N: { label: 'Contains nuts', className: 'bg-purple-600' },
  G: { label: 'Contains gluten', className: 'bg-[#EA262A]' },
  V: { label: 'Vegan', className: 'bg-[#1F6F3A]' },
  J: { label: 'Jain', className: 'bg-amber-500' },
  D: { label: 'Contains dairy', className: 'bg-blue-600' },
};

export const ALLERGY_NOTICE = 'Some of our dishes may contain nuts, gluten, mustard, soya and dairy products.';

/** A small subset used for the homepage "Signature Dishes" preview. */
export const SIGNATURE_DISH_IDS = [
  'masala-dosa',
  'ghee-roast',
  'mysore-masala-dosa',
  'chilli-paneer-dosa',
  'madras-thali',
  'onion-rava-masala-dosa',
  'kulfi-falooda',
  'madras-filter-coffee-10oz-15oz',
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
      (item.description ?? '').toLowerCase().includes(q)
  );
}
