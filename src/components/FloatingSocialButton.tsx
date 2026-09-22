import React, { useEffect, useRef, useState } from 'react';
import { Share2, Facebook, Instagram, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SOCIAL_LINKS } from '../data/content';
import { SPRING_SHEET, SPRING_SNAPPY, EASE_OUT } from './motion/variants';

const ICONS: Record<(typeof SOCIAL_LINKS)[number]['id'], React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
};

/** Each platform's own brand color, so the icons read instantly at a glance. */
const ICON_BG: Record<(typeof SOCIAL_LINKS)[number]['id'], string> = {
  facebook: 'bg-[#1877F2]',
  instagram: 'bg-gradient-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7]',
};

export const FloatingSocialButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Follow Yummy Dosa on social media"
            initial={{ opacity: 0, scale: 0.9, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={SPRING_SHEET}
            className="mb-3 w-64 bg-white rounded-2xl shadow-xl border border-stone-100 p-4 origin-bottom-right"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-bold text-stone-800">Follow Us</h3>
              <motion.button
                whileTap={{ scale: 0.85 }}
                transition={SPRING_SNAPPY}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-stone-400 hover:text-stone-700 transition-colors -mt-0.5 -mr-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed mb-3">
              Follow us for regular updates, discounts &amp; special offers!
            </p>
            <ul className="space-y-1.5">
              {SOCIAL_LINKS.map((social, i) => {
                const Icon = ICONS[social.id];
                return (
                  <motion.li
                    key={social.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.06 * i, ease: EASE_OUT }}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Yummy Dosa on ${social.name}`}
                      className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-stone-700 hover:bg-[#FFFDF7] hover:text-stone-900 transition-colors"
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white shrink-0 ${ICON_BG[social.id]}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      {social.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={{ boxShadow: isOpen ? '0 10px 25px rgba(0,0,0,0.15)' : ['0 10px 25px rgba(0,0,0,0.1)', '0 10px 32px rgba(27,67,50,0.35)', '0 10px 25px rgba(0,0,0,0.1)'] }}
        transition={{
          scale: SPRING_SNAPPY,
          boxShadow: { duration: 2.4, repeat: isOpen ? 0 : Infinity, ease: 'easeInOut' },
        }}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Follow us on social media"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white p-3.5 rounded-full shadow-xl flex items-center justify-center transition-colors group cursor-pointer"
      >
        <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25, ease: EASE_OUT }}>
          <Share2 className="w-6 h-6" />
        </motion.span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-bold">
          Follow Us
        </span>
      </motion.button>
    </div>
  );
};
