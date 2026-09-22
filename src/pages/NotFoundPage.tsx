import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger';
import { SPRING_SNAPPY } from '../components/motion/variants';

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
  });

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <StaggerGroup as="div" className="flex flex-col items-center" stagger={0.12}>
        <StaggerItem direction="scale">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="block text-7xl font-extrabold text-[#D9531E]"
          >
            404
          </motion.span>
        </StaggerItem>
        <StaggerItem direction="up">
          <h1 className="text-2xl font-extrabold text-stone-900 mt-4">Page Not Found</h1>
        </StaggerItem>
        <StaggerItem direction="up">
          <p className="text-stone-500 text-sm mt-2 max-w-sm">
            We couldn't find that page. Try the menu, or head back home.
          </p>
        </StaggerItem>
        <StaggerItem direction="up">
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9531E] hover:bg-[#BC3908] text-white text-sm font-bold transition-colors"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} transition={SPRING_SNAPPY}>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1b4332] text-[#1b4332] hover:bg-[#1b4332] hover:text-white text-sm font-bold transition-colors"
              >
                View Menu
              </Link>
            </motion.div>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}
