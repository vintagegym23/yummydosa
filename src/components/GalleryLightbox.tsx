import React, { useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage } from '../types';
import { DishImage } from './DishImage';
import { SPRING_SNAPPY, EASE_OUT } from './motion/variants';

interface GalleryLightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.97 }),
};

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  /** Tracks the swipe direction (+1/-1) so the next slide's enter/exit animates the right way. */
  const directionRef = useRef(1);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    directionRef.current = 1;
    onNavigate((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    directionRef.current = -1;
    onNavigate((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeIndex, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={images[activeIndex].title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={SPRING_SNAPPY}
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            transition={SPRING_SNAPPY}
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div
            className="max-w-3xl w-full max-h-[80vh] flex flex-col items-center gap-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative">
              <AnimatePresence mode="wait" custom={directionRef.current} initial={false}>
                <motion.div
                  key={activeIndex}
                  custom={directionRef.current}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: EASE_OUT }}
                  className="absolute inset-0"
                >
                  <DishImage
                    imageId={images[activeIndex].imageId}
                    demoKey={images[activeIndex].demoImageKey}
                    alt={images[activeIndex].title}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="text-center"
              >
                <p className="text-white font-bold">{images[activeIndex].title}</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider mt-1">{images[activeIndex].category}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            transition={SPRING_SNAPPY}
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
