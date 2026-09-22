import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { DishImage } from './DishImage';
import { Reveal } from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/Stagger';
import { SPRING_SNAPPY } from './motion/variants';

interface PromoBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  points?: string[];
  ctaLabel: string;
  ctaTo: string;
  imageId?: string;
  reverse?: boolean;
  icon?: LucideIcon;
  tone?: 'light' | 'dark';
}

/** Homepage teaser strip for a dedicated page (Banquet/Catering/Gallery/Franchise). */
export const PromoBanner: React.FC<PromoBannerProps> = ({
  eyebrow,
  title,
  description,
  points,
  ctaLabel,
  ctaTo,
  imageId,
  reverse = false,
  icon: Icon,
  tone = 'light',
}) => {
  return (
    <section
      className={`py-16 sm:py-20 ${tone === 'dark' ? 'bg-[#133527] text-white' : 'bg-[#FFFDF7]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
          <Reveal
            direction={reverse ? 'right' : 'left'}
            className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-sm"
          >
            <DishImage imageId={imageId} alt={title} className="w-full h-full object-cover" />
          </Reveal>
          <Reveal direction={reverse ? 'left' : 'right'} className="w-full lg:w-1/2 space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider ${
                tone === 'dark' ? 'bg-white/10 text-amber-300' : 'bg-amber-100 text-[#BC3908]'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
            <p className={`text-sm sm:text-base leading-relaxed ${tone === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}>
              {description}
            </p>
            {points && points.length > 0 && (
              <StaggerGroup as="ul" className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm" stagger={0.06}>
                {points.map((point) => (
                  <StaggerItem key={point} as="li" direction="left" duration={0.3}>
                    <span
                      className={`flex items-center gap-2 ${tone === 'dark' ? 'text-stone-300' : 'text-stone-600'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9531E] shrink-0" />
                      {point}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
            <div className="pt-2">
              <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block">
                <Link
                  to={ctaTo}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors shadow-sm"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
