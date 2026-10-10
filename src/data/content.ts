import { JobOpening, GalleryImage } from '../types';

/**
 * Real Yummy Dosa business content, sourced from info.md (the reconciled
 * content inventory of the live site + delivery platforms + third-party
 * listings). Nothing here is invented -- fields info.md doesn't confirm
 * (investment figures, ROI, social handles, specific hygiene ratings, etc.)
 * are simply left out rather than guessed.
 */

export const BUSINESS = {
  legalName: 'Yummy Dosa',
  positioning: 'South Indian vegetarian restaurant',
  tagline: 'Where every dish is a celebration of South Indian vegetarian cuisine.',
  regions: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana'],
  address: {
    line1: '68 Cranbrook Rd',
    line2: 'Cranbrook',
    city: 'Ilford',
    postcode: 'IG1 4NH',
    country: 'United Kingdom',
    full: '68 Cranbrook Rd, Cranbrook, Ilford, IG1 4NH, United Kingdom',
  },
  phoneDisplay: '020 8637 3026',
  phoneIntl: '+44 20 8637 3026',
  phoneDigits: '442086373026',
  email: 'info@yummydosarestaurant.co.uk',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 11:00 PM' },
    { days: 'Saturday – Sunday', time: '9:00 AM – 11:00 PM' },
  ],
  weekendBreakfastBuffet: {
    days: 'Saturday & Sunday',
    time: '9:00 AM – 11:30 AM',
  },
  franchiseContact: { phone: '+44 7525 795805' },
  banquetContact: { name: 'Mr. Venkat', phone: '+44 7776 675146' },
  recruitmentContact: {
    name: 'Karthikeyan Madanagopal',
    phone: '+44 7525 795805',
    email: 'info@yummydosarestaurant.co.uk',
  },
  googleRating: { score: 4.7, reviewCount: 2826 },
  mapsQuery: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH'),
};

/**
 * TEMPORARY test destination: banquet/catering enquiry-form WhatsApp
 * messages are pointed here instead of the real contact numbers so
 * submissions can be verified without messaging real staff. Swap this
 * out (or delete it and revert the two callers) before going live.
 */
export const WHATSAPP_TEST_NUMBER = '447525795805';

/**
 * Official Yummy Dosa social profiles (confirmed live pages). No YouTube
 * channel could be confirmed, so it's left out rather than guessed -- add
 * it here if/when the client provides one.
 */
export const SOCIAL_LINKS: { id: 'facebook' | 'instagram'; name: string; href: string }[] = [
  { id: 'facebook', name: 'Facebook', href: 'https://www.facebook.com/yummydosailford/' },
  { id: 'instagram', name: 'Instagram', href: 'https://www.instagram.com/yummydosailford/' },
];

/**
 * Order-online logo links (Just Eat / Uber Eats / Deliveroo / order direct).
 * Real destination URLs for the three delivery platforms (given directly by
 * the client, cleaned of tracking params e.g. Uber Eats' `srsltid`). "direct"
 * stays a placeholder "#" until the client supplies where it should go.
 */
export const ORDERING_LOGO_LINKS: { id: string; name: string; href: string }[] = [
  { id: 'justeat', name: 'Just Eat', href: 'https://www.just-eat.co.uk/restaurants-yummy-dosa-restaurant-ilford/menu' },
  { id: 'ubereats', name: 'Uber Eats', href: 'https://www.ubereats.com/gb/store/yummy-dosa-restaurant/akehr_6hWDi2Ove_iQj-Kw' },
  { id: 'deliveroo', name: 'Deliveroo', href: 'https://deliveroo.co.uk/menu/london/cranbrook/yummy-dosa-restaurant-68-cranbrook-road' },
  { id: 'direct', name: 'Order Direct', href: '#' },
];

/** info.md section 6-7: the actual "about" narrative content. */
export const ABOUT_CONTENT = {
  story: `Yummy Dosa is a South Indian vegetarian restaurant in Ilford, London, offering an authentic culinary experience inspired by South Indian regional cuisines. The kitchen draws on the food traditions of Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana -- combining traditional recipes with innovation, using fresh ingredients while preserving authenticity.`,
  dishesMentioned: ['Dosa', 'Idli', 'Sambar', 'Chutneys', 'Regional curries', 'Biryanis', 'Street food'],
  audience: ['Families', 'Friends', 'Gatherings', 'Celebrations', 'Memorable dining experiences'],
  positioningPoints: [
    { title: 'Pure Vegetarian', body: 'Yummy Dosa consistently identifies itself as an Indian vegetarian / South Indian vegetarian restaurant.' },
    { title: 'South Indian Heritage', body: 'Cuisine inspired by Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana.' },
    { title: 'A Large, Varied Menu', body: 'An unusually broad menu spanning South Indian, North Indian, Indo-Chinese, chaat, desserts and drinks.' },
    { title: 'Family Dining', body: 'Positioned around families and gatherings, from a quick tiffin to a full celebration.' },
    { title: 'Events', body: 'A dedicated on-site banquet hall for private functions and celebrations.' },
  ],
};

