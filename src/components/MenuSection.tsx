import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MENU_GROUPS, MENU_ITEMS } from '../data/menu';
import { FeaturedDish } from './FeaturedDish';
import { DishImage } from './DishImage';
import { Reveal } from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/Stagger';
import { SPRING_SNAPPY } from './motion/variants';

interface MenuSectionProps {
  onOrderWhatsApp?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOrderWhatsApp }) => {
  return (
    <section
      id="menu"
      className="py-20 bg-[#FBF8EE] relative select-none"
      data-purpose="menu-catalog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E] block mb-1">
            EXPLORE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-[#1b4332]">Our</span>{' '}
            <span className="text-[#D9531E]">Menu</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            {MENU_ITEMS.length}+ dishes across dosas, tiffin, thalis, chaat, drinks and desserts –
            every one of them pure vegetarian.
          </p>
        </Reveal>

        {/* Category tiles -- each links straight into the full /menu page */}
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {MENU_GROUPS.map((group) => {
            const count = MENU_ITEMS.filter((item) => item.group === group.id).length;
            return (
              <StaggerItem key={group.id} direction="up">
                <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_SNAPPY} className="h-full">
                  <Link
                    to={`/menu#${group.id}`}
                    className="group block h-full bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
                  >
                    <div className="aspect-square overflow-hidden">
                      <DishImage
                        imageId={group.image}
                        alt={group.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(min-width: 768px) 20vw, 50vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-stone-900 text-sm group-hover:text-[#D9531E] transition-colors">
                        {group.label}
                      </h3>
                      <p className="text-stone-400 text-xs mt-1">{count} items</p>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal direction="up" delay={0.1} className="text-center mt-8">
          <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors shadow-sm"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </Reveal>

        {/* Featured Dish Highlight Card */}
        <FeaturedDish onOrderClick={onOrderWhatsApp} />
      </div>
    </section>
  );
};
