import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from './motion/Reveal';
import { SPRING_SNAPPY } from './motion/variants';

export const WelcomeSection: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-[#FFFDF7] relative select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Reveal direction="down">
          {/* Eyebrow */}
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D9531E] block mb-2">
            WELCOME TO
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-[#1b4332]">Yummy</span>{' '}
            <span className="text-[#D9531E]">Dosa</span>
          </h2>
        </Reveal>

        {/* Subtle separator flourish */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-3 my-5"
        >
          <span className="h-0.5 w-12 bg-[#2d6a4f] rounded-full" />
          <span className="w-2 h-2 rounded-full bg-[#D9531E]" />
          <span className="h-0.5 w-12 bg-[#2d6a4f] rounded-full" />
        </motion.div>

        {/* Centered descriptive paragraph */}
        <Reveal delay={0.1}>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-3xl mx-auto">
            Yummy Dosa is a South Indian vegetarian restaurant in Ilford, London, inspired by the
            food traditions of Tamil Nadu, Karnataka, Kerala, Andhra Pradesh and Telangana. We combine
            traditional recipes with fresh ingredients to serve dosa, idli, sambar, chutneys, regional
            curries, biryanis and street food -- for families, friends, gatherings and celebrations.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY} className="inline-block mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1b4332] text-[#1b4332] hover:bg-[#1b4332] hover:text-white text-sm font-bold transition-colors"
            >
              <span>Read Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};
