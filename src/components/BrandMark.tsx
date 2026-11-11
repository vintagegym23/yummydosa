import React from 'react';

/** Yummy Dosa logo (public/logo.webp), used in the Navbar and Footer. */
export const BrandMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img
      src="/logo.webp"
      width={640}
      height={121}
      alt="Yummy Dosa"
      className={`h-11 sm:h-14 w-auto object-contain rounded-lg ${className}`}
    />
  );
};
