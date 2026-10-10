import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Clock, CalendarDays, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROMOTIONS } from '../data/content';
import { DishImage } from './DishImage';
import { SPRING_SHEET, SPRING_SNAPPY, EASE_OUT } from './motion/variants';

const SHOW_DELAY_MS = 6000;
const ROTATE_MS = 7000;
const SEEN_KEY = 'yd-promo-seen';

/** Session flag so the popup shows once per visit, not on every page change. Storage can throw (private mode), so fail open. */
const hasSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* ignore */
  }
};

/** Weekend offers popup (morning buffet + unlimited lunch), shown 6s after a visitor arrives. */
export const PromoPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (hasSeen()) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      markSeen();
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Auto-rotate between the offers until the visitor interacts.
  useEffect(() => {
    if (!open || paused) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % PROMOTIONS.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [open, paused]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const promo = PROMOTIONS[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Weekend offers at Yummy Dosa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={SPRING_SHEET}
            className="bg-[#FFFDF7] rounded-t-3xl sm:rounded-3xl max-w-lg w-full shadow-2xl relative border border-[#F3E5C8] overflow-hidden max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={() => setPaused(true)}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SNAPPY}
              onClick={close}
              aria-label="Close offers"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white transition-colors cursor-pointer shadow-sm"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                {/* Image header with title + price badge */}
                <div className="relative aspect-[16/9] w-full">
                  <DishImage demoKey={promo.demoKey} alt={promo.title} className="w-full h-full object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#133527] via-[#133527]/40 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-28 text-white">
                    <span className="font-script italic text-[#E5A33D] text-lg sm:text-xl">{promo.eyebrow}</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">{promo.title}</h2>
                  </div>
                  <div className="absolute -bottom-6 right-5 w-24 h-24 rounded-full bg-gradient-to-br from-[#F3C75A] to-[#E8B93B] ring-4 ring-[#FFFDF7] shadow-lg shadow-amber-500/40 flex flex-col items-center justify-center text-stone-900 leading-none animate-badge-grow-shrink">
                    <span className="text-[10px] font-bold uppercase tracking-wide">Just</span>
                    <span className="text-2xl font-extrabold mt-0.5">{promo.adultPrice}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide mt-0.5">Adults</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-8 space-y-4">
                  {/* When */}
                  <div className="flex flex-wrap gap-2 pr-24">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-white text-xs font-bold">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {promo.days}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#D9531E] text-xs font-bold border border-orange-100">
                      <Clock className="w-3.5 h-3.5" />
                      {promo.time}
                    </span>
                  </div>

                  <p className="text-sm text-stone-700">
                    <span className="font-bold text-[#1b4332]">{promo.kidsLabel}:</span>{' '}
                    <span className="font-extrabold text-[#D9531E]">{promo.kidsPrice}</span>
                  </p>

                  {/* What's included */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D9531E] mb-2">What's Included</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {promo.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-full bg-amber-50 text-[#BC3908] text-[11px] font-bold border border-amber-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {promo.notes.map((note) => (
                    <p key={note} className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {note}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Actions + slide dots */}
            <div className="px-5 sm:px-6 pb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_SNAPPY} className="flex-1">
                  <Link
                    to="/book-a-table"
                    onClick={close}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors shadow-md"
                  >
                    <span>Book a Table</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_SNAPPY}
                  onClick={close}
                  className="flex-1 py-3 rounded-full border-2 border-[#1b4332] text-[#1b4332] hover:bg-[#1b4332] hover:text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  Maybe Later
                </motion.button>
              </div>

              <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Choose offer">
                {PROMOTIONS.map((p, i) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={p.title}
                    onClick={() => {
                      setPaused(true);
                      setIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === index ? 'w-6 bg-[#D9531E]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
