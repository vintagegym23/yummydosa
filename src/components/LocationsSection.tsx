import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS } from '../data/content';
import { Reveal } from './motion/Reveal';
import { FloatingBlobs } from './motion/FloatingBlobs';
import { SPRING_SNAPPY } from './motion/variants';

interface LocationsSectionProps {
  onOpenMap?: () => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenMap }) => {
  return (
    <section
      id="locations"
      className="relative bg-gradient-to-b from-[#2d6a4f] via-[#1b4332] to-[#133527] text-white pt-20 pb-24 overflow-hidden select-none"
      data-purpose="find-us"
    >
      {/* Decorative ambient glows, slowly drifting */}
      <FloatingBlobs tone="cool" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-bold tracking-wider mb-4 border border-white/10">
            <Navigation className="w-3.5 h-3.5" />
            <span>VISIT US</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Find Us in Ilford
          </h2>

          {/* Description */}
          <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-normal">
            One home in Greater London for crispy dosa, steaming filter coffee, and warm South Indian
            hospitality.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 items-stretch mt-10">
          {/* Map */}
          <Reveal direction="left" className="rounded-2xl overflow-hidden border border-white/15 shadow-lg min-h-[280px]">
            <iframe
              title="Yummy Dosa location map"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d310.0522286746789!2d0.06974391870791513!3d51.56057338852618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7b643796f1d%3A0x184cf3e5cb10d34e!2sYummy%20Dosa%20Pure%20Veg%20indian%20Restaurant!5e0!3m2!1sen!2sin!4v1790088347867!5m2!1sen!2sin"
            />
          </Reveal>

          {/* Details + CTAs */}
          <Reveal direction="right" className="flex flex-col justify-center text-left">
            {/* Location Card */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={SPRING_SNAPPY}
              onClick={onOpenMap}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 hover:bg-white/15 transition-colors cursor-pointer"
            >
              <h3 className="font-bold text-amber-300 text-lg">Yummy Dosa</h3>
              <p className="text-sm text-stone-200 mt-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>{BUSINESS.address.full}</span>
              </p>
              <p className="text-sm text-stone-200 mt-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{BUSINESS.phoneDisplay}</span>
              </p>
              <p className="text-sm text-stone-200 mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{BUSINESS.hours[0].days}: {BUSINESS.hours[0].time}</span>
              </p>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <motion.a
                whileTap={{ scale: 0.95 }}
                transition={SPRING_SNAPPY}
                href={BUSINESS.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions</span>
              </motion.a>
              <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY}>
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-sm font-bold transition-colors inline-block"
                >
                  Full Contact Details
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
