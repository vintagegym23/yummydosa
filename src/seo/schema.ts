/**
 * Schema.org JSON-LD for each page, built only from the site's own content files
 * (src/data/*), so structured data always matches what the page shows.
 *
 * Deliberately left out:
 * - aggregateRating / reviews: the Google rating shown on the site comes from a third party,
 *   and Google's guidelines don't allow marking that up on the business's own site.
 * - priceRange, vegan diet claims, JobPosting (the job data has no posting/closing dates).
 */
import { BUSINESS, SOCIAL_LINKS, SERVICES_CONTENT } from '../data/content';
import { MENU_ITEMS } from '../data/menu';
import { SITE_NAME, SITE_URL, absoluteUrl, type PageSeo } from './pages';

type Json = Record<string, unknown>;

const RESTAURANT_ID = `${SITE_URL}/#restaurant`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** "Monday – Friday" -> [Monday..Friday]; "8:00 AM – 11:00 PM" -> ["08:00", "23:00"]. */
function parseDays(range: string): string[] {
  const [from, to = from] = range.split(/\s*[–-]\s*/).map((d) => DAYS.findIndex((day) => d.trim().startsWith(day)));
  if (from < 0 || to < 0) throw new Error(`Unrecognised opening days "${range}"`);
  return DAYS.slice(from, to + 1);
}
function parseTimes(range: string): [string, string] {
  const to24 = (t: string) => {
    const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) throw new Error(`Unrecognised opening time "${t}"`);
    const h = (Number(m[1]) % 12) + (m[3].toUpperCase() === 'PM' ? 12 : 0);
    return `${String(h).padStart(2, '0')}:${m[2]}`;
  };
  const [open, close] = range.split(/\s*[–-]\s*/);
  return [to24(open), to24(close)];
}

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: BUSINESS.address.line1.replace(/\bRd\b/, 'Road'),
  addressLocality: BUSINESS.address.city,
  postalCode: BUSINESS.address.postcode,
  addressCountry: 'GB',
};

/** The restaurant as a LocalBusiness (Restaurant) entity. */
export function restaurantSchema(): Json {
  return {
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description: BUSINESS.tagline,
    logo: `${SITE_URL}/favicon-192.png`,
    image: [`${SITE_URL}/og/about.jpg`, `${SITE_URL}/og/home.jpg`],
    telephone: BUSINESS.phoneIntl,
    email: BUSINESS.email,
    address: postalAddress,
    // Pin of the Google Maps embed used on the site.
    geo: { '@type': 'GeoCoordinates', latitude: 51.56057, longitude: 0.06974 },
    hasMap: BUSINESS.mapsQuery,
    servesCuisine: ['South Indian', 'Indian', 'Vegetarian'],
    openingHoursSpecification: BUSINESS.hours.map(({ days, time }) => {
      const [opens, closes] = parseTimes(time);
      return { '@type': 'OpeningHoursSpecification', dayOfWeek: parseDays(days), opens, closes };
    }),
    hasMenu: absoluteUrl('/menu'),
    acceptsReservations: true,
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE_NAME,
    inLanguage: 'en-GB',
    publisher: { '@id': RESTAURANT_ID },
  };
}

function webPageSchema(path: string, seo: PageSeo, type = 'WebPage'): Json {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: seo.title,
    description: seo.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': RESTAURANT_ID },
    ...(seo.ogImage ? { primaryImageOfPage: `${SITE_URL}${seo.ogImage}` } : {}),
    ...(seo.breadcrumb ? { breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` } } : {}),
  };
}

/** Mirrors the visible <Breadcrumbs>: Home > {page}. */
function breadcrumbSchema(path: string, label: string): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: label, item: absoluteUrl(path) },
    ],
  };
}

/** Full menu from src/data/menu.ts, grouped by the printed section headings. */
function menuSchema(): Json {
  const sections = new Map<string, typeof MENU_ITEMS>();
  for (const item of MENU_ITEMS) sections.set(item.category, [...(sections.get(item.category) ?? []), item]);
  const price = (p: string) => p.match(/^£(\d+(?:\.\d{1,2})?)$/)?.[1];
  return {
    '@type': 'Menu',
    '@id': `${absoluteUrl('/menu')}#menu`,
    name: 'Yummy Dosa Menu',
    url: absoluteUrl('/menu'),
    inLanguage: 'en-GB',
    hasMenuSection: [...sections].map(([name, items]) => ({
      '@type': 'MenuSection',
      name,
      hasMenuItem: items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        suitableForDiet: 'https://schema.org/VegetarianDiet',
        ...(price(item.price)
          ? { offers: { '@type': 'Offer', price: price(item.price), priceCurrency: 'GBP' } }
          : {}),
      })),
    })),
  };
}

function serviceSchema(path: string, name: string, description: string, areaServed?: string): Json {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': RESTAURANT_ID },
    ...(areaServed ? { areaServed: { '@type': 'City', name: areaServed } } : {}),
  };
}

/** The @graph for a page. Unknown/noindex pages get none. */
export function pageSchema(path: string | null, seo: PageSeo): Json | null {
  if (!path || seo.noindex) return null;

  const graph: Json[] = [];
  if (path === '/') {
    graph.push(websiteSchema(), restaurantSchema(), webPageSchema(path, seo));
  } else {
    const type = path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : path === '/gallery' ? 'CollectionPage' : 'WebPage';
    graph.push(webPageSchema(path, seo, type));
    if (seo.breadcrumb) graph.push(breadcrumbSchema(path, seo.breadcrumb));
  }

  // The full business entity also on the pages people use to find/contact it.
  if (path === '/contact' || path === '/book-a-table') graph.push(restaurantSchema());
  if (path === '/menu') graph.push(menuSchema());
  if (path === '/catering') {
    graph.push(serviceSchema(path, 'South Indian catering', SERVICES_CONTENT.catering.body, 'London'));
  }
  if (path === '/banquet-hall') {
    graph.push(serviceSchema(path, 'Banquet hall hire', SERVICES_CONTENT.banquet.body));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
