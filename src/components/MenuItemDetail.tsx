import React, { useEffect } from 'react';
import { X, Leaf, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuCatalogItem } from '../types';
import { DishImage } from './DishImage';
import { SPRING_SHEET, SPRING_SNAPPY, EASE_OUT } from './motion/variants';

interface MenuItemDetailProps {
  item: MenuCatalogItem | null;
  onClose: () => void;
  onOrder: (item: MenuCatalogItem) => void;
}

/** Item detail drawer -- large image, name, category/dietary info, price where known, order CTA. */
export const MenuItemDetail: React.FC<MenuItemDetailProps> = ({ item, onClose, onOrder }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={SPRING_SHEET}
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full shadow-2xl relative border border-stone-200 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SNAPPY}
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white transition-colors cursor-pointer shadow-sm"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="aspect-[4/3] w-full">
              <DishImage imageId={item.id} alt={item.name} className="w-full h-full object-cover" priority />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D9531E]">
                  {item.category}
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 mt-1">{item.name}</h3>
              </div>

              {item.description && (
                <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
              )}

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <Leaf className="w-3.5 h-3.5" />
                  Pure Vegetarian
                </span>
                {item.price && (
                  <span className="text-xl font-bold text-[#1b4332]">{item.price}</span>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
                onClick={() => onOrder(item)}
                className="w-full py-3.5 rounded-full bg-[#EA262A] hover:bg-[#C81E22] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Online</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
