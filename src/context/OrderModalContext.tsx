import React, { createContext, useCallback, useContext, useState } from 'react';
import { MenuCatalogItem } from '../types';

interface OrderModalContextValue {
  isOpen: boolean;
  selectedItem: MenuCatalogItem | null;
  openOrderModal: (item?: MenuCatalogItem) => void;
  closeOrderModal: () => void;
}

const OrderModalContext = createContext<OrderModalContextValue | undefined>(undefined);

export const OrderModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuCatalogItem | null>(null);

  const openOrderModal = useCallback((item?: MenuCatalogItem) => {
    setSelectedItem(item || null);
    setIsOpen(true);
  }, []);

  const closeOrderModal = useCallback(() => setIsOpen(false), []);

  return (
    <OrderModalContext.Provider value={{ isOpen, selectedItem, openOrderModal, closeOrderModal }}>
      {children}
    </OrderModalContext.Provider>
  );
};

export function useOrderModal() {
  const ctx = useContext(OrderModalContext);
  if (!ctx) throw new Error('useOrderModal must be used within OrderModalProvider');
  return ctx;
}
