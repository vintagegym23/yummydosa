import React from 'react';
import { motion } from 'motion/react';
import { DishImage } from './DishImage';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Reveal } from './motion/Reveal';
import { SPRING_SNAPPY } from './motion/variants';

interface FeaturedDishProps {
  onOrderClick?: () => void;
}

export const FeaturedDish: React.FC<FeaturedDishProps> = ({ onOrderClick }) => {
  return (
    <Reveal direction="scale" duration={0.55}>
      <div
        id="featured-dish-highlight"
        className="mt-12 bg-white rounded-3xl p-6 lg:p-8 border border-[#F3E5C8] flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Left Food Image - large editorial crop, not a small thumbnail */}
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl aspect-video lg:aspect-[16/10]">
          <DishImage
            imageId="butter-masala-dosa"
            alt="Slow-roasted butter masala dosa on a banana leaf"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-4">
          <span className="inline-block px-3 py-1 bg-amber-100 text-[#BC3908] text-xs font-bold uppercase rounded-full">
            Chef Signature
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Slow-Roasted Butter Masala Dosa
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            Crafted over seasoned cast iron tavas with natural stone-ground batter fermented for 18 hours.
            Served traditionally on fresh green banana leaf with three signature chutneys and freshly boiled
            drumstick sambar.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <span className="text-2xl font-bold text-[#1b4332]">£8.95</span>
            <motion.a
              whileTap={{ scale: 0.95 }}
              transition={SPRING_SNAPPY}
              href={RESTAURANT_INFO.whatsappUrl}
              onClick={(e) => {
                if (onOrderClick) {
                  e.preventDefault();
                  onOrderClick();
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Order on WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
