import React, { useState } from 'react';
import { X, MessageCircle, Phone, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuCatalogItem } from '../types';
import { RESTAURANT_INFO, LOCATIONS } from '../data/restaurantData';
import { SPRING_SHEET, SPRING_SNAPPY, EASE_OUT } from './motion/variants';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: MenuCatalogItem | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, selectedItem }) => {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'takeaway' | 'delivery' | 'dinein'>('takeaway');
  const [copied, setCopied] = useState(false);

  const itemName = selectedItem ? selectedItem.name : 'South Indian Tiffin Order';
  const itemPriceSuffix = selectedItem?.price ? ` (${selectedItem.price})` : '';

  const generateWhatsAppMessage = () => {
    const text = `Hello Yummy Dosa! 👋\n\nI would like to place an order for:\n• ${quantity}x ${itemName}${itemPriceSuffix}\n• Order Type: ${orderType.toUpperCase()}\n• Pickup/Delivery Branch: ${selectedLocation}\n\nPlease confirm availability and prep time. Thank you!`;
    return encodeURIComponent(text);
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    window.open(`${RESTAURANT_INFO.whatsappUrl}?text=${message}`, '_blank');
    onClose();
  };

  const handleCopyOrder = () => {
    const text = `Order: ${quantity}x ${itemName} | ${orderType.toUpperCase()} | ${selectedLocation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
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
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 max-h-[92vh] overflow-y-auto"
          >
            {/* Close button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SNAPPY}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-stone-900">WhatsApp Quick Order</h3>
                <p className="text-xs text-stone-500">Instant direct ordering with our kitchen</p>
              </div>
            </div>

            {/* Dish Selected Card */}
            <div className="bg-[#FBF8EE] border border-[#F3E5C8] rounded-2xl p-4 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200 shrink-0" />
                  <h4 className="font-bold text-stone-900 text-base">{itemName}</h4>
                </div>
                {selectedItem?.price ? (
                  <span className="font-bold text-[#D9531E]">{selectedItem.price}</span>
                ) : (
                  <span className="text-xs font-semibold text-stone-500">Ask for today's price</span>
                )}
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-200/60">
                <span className="text-xs font-semibold text-stone-600">Portions / Quantity</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    transition={SPRING_SNAPPY}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center hover:bg-stone-50 text-stone-700 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </motion.button>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={quantity}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="font-bold text-stone-900 w-4 text-center inline-block"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    transition={SPRING_SNAPPY}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center hover:bg-stone-50 text-stone-700 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Location Selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Select Pickup / Delivery Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LOCATIONS.map((loc) => (
                  <motion.button
                    key={loc.id}
                    whileTap={{ scale: 0.94 }}
                    transition={SPRING_SNAPPY}
                    onClick={() => setSelectedLocation(loc.name)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors cursor-pointer ${
                      selectedLocation === loc.name
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {loc.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Order Type Toggle */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Service Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['takeaway', 'delivery', 'dinein'] as const).map((type) => (
                  <motion.button
                    key={type}
                    whileTap={{ scale: 0.94 }}
                    transition={SPRING_SNAPPY}
                    onClick={() => setOrderType(type)}
                    className={`p-2.5 rounded-xl border text-xs font-bold capitalize transition-colors cursor-pointer ${
                      orderType === type
                        ? 'border-[#D9531E] bg-orange-50 text-[#BC3908]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {type === 'dinein' ? 'Dine In' : type}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
                onClick={handleWhatsAppClick}
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Order via WhatsApp</span>
              </motion.button>

              <div className="flex gap-2">
                <a
                  href={`tel:${RESTAURANT_INFO.displayPhone.replace(/\s+/g, '')}`}
                  className="flex-1 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Call Kitchen Directly</span>
                </a>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING_SNAPPY}
                  onClick={handleCopyOrder}
                  className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