/** info.md section 10 + 25: banquet hall content. */
export const BANQUET_CONTENT = {
  intro: 'Yummy Dosa has a dedicated banquet hall available for private events, alongside the main restaurant.',
  eventTypes: [
    'Birthday parties',
    'Weddings',
    'Engagements',
    'Baby showers',
    'Anniversaries',
    'Corporate events',
    'Private functions',
    'Family gatherings',
  ],
  liveDosaStationItems: [
    'Idly', 'Medhu Vada', 'Onion Chilli Uthappam', 'Mixed Veg Uthappam', 'Mini Masala Dosa',
    'Masala Dosa', 'Ghee Podi Dosa', 'Cheese Dosa', 'Mysore Masala Dosa', 'Paneer Dosa',
    'Schezwan Dosa', 'Sambar', 'Coconut Chutney', 'Tomato Chutney',
  ],
  weekendBuffetItems: [
    'Idly', 'Medhu Vada', 'Ghee Pongal', 'Plain Dosa', 'Masala Dosa', 'Sweet',
    'Mixed Uthappam', 'Sambar', 'White Chutney', 'Red Chutney', 'Masala Tea / Coffee',
  ],
};

/** info.md section 11: catering content -- gallery has a Catering category, but there is no dedicated catering copy yet on the live site. */
export const CATERING_CONTENT = {
  intro: 'Yummy Dosa\'s gallery includes a dedicated Catering category, and public listings reference banquet/buffet catering with a live dosa station.',
  occasions: ['Corporate catering', 'Wedding catering', 'Birthday catering', 'Private parties', 'Family gatherings'],
  liveDosaStationItems: BANQUET_CONTENT.liveDosaStationItems,
};

/**
 * Catering & add-ons menu -- transcribed from the client's latest catering flyer
 * (client-resources/catering-and-add-ons-menu.png). A section's `price` applies to
 * every item in it unless the item carries its own `price`.
 */
