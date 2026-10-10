import React from 'react';

/** Yummy Dosa logo (public/logo.png), used in the Navbar and Footer. */
export const BrandMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img
      src="/logo.png"
      alt="Yummy Dosa"
      className={`h-11 sm:h-14 w-auto object-contain rounded-lg ${className}`}
    />
  );
};
