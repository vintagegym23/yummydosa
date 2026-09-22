import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { SPRING_SNAPPY, EASE_OUT } from './motion/variants';

export const AnnouncementBar: React.FC = () => {
  return (
    <motion.aside
      id="top-announcement-bar"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="bg-[#1b4332] text-white text-xs sm:text-sm font-medium border-b border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* WhatsApp / Phone Contact */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </span>
          <span className="text-stone-300">Order Direct:</span>
          <a
            href={`tel:${RESTAURANT_INFO.displayPhone.replace(/\s+/g, '')}`}
            className="font-bold text-white hover:text-emerald-300 transition-colors tracking-wide"
          >
            {RESTAURANT_INFO.displayPhone}
          </a>
        </div>

        {/* Operating Hours */}
        <div className="hidden md:flex items-center gap-2 text-stone-200">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-stone-300">Open Today:</span>
          <span className="font-bold text-white tracking-wide">{RESTAURANT_INFO.hoursShort}</span>
        </div>

        {/* Location CTA button */}
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_SNAPPY}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Find Us in Ilford</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};