export const CATERING_MENU = {
  liveDosa: {
    title: 'Unlimited Live Dosa',
    price: '£10',
    unit: 'per person',
    items: [
      'Medhu Vada', 'Idly (2 pcs)', 'Plain Dosa', 'Masala Dosa', 'Cheese Dosa', 'Mysore Dosa',
      'Chocolate Dosa', 'Mix Veg Uthappam', 'Sambar', 'Coconut Chutney', 'Tomato Chutney',
    ],
  },
  addOns: [
    {
      title: 'Starters',
      price: '£3.49',
      items: [
        { name: 'Madras Bhaji (Potato / Onion / Chilli)' }, { name: 'Chilli Idly' }, { name: 'Plain Mogo' },
        { name: 'Masala Mogo' }, { name: 'Chilli Garlic Mogo' }, { name: 'Baby Corn Manchurian' },
        { name: 'Chilli Paneer', price: '£3.99' }, { name: 'Paneer 65', price: '£3.99' },
        { name: 'Paneer Manchurian', price: '£3.99' }, { name: 'Gobi Manchurian' }, { name: 'Chilli Gobi' },
        { name: 'Gobi 65' }, { name: 'Chilli Mushroom' }, { name: 'Mushroom Manchurian' },
        { name: 'French Fries' }, { name: 'Masala Fries' }, { name: 'Cheesy Fries', price: '£2.99' },
      ],
    },
    {
      title: 'Chaat',
      price: '£3.49',
      items: [
        { name: 'Spring Roll / Veg Nuggets' }, { name: 'Pani Puri' }, { name: 'Bhel Puri' }, { name: 'Dahi Puri' },
        { name: 'Samosa Chaat' }, { name: 'Aloo Tikki & Choley' }, { name: 'Veg Samosa' }, { name: 'Punjabi Samosa' },
        { name: 'Pav Bhaji' }, { name: 'Cheese Pav Bhaji' }, { name: 'Masala Vada' },
      ],
    },
    {
      title: 'Noodles & Rice',
      price: '£3.49',
      items: [
        { name: 'Veg Noodles' }, { name: 'Hakka Noodles' }, { name: 'Schezwan Noodles' }, { name: 'Veg Fried Rice' },
        { name: 'Mushroom Fried Rice' }, { name: 'Schezwan Fried Rice' }, { name: 'Paneer Fried Rice', price: '£3.99' },
        { name: 'Gobi Fried Rice' },
      ],
    },
    {
      title: 'Rice Variety',
      price: '£3.49',
      items: [
        { name: 'Bisi Bele Bath' }, { name: 'Keera Bath' }, { name: 'Jeera Rice' }, { name: 'Mint & Coriander Rice' },
        { name: 'Lemon Rice' }, { name: 'Mango Rice' }, { name: 'Tomato Rice' }, { name: 'Veg Pulao' },
        { name: 'Tamarind Rice' }, { name: 'Capsicum Rice' }, { name: 'Coconut Rice' }, { name: 'Rajma Chawal' },
        { name: 'Madras Dum Biryani' },
      ],
    },
    {
      title: 'Sweets',
      price: '£1.99',
      items: [
        { name: 'Badam Halwa' }, { name: 'Gajar Halwa' }, { name: 'Gulab Jamun' }, { name: 'Rasamalai', price: '£1.49' },
        { name: 'Pineapple Kesari', price: '£0.99' }, { name: 'Kesari', price: '£0.99' }, { name: 'Sweet Pongal' },
        { name: 'South Indian Halwa' }, { name: 'Semolina Kheer' }, { name: 'Sweet Pan', price: '£1.49' },
      ],
    },
    {
      title: 'Soups',
      price: '£2.49',
      items: [{ name: 'Tomato Soup' }, { name: 'Sweet Corn Soup' }, { name: 'Rasam' }],
    },
    {
      title: 'Lassi',
      price: '£2.99',
      items: [{ name: 'Lassi (Salt / Sweet / Mango)' }, { name: 'Butter Milk' }, { name: 'Rose Milk' }],
    },
    {
      title: 'Hot Drinks',
      price: '£1.49',
      items: [{ name: 'Filter Coffee' }, { name: 'Masala Tea' }, { name: 'Badam Milk' }],
    },
    {
      title: 'Fresh Juices',
      price: '£2.49',
      items: [{ name: 'Orange Juice' }, { name: 'Apple Juice' }, { name: 'Carrot Juice' }, { name: 'Passion Juice' }],
    },
    {
      title: 'Ice Cream',
      price: '£2.49',
      items: [
        { name: 'Matka Kulfi', price: '£3.49' },
        { name: 'Scoop of Ice Cream (Vanilla / Chocolate / Strawberry)', price: '£1.99' },
      ],
    },
    {
      title: 'Beer & Wine',
      price: '£3.99',
      items: [
        { name: 'Kingfisher (650 ml) 4.8%' }, { name: 'Cobra (620 ml) 4.5%' },
        { name: 'Red Wine (75cl)', price: '£8.99' }, { name: 'White Wine (75cl)', price: '£8.99' },
      ],
    },
  ] as { title: string; price: string; items: { name: string; price?: string }[] }[],
};

/** Weekend promotions shown in the entry popup -- from the client's morning buffet & unlimited lunch flyers. */
export const PROMOTIONS = [
  {
    id: 'morning-buffet',
    eyebrow: 'Weekend Special',
    title: 'Morning Buffet',
    days: 'Sat, Sun & Bank Holidays',
    time: '9:00 AM – 11:30 AM',
    adultPrice: '£8.99',
    kidsPrice: '£4.99',
    kidsLabel: 'Kids below 7',
    demoKey: 'idliChutneyBananaLeaf',
    items: [
      'Idly', 'Medhu Vada', 'Ghee Pongal', 'Plain Dosa', 'Masala Dosa', 'Sweet',
      'Mixed Uthappam', 'Sambar', 'White Chutney', 'Red Chutney', 'Masala Tea or Coffee',
    ],
    notes: ['Special student discount: 5% off', 'Free parking above £30 (max 2 hrs). T&Cs apply.'],
  },
  {
    id: 'unlimited-lunch',
    eyebrow: 'Flavours of India',
    title: 'Unlimited Lunch',
    days: 'Sat, Sun & Bank Holidays',
    time: '12:30 PM – 3:30 PM',
    adultPrice: '£9.99',
    kidsPrice: '£4.99',
    kidsLabel: 'Kids under 10',
    demoKey: 'thaliMetalTray',
    items: [
      'Sweet', 'Butter Chilli', 'Papadam', 'Roti Pachadi', 'White Rice', 'Sambar', 'Kootu',
      'Rasam', 'Kara Kolambu', 'Chapathi', 'Yoghurt', 'Brinjal Masala Dal', 'Poriyal',
    ],
    notes: ['2 min walk from Ilford Station'],
  },
] as const;

