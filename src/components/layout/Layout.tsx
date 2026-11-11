import React from 'react';
import { AnnouncementBar } from '../AnnouncementBar';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { OrderModal } from '../OrderModal';
import { PromoPopup } from '../PromoPopup';
import { FloatingSocialButton } from '../FloatingSocialButton';
import { ScrollToTop } from './ScrollToTop';
import { PageTransition } from '../motion/PageTransition';
import { ScrollProgress } from '../motion/ScrollProgress';
import { useOrderModal } from '../../context/OrderModalContext';

export const Layout: React.FC = () => {
  const { isOpen, selectedItem, openOrderModal, closeOrderModal } = useOrderModal();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-stone-800 font-sans">
      {/* Keyboard users: jump past the navigation (visible only when focused). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#133527] focus:text-white focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar onOpenOrderModal={() => openOrderModal()} />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <PageTransition />
      </main>

      <Footer />

      <FloatingSocialButton />

      <OrderModal isOpen={isOpen} onClose={closeOrderModal} selectedItem={selectedItem} />

      <PromoPopup />
    </div>
  );
};
