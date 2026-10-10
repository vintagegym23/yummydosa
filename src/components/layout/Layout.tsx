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
      <ScrollProgress />
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar onOpenOrderModal={() => openOrderModal()} />

      <main className="flex-1">
        <PageTransition />
      </main>

      <Footer />

      <FloatingSocialButton />

      <OrderModal isOpen={isOpen} onClose={closeOrderModal} selectedItem={selectedItem} />

      <PromoPopup />
    </div>
  );
};