/** About page "Our Services" cards -- facts from the client's banquet/catering flyers (client-resources/README.md). */
export const SERVICES_CONTENT = {
  banquet: {
    title: 'Banquet Hall',
    tagline: 'Complimentary free banquet hall for events & party bookings',
    body: 'Our dedicated banquet hall sits alongside the main restaurant at 68 Cranbrook Road -- and when you book your event or party food with us, the hall comes free of charge.',
    points: [
      'Free hall hire with your event or party booking',
      'Birthdays, weddings, engagements, baby showers & anniversaries',
      'Corporate events, private functions & family gatherings',
      'Live dosa station & South Indian buffet menus',
    ],
  },
  catering: {
    title: 'Outdoor Catering',
    tagline: 'Unlimited live dosa menu from £10 per person',
    body: 'We bring the Yummy Dosa kitchen to you -- dosas cooked fresh on site, with menus built around your occasion, for events across London and the surrounding areas.',
    points: [
      'Freshly cooked on site by our chefs',
      'Hygienic & professional service',
      'Customised menus, plus starters, chaat, rice, sweets & drinks add-ons',
      'Parties, weddings, corporate events, birthdays & home functions',
    ],
  },
};

/** info.md section 34: franchise content. Only documented support areas -- no investment/ROI/outlet-count figures exist in the source, so none are shown. */
export const FRANCHISE_CONTENT = {
  headline: 'Own a Yummy Dosa Franchise',
  intro: 'Yummy Dosa is a growing South Indian vegetarian restaurant brand inviting entrepreneurs and investors to explore franchise opportunities.',
  support: [
    {
      title: 'Location Selection & Setup',
      points: ['Location selection', 'Restaurant setup', 'Visibility considerations'],
    },
    {
      title: 'Staff Training & Operations',
      points: ['Staff training', 'Operational guidance', 'Consistency', 'Quality'],
    },
    {
      title: 'Marketing & Brand Development',
      points: ['Marketing strategies', 'Brand support', 'Customer attraction', 'Long-term loyalty'],
    },
  ],
};

/** info.md section 35: the three real job listings, with their actually-documented responsibilities. */
export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'restaurant-manager',
    title: 'Restaurant Manager / Assistant Manager',
    summary: 'Manager-level role covering recruitment, operations, and day-to-day running of a high-volume South Indian restaurant.',
    responsibilities: [
      'Recruiting, training and supervising staff',
      'Reservations and customer reviews',
      'Budget management and menu planning',
      'Hygiene compliance and stock management',
      'Ordering and staff rotas',
      'Customer enquiries and complaints',
      'Reports and financial records',
      'Marketing and business development',
    ],
    location: 'Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH',
    contact: { phone: BUSINESS.recruitmentContact.phone, email: BUSINESS.recruitmentContact.email },
  },
  {
    id: 'chettinad-chef',
    title: 'South Indian Chettinad Chef',
    summary: 'Specialist chef role focused on South Indian regional cuisine, breakfast preparation and traditional spice work.',
    responsibilities: [
      'South Indian regional cuisine',
      'Breakfast preparation',
      'Marinades, curry bases and spice blends',
      'Seasonal cuisine',
      'Food waste and ordering control',
      'Quality control and food safety',
      'Temperature control and hygiene',
    ],
    location: 'Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH',
    contact: { phone: BUSINESS.recruitmentContact.phone, email: BUSINESS.recruitmentContact.email },
  },
  {
    id: 'curry-chef',
    title: 'Indian Curry Chef',
    summary: 'Kitchen role responsible for Indian curry preparation, portioning, costing and food safety standards.',
    responsibilities: [
      'Indian curry preparation to recipe standards',
      'Portion control and presentation',
      'Food costing and stock taking',
      'Ordering',
      'Food safety and kitchen organisation',
      'Staff task allocation',
    ],
    location: 'Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH',
    contact: { phone: BUSINESS.recruitmentContact.phone, email: BUSINESS.recruitmentContact.email },
  },
  {
    id: 'waiter',
    title: 'Waiter',
    summary: 'Front-of-house role welcoming guests, taking orders and keeping our busy dining room running smoothly.',
    responsibilities: [
      'Greeting and seating guests',
      'Taking food and drink orders accurately',
      'Serving dishes promptly and with care',
      'Explaining menu items and dietary information',
      'Clearing, resetting and keeping tables tidy',
      'Handling bills and payments',
      'Working closely with the kitchen team',
    ],
    location: 'Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH',
    contact: { phone: BUSINESS.recruitmentContact.phone, email: BUSINESS.recruitmentContact.email },
  },
  {
    id: 'waitress',
    title: 'Waitress',
    summary: 'Front-of-house role giving guests a warm welcome and friendly, attentive table service.',
    responsibilities: [
      'Greeting and seating guests',
      'Taking food and drink orders accurately',
      'Serving dishes promptly and with care',
      'Explaining menu items and dietary information',
      'Clearing, resetting and keeping tables tidy',
      'Handling bills and payments',
      'Working closely with the kitchen team',
    ],
    location: 'Yummy Dosa, 68 Cranbrook Rd, Ilford IG1 4NH',
    contact: { phone: BUSINESS.recruitmentContact.phone, email: BUSINESS.recruitmentContact.email },
  },
];

