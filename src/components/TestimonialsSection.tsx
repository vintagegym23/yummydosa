import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS } from '../data/content';
import { Reveal } from './motion/Reveal';
import { StaggerGroup, StaggerItem } from './motion/Stagger';
import { SPRING_SNAPPY, EASE_OUT } from './motion/variants';

/**
 * Real social proof only. info.md confirms Yummy Dosa's aggregate Google
 * rating (4.7 from 2,826 reviews) but doesn't provide any individual review
 * text or reviewer names -- so unlike the previous version of this section,
 * no invented customer quotes are shown here.
 */
export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-[#FBF8EE] relative select-none"
      data-purpose="google-rating"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-[#2d6a4f] text-xs font-bold tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WHAT DINERS SAY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            <span className="text-[#1b4332]">Loved on</span>{' '}
            <span className="text-[#D9531E]">Google</span>
          </h2>
        </Reveal>

        <Reveal direction="scale" delay={0.15}>
          <div className="inline-flex flex-col items-center bg-white rounded-3xl border border-stone-100 shadow-sm px-10 py-8">
            <span className="text-5xl font-extrabold text-stone-900">{BUSINESS.googleRating.score}</span>
            <StaggerGroup className="flex text-amber-400 gap-1 my-2" stagger={0.08}>
              {[...Array(5)].map((_, i) => (
                <StaggerItem key={i} direction="scale" as="span">
                  <Star className={`w-5 h-5 ${i < Math.round(BUSINESS.googleRating.score) ? 'fill-current' : ''}`} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <p className="text-stone-500 text-sm font-medium">
              Based on {BUSINESS.googleRating.reviewCount.toLocaleString()} Google reviews
            </p>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE_OUT }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <motion.a
            whileTap={{ scale: 0.95 }}
            transition={SPRING_SNAPPY}
            href={BUSINESS.mapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-sm font-bold transition-colors shadow-sm"
          >
            <span>Read Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
          <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY}>
            <Link
              to="/book-a-table"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#D9531E] text-[#D9531E] hover:bg-[#D9531E] hover:text-white text-sm font-bold transition-colors"
            >
              <span>Book a Table</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
