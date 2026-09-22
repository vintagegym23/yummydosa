import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE_OUT } from '../motion/variants';

interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT }}
      aria-label="Breadcrumb"
      className="bg-[#FFFDF7] border-b border-[#F3E5C8]/60"
    >
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 overflow-x-auto whitespace-nowrap">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="flex items-center gap-1 hover:text-[#D9531E] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            {item.to ? (
              <Link to={item.to} className="hover:text-[#D9531E] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-stone-800 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
};
