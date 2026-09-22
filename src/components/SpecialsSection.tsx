import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { SIGNATURE_DISHES } from '../data/menu';
import { MenuCatalogItem } from '../types';
import { DishImage } from './DishImage';
import { Reveal } from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/Stagger';
import { SPRING_SNAPPY } from './motion/variants';

interface SpecialsSectionProps {
  onSelectSpecial?: (special: MenuCatalogItem) => void;
}

export const SpecialsSection: React.FC<SpecialsSectionProps> = ({ onSelectSpecial }) => {
  return (
    <section
      id="specials"
      className="py-20 bg-[#FFFDF7] border-t border-[#F3E5C8]/40 select-none"
      data-purpose="specials-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Specials Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-[#BC3908] text-xs font-bold tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#BC3908]" />
            <span>MUST TRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-[#1b4332]">Signature</span>{' '}
            <span className="text-[#D9531E]">Dishes</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            A light lunch or a quick tiffin, a birthday celebration or a family gathering –
            here's a taste of what's on the menu.
          </p>
        </Reveal>

        {/* Signature dish grid -- real, named items from the reconciled menu */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNATURE_DISHES.map((item) => (
            <StaggerItem key={item.id} direction="up">
              <motion.div
                whileTap={{ scale: 0.96 }}
                transition={SPRING_SNAPPY}
                onClick={() => onSelectSpecial && onSelectSpecial(item)}
                className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-3"
              >
                <div className="aspect-square rounded-xl overflow-hidden">
                  <DishImage
                    imageId={item.id}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="pt-3 px-1 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-[#D9531E] transition-colors">
                      {item.name}
                    </h3>
                    <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-label="Vegetarian" />
                  </div>
                  <p className="text-stone-400 text-xs mt-1">{item.category}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal direction="up" delay={0.1} className="text-center mt-12">
          <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-sm sm:text-base font-bold transition-colors shadow-md"
            >
              <span>Explore the Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};
