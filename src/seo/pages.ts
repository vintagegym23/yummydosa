import { JOB_OPENINGS } from '../data/content';
import { MENU_ITEMS } from '../data/menu';

/** Canonical origin of the live site (no trailing slash), from VITE_SITE_URL at build time. */
export const SITE_URL: string = __SITE_URL__;
/** True for staging/preview builds: every page gets noindex and robots.txt disallows crawling. */
export const SITE_NOINDEX: boolean = __SEO_NOINDEX__;
export const SITE_NAME = 'Yummy Dosa';

export interface PageSeo {
  /** Full <title>. Keep under ~60 characters and unique per page. */
  title: string;
  /** Meta description: unique, ~120-160 characters, written for people choosing a search result. */
  description: string;
  /** Share image under public/og/ (1200x630). */
  ogImage?: string;
  ogImageAlt?: string;
  /** Visible breadcrumb label (must match the page's <Breadcrumbs>), used for BreadcrumbList JSON-LD. */
  breadcrumb?: string;
  /** Keep out of search results (still crawlable so links are followed). Also excluded from the sitemap. */
  noindex?: boolean;
}

const DEFAULT_OG = { ogImage: '/og/home.jpg', ogImageAlt: 'A crispy masala dosa served with sambar and chutneys at Yummy Dosa' };

const menuCount = Math.floor(MENU_ITEMS.length / 10) * 10; // "more than 220" -- stays true as the menu changes
const jobTitles = JOB_OPENINGS.map((job) => job.title.split(' / ')[0]).join(', ');

/**
 * Every indexable route and its search metadata. The prerender script renders each of
 * these to its own static HTML file, and they make up sitemap.xml. A route missing here
 * is reported by the build.
 */
export const PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'Yummy Dosa | South Indian Vegetarian Restaurant in Ilford',
    description:
      'Pure vegetarian South Indian restaurant two minutes from Ilford station. Dosas, idli, thalis, chaat and Indo-Chinese dishes -- dine in, order online or book a table.',
    ...DEFAULT_OG,
  },
  '/menu': {
    title: 'Menu: Dosas, Thalis & Chaat | Yummy Dosa Ilford',
    description: `Browse the full Yummy Dosa menu: more than ${menuCount} pure vegetarian dishes, from masala and rava dosas to uthappam, idli, thalis, chaat, starters, drinks and desserts.`,
    ogImage: '/og/menu.jpg',
    ogImageAlt: 'A crispy dosa with chutneys and potato masala on a banana leaf',
    breadcrumb: 'Menu',
  },
  '/about': {
    title: 'About Us: Our Story | Yummy Dosa Ilford',
    description:
      'The Yummy Dosa story: regional cooking from Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana, made fresh and 100% vegetarian in Ilford.',
    ogImage: '/og/about.jpg',
    ogImageAlt: 'The Yummy Dosa restaurant on Cranbrook Road, Ilford, at night',
    breadcrumb: 'About',
  },
  '/gallery': {
    title: 'Gallery: Food & Restaurant Photos | Yummy Dosa',
    description:
      'Photos of dosas, thalis and other South Indian dishes, plus the Yummy Dosa restaurant, banquet hall and catering events in Ilford, East London.',
    ...DEFAULT_OG,
    breadcrumb: 'Gallery',
  },
  '/order-online': {
    title: 'Order Online for Delivery or Collection | Yummy Dosa',
    description:
      'Order Yummy Dosa for delivery through Just Eat, Uber Eats or Deliveroo -- or order direct from us for collection or delivery and get 10% off.',
    ...DEFAULT_OG,
    breadcrumb: 'Order Online',
  },
  '/orderfromus': {
    title: 'Order Direct | Yummy Dosa',
    description: 'Order Yummy Dosa direct for collection or delivery -- order through our website and get 10% off.',
    ...DEFAULT_OG,
    // A full-screen embed of the third-party ordering system: /order-online is the page to rank.
    noindex: true,
  },
  '/book-a-table': {
    title: 'Book a Table | Yummy Dosa, Cranbrook Road, Ilford',
    description:
      'Reserve a table at Yummy Dosa, 68 Cranbrook Road, Ilford IG1 4NH. Choose your date, time and party size and send your booking request to us on WhatsApp.',
    ogImage: '/og/book-a-table.jpg',
    ogImageAlt: 'Diners sharing dosas and South Indian dishes at a restaurant table',
    breadcrumb: 'Book a Table',
  },
  '/banquet-hall': {
    title: 'Banquet Hall for Parties & Events in Ilford | Yummy Dosa',
    description:
      'Host birthdays, weddings, engagements and corporate events in the Yummy Dosa banquet hall in Ilford. The hall is free when you book your event food with us.',
    ...DEFAULT_OG,
    breadcrumb: 'Banquet Hall',
  },
  '/catering': {
    title: 'South Indian Catering in London | Yummy Dosa',
    description:
      'Vegetarian catering for weddings, birthdays, corporate events and parties across London, including an unlimited live dosa station from £10 per person.',
    ...DEFAULT_OG,
    breadcrumb: 'Catering',
  },
  '/franchise': {
    title: 'Franchise Opportunities | Yummy Dosa',
    description:
      'Own a Yummy Dosa franchise, with support for location, setup, staff training, operations and marketing from a growing South Indian vegetarian restaurant brand.',
    ogImage: '/og/franchise.jpg',
    ogImageAlt: 'Illuminated Yummy Dosa sign above a world map',
    breadcrumb: 'Franchise',
  },
  '/careers': {
    title: 'Careers: Restaurant Jobs in Ilford | Yummy Dosa',
    description: `Now hiring at Yummy Dosa, Ilford: ${jobTitles}. See each role and how to apply.`,
    ...DEFAULT_OG,
    breadcrumb: 'Careers',
  },
  '/contact': {
    title: 'Contact Us: Address, Phone & Opening Hours | Yummy Dosa',
    description:
      'Find Yummy Dosa at 68 Cranbrook Rd, Ilford IG1 4NH, two minutes from Ilford station. Call 020 8637 3026, email us or send a message on WhatsApp.',
    ogImage: '/og/contact.jpg',
    ogImageAlt: 'Yummy Dosa sign with a dosa served on the counter',
    breadcrumb: 'Contact',
  },
  '/photo-credits': {
    title: 'Photo Credits | Yummy Dosa',
    description: 'Credits and licences for the freely licensed photographs used on the Yummy Dosa website.',
    ...DEFAULT_OG,
    breadcrumb: 'Photo Credits',
  },
};

/** Metadata for unknown URLs (served by 404.html with an HTTP 404 status). */
export const NOT_FOUND_PAGE: PageSeo = {
  title: 'Page Not Found | Yummy Dosa',
  description: 'The page you are looking for could not be found. Browse the Yummy Dosa menu or find us in Ilford.',
  ...DEFAULT_OG,
  noindex: true,
};

/** Removes a trailing slash (except for the root) so lookups and canonicals are consistent. */
export const normalizePath = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname) || '/';

export const getPageSeo = (pathname: string): { path: string | null; seo: PageSeo } => {
  const path = normalizePath(pathname);
  return path in PAGES ? { path, seo: PAGES[path] } : { path: null, seo: NOT_FOUND_PAGE };
};

export const absoluteUrl = (path: string) => SITE_URL + (path === '/' ? '/' : path);
