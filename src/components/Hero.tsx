import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Motorbike, Leaf, Utensils, Soup, Cookie, Coffee } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { StaggerGroup, StaggerItem } from './motion/Stagger';
import { SPRING_SNAPPY, EASE_OUT } from './motion/variants';

interface HeroProps {
  onViewSpecials?: () => void;
}

const CATEGORY_HIGHLIGHTS = [
  { label: 'Dosas', icon: Utensils },
  { label: 'Idlis', icon: Soup },
  { label: 'Vadas', icon: Cookie },
  { label: 'Filter Coffee', icon: Coffee },
];

const BADGE_TEXT = 'AUTHENTIC TASTE • ALWAYS FRESH • ';

export const Hero: React.FC<HeroProps> = ({ onViewSpecials }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], prefersReducedMotion ? [1, 1] : [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero-banner"
      className="relative bg-stone-950 overflow-hidden text-white min-h-[600px] lg:min-h-[760px] flex items-center select-none"
    >
      {/* Background Image with scroll parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          style={{ y: bgY }}
          src={RESTAURANT_INFO.heroBg}
          alt="South Indian dosa feast spread"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.06, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          className="absolute inset-0 w-full h-full object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/25 to-transparent" />
      </div>

      {/* Subtle decorative leaf, bottom-left */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute bottom-24 left-6 z-10"
      >
        <Leaf className="w-8 h-8 text-emerald-500/25 -rotate-12" />
      </motion.div>

      {/* Script flourish, upper right */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
        className="hidden lg:block absolute top-20 right-10 z-10 font-handwritten text-white/90 text-3xl leading-[1.15] rotate-[-8deg] text-right"
        aria-hidden="true"
      >
        Dosa
        <br />
        Makes
        <br />
        Life Better <span className="text-[#D9531E]">♡</span>
      </motion.div>

      {/* Rotating authenticity badge, bottom-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT }}
        className="hidden md:flex absolute bottom-8 right-8 z-10 items-center justify-center w-24 h-24 lg:w-28 lg:h-28"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <defs>
            <path id="badge-circle-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-white/80 text-[7.2px] font-bold uppercase tracking-[0.15em]">
            <textPath href="#badge-circle-path" startOffset="0%">
              {BADGE_TEXT.repeat(2)}
            </textPath>
          </text>
        </svg>
        <Leaf className="w-6 h-6 text-emerald-400" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full"
      >
        <StaggerGroup as="div" className="max-w-2xl" stagger={0.12}>
          {/* Eyebrow */}
          <StaggerItem direction="up">
            <p className="text-white/90 text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-5">
              Pure Veg <span className="text-white/40 mx-1.5">•</span> Authentic{' '}
              <span className="text-white/40 mx-1.5">•</span> Made With Love
            </p>
          </StaggerItem>

          {/* Headline */}
          <StaggerItem direction="up">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              <span className="relative inline-block text-white w-fit">
                Dosas
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
                  className="absolute -bottom-2 left-0 h-1.5 w-24 rounded-full bg-[#D9531E] origin-left"
                />
              </span>
              <span className="font-script italic text-[#E5A33D]"> for</span>
              <br />
              <span className="text-white">Happier Days</span>
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem direction="up">
            <p className="text-base sm:text-lg text-stone-200 font-normal mb-8 leading-relaxed max-w-md">
              Real South Indian taste. Freshly prepared. We are two minutes away from Ilford Station.
            </p>
          </StaggerItem>

          {/* CTA Buttons */}
          <StaggerItem direction="up">
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_SNAPPY}>
                <Link
                  to="/menu"
                  className="px-7 py-3.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm sm:text-base font-bold transition-colors shadow-md flex items-center gap-2"
                >
                  <span>View Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_SNAPPY}>
                <Link
                  to="/order-online"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/40 text-sm sm:text-base font-semibold transition-colors flex items-center gap-2"
                >
                  <Motorbike className="w-4 h-4" />
                  <span>Order Online</span>
                </Link>
              </motion.div>
            </div>
          </StaggerItem>

          {/* Category highlights */}
          <StaggerItem direction="up">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              {CATEGORY_HIGHLIGHTS.map(({ label, icon: Icon }) => (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.92 }}
                  transition={SPRING_SNAPPY}
                  onClick={onViewSpecials}
                  className="flex items-center gap-2.5 text-sm font-semibold text-stone-100 hover:text-[#E5A33D] transition-colors cursor-pointer"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </StaggerItem>
        </StaggerGroup>
      </motion.div>
    </section>
  );
};