/**
 * Gallery inventory. info.md confirms the current site groups its gallery into
 * these four categories. The repository has no real venue/event/catering
 * photography on disk yet (see MISSING_IMAGES.md), so for this client demo,
 * rows without a specific dish use a `demoImageKey` -- a temporary free-to-use
 * Unsplash photo (src/data/demoImages.ts) standing in for the real thing.
 * Rows with `imageId` point at real dish entries in the menu catalog, so they
 * automatically pick up the dish's real photo once one exists on disk.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g-food-1', category: 'Food', title: 'Masala Dosa', imageId: 'masala-dosa' },
  { id: 'g-food-2', category: 'Food', title: 'Ghee Roast', imageId: 'ghee-roast' },
  { id: 'g-food-3', category: 'Food', title: 'Mysore Masala Dosa', imageId: 'mysore-masala-dosa' },
  { id: 'g-food-4', category: 'Food', title: 'Madras Thali', imageId: 'madras-thali' },
  { id: 'g-food-5', category: 'Food', title: 'Kulfi Falooda', imageId: 'kulfi-falooda' },
  { id: 'g-food-6', category: 'Food', title: 'Madras Filter Coffee', imageId: 'madras-filter-coffee' },
  { id: 'g-food-7', category: 'Food', title: 'Pani Puri', imageId: 'pani-puri' },
  { id: 'g-food-8', category: 'Food', title: 'Onion Rava Masala Dosa', imageId: 'onion-rava-masala-dosa' },
  { id: 'g-food-9', category: 'Food', title: 'Tandoori Paneer Tikka', imageId: 'tandoori-paneer-tikka' },
  { id: 'g-food-10', category: 'Food', title: 'Chilli Idly', imageId: 'chilli-idly' },
  { id: 'g-food-11', category: 'Food', title: 'North Indian Thali', imageId: 'north-indian-thali' },
  { id: 'g-food-12', category: 'Food', title: 'Strawberry Falooda', imageId: 'strawberry-falooda' },
  { id: 'g-restaurant-1', category: 'Restaurant', title: 'Dining room', demoImageKey: 'restaurantInterior' },
  { id: 'g-restaurant-2', category: 'Restaurant', title: 'Restaurant frontage, 68 Cranbrook Rd', demoImageKey: 'restaurantExterior' },
  { id: 'g-restaurant-3', category: 'Restaurant', title: 'Restaurant storefront', demoImageKey: 'restaurantWindow' },
  { id: 'g-restaurant-4', category: 'Restaurant', title: 'Guests dining together', demoImageKey: 'diningGroupRestaurant' },
  { id: 'g-banquet-1', category: 'Banquet Hall', title: 'Banquet hall setup', demoImageKey: 'banquetRoundTables' },
  { id: 'g-banquet-2', category: 'Banquet Hall', title: 'Event in progress', demoImageKey: 'banquetBallroom' },
  { id: 'g-banquet-3', category: 'Banquet Hall', title: 'Formal event setup', demoImageKey: 'banquetFormalHall' },
  { id: 'g-catering-1', category: 'Catering', title: 'Buffet spread', demoImageKey: 'cateringChafingDishes' },
  { id: 'g-catering-2', category: 'Catering', title: 'Catering service', demoImageKey: 'cateringBuffetTable' },
  { id: 'g-catering-3', category: 'Catering', title: 'Event catering table', demoImageKey: 'cateringSpread' },
];
