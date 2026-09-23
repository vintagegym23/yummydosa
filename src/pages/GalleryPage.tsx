import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DishImage } from '../components/DishImage';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { SPRING_SNAPPY } from '../components/motion/variants';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { GALLERY_IMAGES } from '../data/content';
import { GalleryImage } from '../types';

const CATEGORIES: Array<GalleryImage['category'] | 'All'> = ['All', 'Food', 'Restaurant', 'Banquet Hall', 'Catering'];

export default function GalleryPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useDocumentMeta({
    title: 'Gallery',
    description: 'Food, restaurant, banquet hall and catering photos from Yummy Dosa, Ilford.',
  });

  const filtered = useMemo(
    () => (category === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === category)),
    [category]
  );

  return (
    <>
      <PageHero
        eyebrow="GALLERY"
        title="A Look Inside Yummy Dosa"
        description="Food, restaurant, banquet hall and catering -- browse the gallery below."
        demoKey="indianSweetsShop"
        align="center"
        height="compact"
      />
      <Breadcrumbs items={[{ label: 'Gallery' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.94 }}
              transition={SPRING_SNAPPY}
              onClick={() => setCategory(cat)}
              className={`relative isolate px-5 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer ${
                category === cat ? 'text-white' : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {category === cat && (
                <motion.span
                  layoutId="gallery-category-pill"
                  className="absolute inset-0 rounded-full bg-[#1b4332] shadow-sm -z-10"
                  transition={SPRING_SNAPPY}
                />
              )}
              {cat.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Responsive masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((image, index) => (
            <div key={image.id} className="mb-5 break-inside-avoid block">
              <motion.button
                whileTap={{ scale: 0.96 }}
                transition={SPRING_SNAPPY}
                onClick={() => setActiveIndex(index)}
                className="group relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 block text-left cursor-pointer"
              >
                <div className="aspect-[4/3]">
                  <DishImage
                    imageId={image.imageId}
                    demoKey={image.demoImageKey}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                  <p className="text-white font-bold text-sm">{image.title}</p>
                  <p className="text-stone-300 text-xs uppercase tracking-wider">{image.category}</p>
                </div>
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={filtered}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
