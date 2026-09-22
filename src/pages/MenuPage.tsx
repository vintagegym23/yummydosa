import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Leaf, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DishImage } from '../components/DishImage';
import { MenuItemDetail } from '../components/MenuItemDetail';
import { Reveal } from '../components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useOrderModal } from '../context/OrderModalContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { MENU_GROUPS, MENU_ITEMS, searchMenuItems } from '../data/menu';
import { MenuCatalogItem } from '../types';

const MenuCard: React.FC<{ item: MenuCatalogItem; onSelect: (item: MenuCatalogItem) => void }> = ({ item, onSelect }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={SPRING_SNAPPY}
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <DishImage
          imageId={item.id}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-bold translate-y-2 group-hover:translate-y-0 duration-300">
            View Dish
          </span>
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-[#D9531E] transition-colors">
            {item.name}
          </h3>
          <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-label="Vegetarian" />
        </div>
        <p className="text-stone-400 text-xs mt-1">{item.category}</p>
        {item.price && <p className="text-[#D9531E] font-bold text-sm mt-2">{item.price}</p>}
      </div>
    </motion.button>
  );
};

export default function MenuPage() {
  const { openOrderModal } = useOrderModal();
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState(MENU_GROUPS[0].id);
  const [detailItem, setDetailItem] = useState<MenuCatalogItem | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useDocumentMeta({
    title: 'Full Menu',
    description:
      'The complete Yummy Dosa menu -- dosas, rava dosas, special dosas, South Indian tiffin, thalis, chaat, starters, drinks and desserts. 100% pure vegetarian.',
  });

  const results = useMemo(() => (query ? searchMenuItems(query) : null), [query]);

  // Highlight the active category pill as the user scrolls.
  useEffect(() => {
    if (results) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveGroup(entry.target.id);
        });
      },
      { rootMargin: '-140px 0px -70% 0px' }
    );
    (Object.values(sectionRefs.current) as (HTMLElement | null)[]).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [results]);

  const scrollToGroup = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOrder = (item: MenuCatalogItem) => {
    setDetailItem(null);
    openOrderModal(item);
  };

  return (
    <>
      <PageHero
        eyebrow="THE MENU"
        title="The Menu"
        description="100+ dishes rooted in Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana -- dosas, tiffin, thalis, chaat, drinks and desserts, all pure vegetarian."
        primaryAction={{ label: 'Order Online', to: '/order-online' }}
        imageId="masala-dosa"
        height="compact"
      />
      <Breadcrumbs items={[{ label: 'Menu' }]} />

      {/* Search + sticky category nav */}
      <div className="sticky top-20 z-30 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#F3E5C8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search our menu... (dosa, paneer, idli, thali)"
              aria-label="Search the menu"
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D9531E]/40 focus:border-[#D9531E]"
            />
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.85 }}
                transition={SPRING_SNAPPY}
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {!results && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {MENU_GROUPS.map((group) => (
                <motion.button
                  key={group.id}
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING_SNAPPY}
                  onClick={() => scrollToGroup(group.id)}
                  className={`relative shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer ${
                    activeGroup === group.id ? 'text-white' : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {activeGroup === group.id && (
                    <motion.span
                      layoutId="menu-group-pill"
                      className="absolute inset-0 rounded-full bg-[#1b4332] shadow-sm -z-10"
                      transition={SPRING_SNAPPY}
                    />
                  )}
                  {group.label}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {results ? (
          <div>
            <p className="text-stone-500 text-sm mb-6">
              {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
            </p>
            {results.length > 0 ? (
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" stagger={0.05}>
                {results.map((item) => (
                  <StaggerItem key={item.id} direction="up" duration={0.3}>
                    <MenuCard item={item} onSelect={setDetailItem} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            ) : (
              <div className="text-center py-16">
                <p className="text-stone-500">No dishes match &ldquo;{query}&rdquo;.</p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9531E] text-white text-sm font-bold cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {MENU_GROUPS.map((group) => (
              <section
                key={group.id}
                id={group.id}
                ref={(el) => {
                  sectionRefs.current[group.id] = el;
                }}
                className="scroll-mt-40"
              >
                <Reveal direction="left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-8">
                    {group.label}
                  </h2>
                </Reveal>
                <div className="space-y-10">
                  {group.categories.map((category) => {
                    const items = MENU_ITEMS.filter((item) => item.category === category);
                    if (items.length === 0) return null;
                    return (
                      <div key={category}>
                        {group.categories.length > 1 && (
                          <h3 className="text-sm font-bold uppercase tracking-widest text-[#D9531E] mb-4">
                            {category}
                          </h3>
                        )}
                        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" stagger={0.05}>
                          {items.map((item) => (
                            <StaggerItem key={item.id} direction="up" duration={0.3}>
                              <MenuCard item={item} onSelect={setDetailItem} />
                            </StaggerItem>
                          ))}
                        </StaggerGroup>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <Reveal direction="scale" className="bg-[#1b4332] text-white py-14 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Order?</h2>
        <p className="text-stone-300 text-sm mb-6 max-w-lg mx-auto">
          Order delivery, arrange collection, or book a table to dine in at Yummy Dosa, Ilford.
        </p>
        <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block">
          <Link
            to="/order-online"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors shadow-md"
          >
            <span>Order Online</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Reveal>

      <MenuItemDetail item={detailItem} onClose={() => setDetailItem(null)} onOrder={handleOrder} />
    </>
  );
}
