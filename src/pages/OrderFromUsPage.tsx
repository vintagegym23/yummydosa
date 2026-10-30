import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DIRECT_ORDERING_EMBED_URL } from '../data/content';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/**
 * /orderfromus -- Yummy Dosa's own ordering system (hosted by PocketOrder),
 * embedded full-screen so the address bar keeps showing our domain. Rendered
 * outside the site Layout; a slim bar keeps a way back to the main site
 * (no logo there -- the embedded page shows its own).
 */
export default function OrderFromUsPage() {
  useDocumentMeta({
    title: 'Order From Us',
    description: 'Order Yummy Dosa direct for collection or delivery -- order through our website and get 10% off.',
  });

  return (
    <div className="flex flex-col h-dvh bg-white">
      {/* Same green as PocketOrder's own nav bar below, so the two read as one header */}
      <header className="flex items-center justify-end gap-4 px-4 sm:px-6 py-2 bg-[#236638] text-white shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to website</span>
        </Link>
      </header>
      <iframe
        src={DIRECT_ORDERING_EMBED_URL}
        title="Order from Yummy Dosa"
        className="flex-1 w-full border-0"
        allow="payment; geolocation; clipboard-write"
      />
    </div>
  );
}
