import React, { useMemo, useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { MENU_IMAGE_MAP } from '../data/menuImageCatalog';
import { MENU_DEMO_IMAGE } from '../data/menuDemoImages';
import { DEMO_IMAGES, DemoImageKey } from '../data/demoImages';

interface DishImageProps {
  /** id into MENU_IMAGE_MAP. If given, resolves: real local photo -> demo photo -> placeholder. */
  imageId?: string;
  /** key into DEMO_IMAGES, for venue/event photos with no menu catalog entry. Ignored if imageId resolves. */
  demoKey?: DemoImageKey;
  alt: string;
  className?: string;
  /** Sets the img `sizes` attribute for responsive loading. Defaults to a sensible card-grid value. */
  sizes?: string;
  /** Use for above-the-fold / hero-style images so they don't lazy-load late, and to request a larger source. */
  priority?: boolean;
}

/**
 * Resolves, in order: (1) a real local dish photo dropped in at its catalog path, (2) a
 * temporary free-to-use demo photo (see src/data/demoImages.ts -- Unsplash, credited there),
 * (3) a "photo coming soon" placeholder if neither exists. This means dropping a real client
 * photo in at its intended path (src/data/menuImageCatalog.ts) automatically replaces the demo
 * image later, with no component or JSX changes anywhere.
 */
export const DishImage: React.FC<DishImageProps> = ({
  imageId,
  demoKey,
  alt,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
}) => {
  const realEntry = imageId ? MENU_IMAGE_MAP[imageId] : undefined;
  const resolvedDemoKey = demoKey || (imageId ? MENU_DEMO_IMAGE[imageId] : undefined);
  const demoEntry = resolvedDemoKey ? DEMO_IMAGES[resolvedDemoKey] : undefined;

  const [stage, setStage] = useState<'real' | 'demo' | 'placeholder'>(realEntry ? 'real' : demoEntry ? 'demo' : 'placeholder');

  const width = priority ? 1600 : 800;
  const demoSrc = useMemo(() => demoEntry?.url(width), [demoEntry, width]);

  if (stage === 'placeholder' || (!realEntry && !demoEntry)) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 bg-stone-100 text-stone-400 ${className}`}
        role="img"
        aria-label={`${alt} - photo coming soon`}
      >
        <UtensilsCrossed className="w-6 h-6" strokeWidth={1.5} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Photo coming soon</span>
      </div>
    );
  }

  const src = stage === 'real' ? realEntry!.image : demoSrc!;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setStage((s) => (s === 'real' && demoEntry ? 'demo' : 'placeholder'))}
    />
  );
};
